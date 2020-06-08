import React, {Component} from 'react'
import SelectorSlider from "./SelectorSlider.js";
import "./styling/SelectorBars.css"
import "./ConfusionUtil.js";
import {ConfusionUtil} from "./ConfusionUtil";

let util;

export default class SelectorBars2 extends Component {
    constructor(props) {
        super(props);
        this.state = {TP_value: 0.4, FP_value: 0.6, threshold: 0.5};
        this.update_everything = this.update_everything.bind(this);
    }


    // Given a percentage of True Positives for example it will set another threshold value and new confusion values
    // ID is the ID of the slider, so we know whether we're updating TPs or FNs
    update_everything(id, target_value) {
        const to_get = id === "positive_selector" ? "TP" : "FP";
        this.props.callback(to_get, target_value);
    }

    render() {
        if (util == null)
            util = new ConfusionUtil(this.props.data);

        return (
            <div className='selector_grid_container'>
                <div className='selectorHeading'>
                    <h2> Selector View</h2>
                </div>
                <div className='slider_layout_a'>
                    <SelectorSlider id='positive_selector' threshold={this.props.confusion.tp}
                                    callback={this.update_everything} top_label='correctly predicted damaging'
                                    bottom_label='falsely predicted good' color_bottom='#f5564a'
                                    domain={[0, util.allTPs[1] + util.allFNs[1]]}/>
                </div>
                <div className='slider_layout_b'>
                    <SelectorSlider id='negative_selector' threshold={this.props.confusion.fp}
                                    callback={this.update_everything} top_label='falsely predicted damaging'
                                    bottom_label='correctly predicted good' color_bottom='#aaaaaa'
                                    domain={[0, util.allFPs[1] + util.allTNs[1]]}/>
                </div>
            </div>
        );
    }
}

