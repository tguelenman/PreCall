import React, {Component} from 'react'
import {Slider} from 'devextreme-react/slider';
import {
    Chart, Series, CommonSeriesSettings, Legend, ValueAxis, Title, Export, Tooltip, Border
} from 'devextreme-react/chart';

const mockData = [
    {threshold: 0.56, true_positive: 500, false_positive: 60, false_negative: -400},
    {threshold: 0.79, true_positive: 250, false_positive: 20, false_negative: -700},
    {threshold: 0.26, true_positive: 850, false_positive: 140, false_negative: -160}
];

export default class Histogram2 extends Component {
    constructor(props) {
        super(props);
        this.state = {sliderValue: 20};
        this.setSliderValue = this.setSliderValue.bind(this);
    }

    render() {
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
                    dataSource={mockData}
                >
                    <CommonSeriesSettings argumentField="threshold" type="stackedBar"/>
                    <Series
                        valueField="true_positive"
                        name="TP"
                        stack="damaging"
                    />
                    <Series
                        valueField="false_negative"
                        name="False Negative"
                        stack="damaging"
                    />
                    <Series
                        valueField="false_positive"
                        name="False Positive"
                        stack="good"
                    />
                    <ValueAxis>
                        <Title text="Percent of all edits"/>
                    </ValueAxis>
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
