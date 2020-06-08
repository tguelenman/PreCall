import React, {Component} from 'react'
import "./styling/EditViewer.css"

function round(a) {
    return Number(Math.round(a + 'e' + 3) + 'e-' + 3);
}

export default class EditViewer2 extends Component {
    constructor(props) {
        super(props);
        this.populate_array();
        this.currentIndex = '';

        this.state = {
            display: 'nothing',
            editClass: 'damaging'
        };

        // timeout handler so that we can reset it, and a call which tracks who is triggering the state update
        this.timeout = '';
        this.internal_call = false;

        this.buttonInfo = null;
        this.labelstyle = null;
    }

    // Fill two arrays, so that revid[index] has the threshold[index]
    populate_array() {
        const dataset_damaging = require("./resources/dataset_damaging_only.json");
        const dataset_good = require("./resources/dataset_good_only.json");

        this.damaging = {revids: [], probabilities: []};
        this.good = {revids: [], probabilities: []};

        // https://stackoverflow.com/questions/11499268/sort-two-arrays-the-same-way
        dataset_damaging.array.sort(function (a, b) {
            return a['probability'] < b['probability'] ? -1 :
                a['probability'] === b['probability'] ? 0 : 1
        });
        dataset_good.array.sort(function (a, b) {
            return a['probability'] < b['probability'] ? -1 :
                a['probability'] === b['probability'] ? 0 : 1
        });

        // really weird way to get the length of the array without the compiler complaining
        for (let i = 0; i < dataset_damaging.array['length']; i++) {
            this.damaging.revids.push(dataset_damaging.array[i]["rev_id"]);
            this.damaging.probabilities.push(dataset_damaging.array[i]['probability']);
        }
        for (let i = 0; i < dataset_good.array['length']; i++) {
            this.good.revids.push(dataset_good.array[i]["rev_id"]);
            this.good.probabilities.push(dataset_good.array[i]['probability']);
        }
    }

    // Use a API, because otherwise the connection isn't allowed. (Because of same origin policy,
    // maybe set up either by wikipedia or by the firefox tracking protection.
    fetch_edit(ref_id) {
        // Get the target revision and it's previous one. The & char must be encoded
        let url2 = 'https://api.allorigins.win/get?url=https://en.wikipedia.org/w/index.php?diff=prev%26oldid=' + ref_id;
        fetch(url2) //{headers: new Headers({'Origin': 'https://en.wikipedia.org', 'UserAgent': 'Mozilla/5.0 (X11; Linux x86_64)'})})
            .then(response => {
                return response.json()
            })
            .then(data => this.parse_html(data.contents));
    }

    parse_html(content) {
        let el = document.createElement('html');
        el.innerHTML = content;

        let diff = el.getElementsByClassName('diff diff-contentalign-left').item(0).childNodes[2].innerHTML;

        // Request state update internally. Don't trigger the timer.
        this.internal_call = true;
        this.setState({display: <tbody dangerouslySetInnerHTML={{__html: diff}}/>});
    }

    // binary search for closest
    find_edit_id(threshold, damaging) {
        let dict = damaging ? this.damaging : this.good;

        let start = 0;
        let end = dict.probabilities.length - 1;
        let mid;

        let wantedIndex;
        let closest = Infinity;

        while (start <= end) {
            mid = Math.floor((start + end) / 2);

            // find the closest value
            if (Math.abs(threshold - dict.probabilities[mid]) < Math.abs(threshold - closest)) {
                closest = dict.probabilities[mid];
                wantedIndex = mid;
            }

            // find which way to continue the bin search
            if (dict.probabilities[mid] === threshold)
                return mid;
            else if (dict.probabilities[mid] < threshold)
                start = mid + 1;
            else
                end = mid - 1;
        }

        this.currentIndex = wantedIndex;
        return dict.revids[wantedIndex];
    }

    chooseEditClass = () => {
        let currentState = this.state.editClass;

        if (currentState === "damaging") {
            this.setState({display: "Loading...", editClass: "good"})
            this.buttonInfo = {text: "View a damaging edit", style: {background: "#1db1f5"}}
            this.labelstyle = {fontsize: 17, color: '#aaaaaa'}
        } else {
            this.setState({display: "Loading...", editClass: "damaging"})
            this.buttonInfo = {text: "View a good edit", style: {background: "#aaaaaa"}}
            this.labelstyle = {fontsize: 17, color: '#1db1f5'}
        }
    };

    render() {

        if (this.buttonInfo == null) {
            this.chooseEditClass();
        }

        let dict = this.state.editClass === "damaging" ? this.damaging : this.good;

        // Every time 'render()' is called from outside, reset the timeout
        if (!this.internal_call) {
            if (this.timeout != null) {
                window.clearTimeout(this.timeout);
            }

            // Set a timeout, so that the edit viewer is updated 1,5 seconds after the user
            // has last made an acton which would change the program's state. (e.g moving the sliders)
            this.timeout = window.setTimeout(() => {
                this.fetch_edit(this.find_edit_id(this.props.threshold, dict === this.damaging));
            }, 1500);
        } else {
            this.internal_call = false;
        }

        return (
            <div className='ev_wrapper'>
                <h2>Edit Viewer</h2>
                <p>Edit was labeled by a human as: <b><span style={this.labelstyle}>{this.state.editClass}</span></b></p>
                <p>Damaging probability according to ORES: <b>{round(dict.probabilities[this.currentIndex])}</b></p>
                <button className='ui button' id='btnGoodOrBad' style={this.buttonInfo.style}
                        onClick={this.chooseEditClass}>{this.buttonInfo.text}</button>
                <div className='editViewer'>
                    <table style={{display: 'block'}}>
                        {this.state.display}
                    </table>
                </div>
            </div>
        );
    }
}
