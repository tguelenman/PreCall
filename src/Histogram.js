import React, {Component} from 'react'
import {Slider} from 'devextreme-react/slider';
import DraggableHistogramLine from "./DraggableHistogramLine.js"
import {
    Chart, Series, CommonSeriesSettings, Legend, ValueAxis, ArgumentAxis, Title, Export, Tooltip, Border, ConstantLine
} from 'devextreme-react/chart';
import Draggable from "react-draggable";

function round(a) {
    return Number(Math.round(a + 'e' + 2) + 'e-' + 2);
}

// data structure containing important values for the slider handle
let slider = {
    min: 60, max: 1420,
    offset_x: 60, offset_y: 60,
    controlled_pos: {x: 300, y: 60},
    last_call: 0,
    threshold: 0.5,
    max_threshold: 0.981
};

// Take a data point from the ORES API (match_rate, filter_rate, etc.)
// and calculate the Confusion Matrix.
export function calculate_confusion_matrix(data_point) {
    let tp, fp, tn, fn;

    //Calculate TN/FN/TP/FP	in %
    const filters = round(100 * data_point['filter_rate']);
    const matches = round(100 * data_point['match_rate']);

    tp = round(matches * data_point['precision']);
    fp = round(matches - tp);
    tn = round(filters * data_point['!precision']);
    fn = round(filters - tn);

    // negatives have a "-" sign, so that they are stacked in the opposite direction in the histogram
    return {threshold: data_point['threshold'], tp: tp, fp: fp, tn: -tn, fn: -fn};
}

function calculate_everything(data) {
    let temp = [];
    let point;

    for (point of data) {
        temp.push(calculate_confusion_matrix(point));
    }

    return temp;
}

// Choose how many data points to remove from the Histogram dataset in order
// to make the visualization more clear. For example if factor=5,
// then the returned array will contain every 5th element.
function thin_histogram(factor, data) {
    let temp = [];

    for (let i = 0; i < data.length; i++) {
        if (i % factor === 0 || i === data.length - 1) {
            temp.push(data[i]);
        }
    }
    return temp;
}

export default class Histogram2 extends Component {
    constructor(props) {
        super(props);
        this.state = {threshold: 0.5};
        this.histogram_data = calculate_everything(this.props.data);
        this.histogram_element = null;
        this.internal_call = false; // track who calls for state update
        this.thinned_data = thin_histogram(this.props.reduce ? this.props.reduce : 1, this.histogram_data);
    }

    // Use arrow functions so that we can access the outer if
    handleStart = (event, data) => {
        slider.last_call = 0;
        console.log("Start drag")
    };

    // Top achievable threshold is 0.981 and not 1, so we need to adjust our formula a bit,
    // otherwise the handle position is off
    handleDrag = (event, data) => {
            let threshold = (data.x - slider.min) / (slider.max/slider.max_threshold - slider.min);
            slider.controlled_pos = {x: data.x, y: slider.offset_y};
            this.props.callback("threshold", threshold, "histogram");
       // }
    };

    handleStop = (event, data) => {
        this.internal_call = false;
    };

    render() {
        if (this.histogram_element == null) {
            this.histogram_element = document.getElementById('chart');
        }

        // If called from the outside, calculate where the slider handle should be positioned
        if (!this.internal_call){
            slider.controlled_pos.x = this.props.threshold * (slider.max/slider.max_threshold - slider.min) + slider.min;
        }

        return (
            <div className="dx-form">
                <Draggable
                    axis="x"
                    handle=".handle"
                    defaultPosition={{x: (slider.max - slider.min) * this.state.threshold + slider.min, y: slider.offset_y}}
                    position={slider.controlled_pos}
                    grid={[3, 3]}
                    scale={1}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}
                    bounds={{right: slider.max, left: slider.min}}
                    margin-left={1000}
                >
                    <div className='handle'
                         style={{
                             width: 21,
                             height: 21,
                             border: '2px solid black',
                             textAlign: 'center',
                             cursor: 'pointer',
                             borderRadius: '50%',
                             backgroundColor: 'white',
                             zIndex: 5
                         }}
                    >
                    </div>
                </Draggable>
                <Chart
                    id="chart"
                    title="Histogram"
                    dataSource={this.props.remove_first ? this.thinned_data.slice(1, -1) : this.thinned_data}
                >
                    <CommonSeriesSettings argumentField="threshold" type="stackedBar"/>
                    <Series
                        valueField="tp"
                        name="True Positive"
                        stack="damaging"
                    />
                    <Series
                        valueField="fn"
                        name="False Negative"
                        stack="damaging"
                    />
                    <Series
                        valueField="fp"
                        name="False Positive"
                        stack="good"
                        color="#444444"
                    />
                    <Series
                        valueField="tn"
                        name="True Negative"
                        stack="good"
                        color="#aaaaaa"
                    />
                    <ValueAxis>
                        <Title text="Percent of all edits"/>
                    </ValueAxis>
                    <ArgumentAxis>
                        <Title text="Threshold required for an edit to be classified as damaging"/>
                        <ConstantLine width={2} value={this.props.threshold}/>
                    </ArgumentAxis>
                    <Legend position="inside"
                            columnCount={2}
                            customizeItems={customizeItems}
                            horizontalAlignment="right">
                        <Border visible={true}/>
                    </Legend>
                    <Export enabled={true}/>
                    <Tooltip enabled={true}/>
                </Chart>
            </div>
        );
    }
}

// Sort the histogram items
function customizeItems(items) {
    var sortedItems = [];

    items.forEach(function (item) {
        var startIndex = item.series.stack === 'damaging' ? 0 : 3;
        sortedItems.splice(startIndex, 0, item);
    });
    return sortedItems;
}

// Format the slider tooltip
function format(value) {
    return `${(Math.round(value) / 100).toFixed(2)}`;
}
