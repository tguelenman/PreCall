import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import RadarChart from './RadarChart.js'
import ConfusionDistribution from './ConfusionDistribution.js'
import ThresholdBar from './ThresholdBar.js'
import Histogram from './Histogram.js'
import SelectorBars from "./SelectorBars.js";
import ConfusionMatrix from "./ConfusionMatrix.js";
import EditViewer from "./EditViewer.js";
import {Steps} from 'intro.js-react'
import 'intro.js/introjs.css'
import './styling/Visualizations.css';
import {ConfusionUtil} from "./ConfusionUtil";

let util = [];
let last_call = 0;
let last_caller = "";

export default class Visualizations extends Component {

    state = {
        metric: 'recall',
        metricValue: '',
        finalValues: '',
        confusion: '',
        stepsEnabled: false,
        initialStep: 0,
        steps: [
            {
                element: '#threshold',
                intro: "The model's current threshold for classifying edits as damaging or not. Move the handle and see the other visualizations change.",
            },
            {
                element: '#qualityMetrics',
                intro: 'The model quality metrics section will help you keep track of the interdependencies between recall, precision and false positive rate. Handle dragging interaction is supported.',
            },
            {
                element: '#preview',
                intro: "This section visualizes the classifier's performance by specifying the confusion matrix outputs. Increase and decrease directly by clicking and holding the buttons.",
            },
        ],
        svgLine: {
            x1: null,
            x2: null,
            y1: null,
            y2: null,
            offset_x: 178,
            offset_y: 109
        }
    };

    setNewValues = (metric, metricValue, lastChangeByRadar) => {
        //lastChangeByRadar = true, false

        const data = this.props.data;

        //find the closest existing value to the specified one
        //(metricValue is specified by the user by interacting with the visualizations)
        const definitiveValue = this.findClosestValue(metric, metricValue);

        //now find the index of an object (set of metric values)
        //that corresponds to the specified metric and its definitiveValue
        const indexOfDataObject = this.findWithAttr(data, metric, definitiveValue);

        //with that index, get the object
        const finalValues = data[indexOfDataObject];

        if (finalValues === undefined) {
            return false
        }

        //sometimes we might not need to rerender - that case gets intercepted here
        if (definitiveValue !== this.state.finalValues[metric]) {

            //and save it to the state
            this.setState({
                finalValues: finalValues,
                metric: metric,
                metricValue: metricValue,
                lastChangeByRadar: lastChangeByRadar,
            })

        }
    };

    update_everything = (metric, metric_value, caller=null) => {
        let milis = new Date().getTime();

        // trigger an update only every 35 ms.
        if (last_call + 25 > milis){
            return;
        }

        if (metric === 'TP' || metric === 'FP') {
            // If the metrics are equal, then there is no need to update the state
            if (this.state.confusion !== '' && this.state.confusion[metric.toLowerCase()] === metric_value) {
                console.log("not updating state for " + metric);
                return;
            }

            // If last update was triggered by the histogram in the last 100 ms, don't update the state.
            // Because otherwise every time the user interacts with the histogram, the Selector Sliders
            // call the update method as well. So essentially for a single interaction the update function
            // is being called twice.
            if ((last_caller === "histogram" || last_caller === "confusionfilter")
                && last_call + 200 > milis){
                return;
            }

            const index = util.setConfusion(metric, metric_value);

            this.setState({
                confusion: {
                    tp: util.allTPs[index],
                    tn: util.allTNs[index],
                    fp: util.allFPs[index],
                    fn: util.allFNs[index]
                },
                finalValues: {
                    threshold: util.thresholds[index]
                }
            });
        } else {
            // if the metrics are equal, then there is no need to update the state
            if (this.state.finalValues !== '' && this.state.finalValues.threshold === metric_value) {
                console.log("not updating state for " + metric);
                return;
            }

            // when the threshold is updated we need to find the index in util.thresholds
            // so we can set the whole confusion matrix
            const index = ConfusionUtil.bin_search(metric_value, util.thresholds);

            this.setState({
                confusion: {
                    tp: util.allTPs[index],
                    tn: util.allTNs[index],
                    fp: util.allFPs[index],
                    fn: util.allFNs[index]
                },
                finalValues: {
                    threshold: util.thresholds[index]
                }
            });
        }

        last_call = milis;
        last_caller = caller;
        console.log(this.state.finalValues.threshold);
        console.log(util.thresholds);
    };

    componentDidMount = () => {

        if (!this.state.didMountOnce) {

            this.setState({
                didMountOnce: true,
            }, () => {
                this.setNewValues('threshold', 0.5)
            })

        }
    };

    findClosestValue = (metric, metricValue) => {

        const data = this.props.data

        //create array with all values of specified metric
        let metricArray = []
        for (let entry in data) {

            metricArray.push(data[entry][metric])

        }

        //ascending sort
        metricArray.sort((a, b) => a - b)

        const lastElem = metricArray[metricArray.length - 1]
        if (lastElem <= metricValue) {

            return lastElem

        }

        for (let i in metricArray) {

            //the wanted value of the specified metric exists
            if (metricArray[i] === metricValue) {

                return metricValue

            }

            //the wanted value does not exist
            else if (metricArray[i] > metricValue) {

                //find its closest neighbour and return it
                if (metricArray[i - 1] !== 'undefined') {

                    return metricArray[i]

                } else if (Math.abs(metricArray[i] - metricValue) <= Math.abs(metricArray[i - 1] - metricValue)) {

                    return metricArray[i]

                } else {

                    return metricArray[i - 1]

                }
            }
        }
    }

    //find index of an object, in an array of objects, by the value of an attribute
    findWithAttr = (array, attr, value) => {

        for (let i = 0; i < array.length; i += 1) {

            if (array[i][attr] === value) {

                return i;

            }
        }

        return -1;

    }

    setNewThreshold = (thresholdValue) => {

        this.setNewValues('threshold', thresholdValue)

    }

    startTutorial = () => {
        this.setState({
            stepsEnabled: true,
        })
    }

    closeTutorial = () => {
        this.setState({
            stepsEnabled: false,
        })
    }

    render() {

        if (util.length === 0) {
            util = new ConfusionUtil(this.props.data);
            this.update_everything("FP", 35);
            console.log(this.state.confusion);
        }

        //note: metricValue does not contain a necessarily *existing* value for metric
        //the existing value is calculated in setNewValues() and then saved as part of finalValues

        const {
            finalValues, metric, confusion, svgLine,
            metricValue, lastChangeByRadar, stepsEnabled,
            steps, initialStep,
        } = this.state;

        /*We need finalValues, but with the currently handled value not changed to an actually existing one.
        This means that on the radar chart, we want to keep e.g. precision 0.349, even if the closest existing value
        is 0.35, because it would cause the handle to jump around a little on the radar otherwise.
        This does not influence the actual result or other values, as the original finalValues remains intact.*/

        let finalValuesRadar = finalValues
        if (lastChangeByRadar && finalValues[metric] !== metricValue) {

            finalValuesRadar = {}
            finalValuesRadar[metric] = metricValue

            for (let m in finalValues) {
                if (m !== metric) {
                    finalValuesRadar[m] = finalValues[m]
                }
            }
        }

        // calculate the slider domain ( tp + fn ) then do slider_height * tp / domain
        svgLine.y1 = svgLine.offset_y + (400 * confusion.tp / (confusion.tp + confusion.fn));
        svgLine.y2 = svgLine.offset_y + (400 * confusion.fp / (confusion.fp + confusion.tn));

        // grid column 1 * content width + handle stick => (10% * 144 + 55)
        svgLine.x1 = 199;
        // x1 + grid column 2
        svgLine.x2 = 199 + 354;

        return (

            <div id='Visualizations'>

                {finalValues ?

                    <div id='BottomFlexContainer'>
                        <div id='mainTitleAndButton'>
                            <h2 className='title' id='mainTitle'>PreCall: ORES Human-Centered Model Selection</h2>
                        </div>
                        <div id='histogram'>
                            <Histogram threshold={finalValues['threshold']} data={this.props.data}
                                       callback={this.update_everything} reduce={15} remove_first={false}/>
                        </div>
                        <div className='grid_container'>
                            <svg width="1000" height="1000">
                                <line id="line1" x1={194} y1={svgLine.y1} x2={194 + 353} y2={svgLine.y2}/>
                            </svg>
                            <div id='selectorBars'>
                                <SelectorBars threshold={finalValues['threshold']}
                                              data={this.props.data} callback={this.update_everything}
                                              confusion={confusion}/>
                            </div>
                            <div id='confusionMatrix'>
                                <ConfusionMatrix callback={this.update_everything} threshold={finalValues['threshold']}
                                                 data={this.props.data} confusion={confusion}/>
                            </div>
                            <div className='editViewerContainer'>
                                <EditViewer threshold={finalValues['threshold']}/>
                            </div>
                        </div>
                    </div> : ''
                }

                {/*<div id='RadarInformation'>
					<MetricsShow finalValues={finalValues} numberOfColumns={2} styling={'SmallLabels'} thresholdWithout={true}/>
				</div>*/}
            </div>
        )
    }
}
