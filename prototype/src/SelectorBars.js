import React, {Component} from 'react'
import SelectorSlider from "./SelectorSlider.js";
import {Slider, Rail, Handles, Tracks} from 'react-compound-slider'
import "./styling/SelectorBars.css"

const data = [{threshold: 0.5, tp: 45, fp: 25, tn: -7, fn: -23}];
const mock_data = [0, 0.1, 0.2, 0.5];

export default class SelectorBars2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='grid_display'>
                <div className='grid_container'>
                    <div className='slider_layout_a'>
                        <SelectorSlider threshold={0.5}/>
                    </div>
                    <div className='slider_layout_b'>
                        <SelectorSlider threshold={0.5}/>
                    </div>
                </div>
            </div>
        );
    }
}

