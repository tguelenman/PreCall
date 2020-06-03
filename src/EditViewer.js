import React, {Component} from 'react'
import "./styling/EditViewer.css"

export default class EditViewer2 extends Component {
    constructor(props) {
        super(props);
        this.populate_array();
        this.currentIndex = '';

        this.state = {
            display: 'nothing'
        };

        // timeout handler so that we can reset it, and a call which tracks who is triggering the state update
        this.timeout = '';
        this.internal_call = false;
    }

    // Fill two arrays, so that revid[index] has the threshold[index]
    populate_array() {
        const dataset = require("./resources/dataset_damaging_only.json");

        this.revids = [];
        this.probabilities = [];

        // https://stackoverflow.com/questions/11499268/sort-two-arrays-the-same-way
        dataset.array.sort(function (a, b) {
            return a['probability'] < b['probability'] ? -1 :
                a['probability'] === b['probability'] ? 0 : 1
        });

        // really weird way to get the length of the array without the compiler complaining
        for (let i = 0; i < dataset.array['length']; i++) {
            this.revids.push(dataset.array[i]["rev_id"]);
            this.probabilities.push(dataset.array[i]['probability']);
        }
    }

    // TODO: Fetch edit from Wikipedia. Start a timer, so that we make a request after no sliders have been
    // moved for at least a second.
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
    find_edit_id(threshold) {

        let start = 0;
        let end = this.probabilities.length - 1;
        let mid;

        let wantedIndex;
        let closest = Infinity;

        while (start <= end) {
            mid = Math.floor((start + end) / 2);

            // find the closest value
            if (Math.abs(threshold - this.probabilities[mid]) < Math.abs(threshold - closest)) {
                closest = this.probabilities[mid];
                wantedIndex = mid;
            }

            // find which way to continue the bin search
            if (this.probabilities[mid] === threshold)
                return mid;
            else if (this.probabilities[mid] < threshold)
                start = mid + 1;
            else
                end = mid - 1;
        }

        this.currentIndex = wantedIndex;
        return this.revids[wantedIndex];
    }


    render() {

        // Everytime 'render()' is called from outside, reset the timeout
        if (!this.internal_call) {
            if (this.timeout != null) {
                window.clearTimeout(this.timeout);
            }

            // Set a timeout, so that the edit viewer is updated 1,5 seconds after the user
            // has last made an acton which would change the program's state. (e.g moving the sliders)
            this.timeout = window.setTimeout(() => {
                this.fetch_edit(this.find_edit_id(this.props.threshold));
            }, 1500);
        }else{
            this.internal_call = false;
        }

        return (
            <div className='ev_wrapper'>
                <h2>Edit Viewer</h2>
                <p>{'This edit\'s damaging probability: ' + this.probabilities[this.currentIndex]}</p>
                <div className='editViewer'>
                    <table>
                        {this.state.display}
                    </table>
                </div>
            </div>
        );
    }
}
