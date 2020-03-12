import React, {Component} from 'react'
import {Slider} from 'devextreme-react/slider';
import {
    Chart, Series, CommonSeriesSettings, Legend, ValueAxis, ArgumentAxis, Title, Export, Tooltip, Border
} from 'devextreme-react/chart';

function round(a) {
    return Number(Math.round(a + 'e' + 2) + 'e-' + 2);
}

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
        if (i % factor === 0) {
            temp.push(data[i]);
        }
    }
    return temp;
}

export default class Histogram2 extends Component {
    constructor(props) {
        super(props);
        this.state = {sliderValue: 20};
        this.setSliderValue = this.setSliderValue.bind(this);
        this.histogram_data = calculate_everything(this.props.data);
    }

    render() {
        let data = thin_histogram(this.props.reduce ? this.props.reduce : 1, this.histogram_data);

        return (
            <div className="dx-form">
                <div className="dx-field custom-height-slider">
                    <div className="dx-field-value">
                        <Slider flex={1} min={0} max={100} defaultValue={65} tooltip={{
                            enabled: true,
                            showMode: 'always',
                            position: 'bottom',
                            format
                        }}/>
                    </div>
                </div>
                <Chart
                    id="chart"
                    title="Histogram"
                    dataSource={this.props.remove_first ? data.slice(1, -1) : data}
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
                    <ValueAxis>
                        <Title text="Percent of all edits"/>
                    </ValueAxis>
                    <ArgumentAxis>
                        <Title text="Threshold required for an edit to be classified as damaging"/>
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

    setSliderValue({value}) {
        this.setState({sliderValue: value});
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
