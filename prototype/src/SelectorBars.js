import React, {Component} from 'react'
import SelectorSlider from "./SelectorSlider.js";
import "./styling/SelectorBars.css"
import "./ConfusionUtil.js";
import {ConfusionUtil} from "./ConfusionUtil";

let util;

export default class SelectorBars2 extends Component {
    constructor(props) {
        super(props);
        this.state = {TP_value: 0.4, FP_value: 0.6};
        this.update_everything = this.update_everything.bind(this);
    }


    // Given a percentage of True Positives for example it will set another threshold value and new confusion values
    // ID is the ID of the slider, so we know whether we're updating TPs or FNs
    update_everything(id, target_value){
        if (target_value === 0)
            target_value = 0.1;

        const to_get = id === "positive_selector" ? "TP" : "FP";

        const index = util.setConfusion(to_get, target_value);

        this.setState({TP_value: util.allTPs[index], FP_value: util.allFPs[index]});

        console.log("Update everything: " + id + ", " + target_value + ". Found index: " + index);
        console.log(this.state.TP_value);
    }

    render() {
        if (util == null)
            util = new ConfusionUtil(this.props.data);

        return (
            <div className='grid_display'>
                <h2>Selector View</h2>
                <div className='grid_container'>
                    <div className='slider_layout_a'>
                        <SelectorSlider id='positive_selector' threshold={this.state.TP_value}
                                        callback={this.update_everything} top_label='true positive'
                                        bottom_label='false negative' color_bottom='#f5564a'/>
                    </div>
                    <div className='slider_layout_b'>
                        <SelectorSlider id='negative_selector' threshold={this.state.FP_value}
                                        callback={this.update_everything} top_label='false positive'
                                        bottom_label='true negative' color_bottom='#aaaaaa'/>
                    </div>
                </div>
            </div>
        );
    }
}

