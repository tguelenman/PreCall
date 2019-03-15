import React, { Component } from 'react'
import { 
	Select, Button, Input, 
	} from 'semantic-ui-react'
import RadarChart from './RadarChart.js'
import MetricsShow from './MetricsShow.js'
import ThresholdBar from './ThresholdBar.js'
import ConfusionDistribution from './ConfusionDistribution.js'
import PreviewLegend from './PreviewLegend.js'
import ConfusionFilter from './ConfusionFilter.js'

import './styling/Visualisations.css';

const metricOptionsRadar = [
	{ key: 'fpr', text: 'false positive rate', value: 'fpr'},
	{ key: 'precision', text: 'precision', value: 'precision'},
	{ key: 'recall', text: 'recall', value: 'recall'},
]

export default class Visualisations extends Component {

	state = {
		goMetric: 'recall',
		metricValue: '',
		tellUserAboutChange: false,
		finalValues: '',
	}
	
	handleChangeMetric = (e, { name, value }) => {
		this.setState({ [name]: value })
	}
	
	handleChangeMetricValue = (e, { name, value }) => {
		this.setState({ [name]: parseFloat(value) })
	}

	setNewValues = () => {
		const { goMetric, metricValue } = this.state
		const data = this.props.data
		
		//find the closest existing value to the specified one
		//(metricValue is specified by the User)
		const definitiveValue = this.findClosestValue(goMetric, metricValue)
		
		//now find the index of an object (set of metric values)
		//that corresponds to the specified metric and its definitiveValue
		const indexOfDataObject = this.findWithAttr(data, goMetric, definitiveValue)

		//with that index, get the object
		const finalValues = data[indexOfDataObject]
		
		if (finalValues === undefined) {
			return false
		}
		
		this.setState({
			finalValues: finalValues,
			tellUserAboutChange: (definitiveValue !== metricValue),
		})
		
		/*TODO
		if definitiveValue !== metricValue{
			this.setState({tellUserAboutChange: true,})
		}*/
	}
	
	adjustValues = (metric, metricValue) => {

		const newThreshold = this.findThresholdForMetricValue(metric, metricValue)
		if(newThreshold !== this.state.finalValues['threshold']){
			this.setNewThreshold(newThreshold)		
		}
		
	}
	
	componentDidMount = () => {
		if(!this.state.didMountOnce) {
			this.setState({
				goMetric: 'threshold',
				metricValue: 0.5,
				didMountOnce: true,
			}, () => { this.setNewValues() })
		}
	}
	
	findThresholdForMetricValue = (metric, metricValue) => {
		const data = this.props.data
		const existingValue = this.findClosestValue(metric, metricValue)
		for (var entry in data){
			if (existingValue === data[entry][metric]){
				//TODO slightly different results possible...?
				return data[entry]['threshold']
			}
		}
	}
	
	findClosestValue = (metric, metricValue) => {
		const data = this.props.data
		
		//create array with all values of specified metric
		var metricArray = []
		for (var entry in data){
			metricArray.push(data[entry][metric])
		}
				
		//ascending sort
		metricArray.sort((a, b) => a - b)

		/**** //find the closest value of the metric to the specified value ****/
		const lastElem = metricArray[metricArray.length-1]
		if (lastElem <= metricValue){
			return lastElem
		}
		
		for (var i in metricArray){
			//the wanted value of the specified metric exists
			if (metricArray[i] === metricValue) {
				return metricValue
			}
			
			//the wanted value does not exist
			else if (metricArray[i] > metricValue) {
				
				//find its closest neighbour and return it
				if (metricArray[i-1] !== 'undefined'){
					return metricArray[i]
				}
				else if (Math.abs(metricArray[i]-metricValue) <= Math.abs(metricArray[i-1]-metricValue)){
					return metricArray[i]
				}
				else{
					return metricArray[i-1]
				}
			}
		}
	}
	
	//find index of an object, in an array of objects, by the value of an attribute
	findWithAttr = (array, attr, value) => {
		for(var i = 0; i < array.length; i += 1) {
			if(array[i][attr] === value) {
				return i;
			}
		}
		return -1;
	}
	
	setNewThreshold = (thresholdValue) => {
		this.setState({
			goMetric: 'threshold',
			metricValue: thresholdValue,
		}, () => {this.setNewValues()})
	}
	
	render() {
		const {
			finalValues, tellUserAboutChange, goMetric,
			metricValue, 
		} = this.state
						
		return (

			<div id='Visualisations'>				
				{ finalValues ?
					<div id='BottomFlexContainer'>
						<h2 className='title' id='mainTitle'>ORES Human-Centered Parameter Optimization</h2>
						<div id='paramsAndThreshold'>
							<div id='parameters'>
								<h2 className='title'>Parameters</h2>
								<RadarChart chart={'#chart'} finalValues={finalValues} adjustValues={this.adjustValues}/>						
							</div>
							<div id='threshold'>
								<h2 className='title'>Decision Threshold</h2>
								<ThresholdBar threshold={finalValues['threshold']} newOverallThreshold={this.setNewThreshold} /> 
							</div>
						</div>
						<div id='preview'>
							<PreviewLegend/>
							<ConfusionDistribution metricValues={finalValues}/>
						</div>

						
					</div> : ''
				}
				<hr className="dividerClass"/>

				<ConfusionFilter data={this.props.data}/>
				
				<hr className="dividerClass"/>
				
				<div id='ParameterSelection'>
					<Input id='ParameterSelectionInput' name='metricValue' onChange={this.handleChangeMetricValue} placeholder='Value between 0.0 and 1.0' action>
						<input />
						<Select compact name='goMetric' options={metricOptionsRadar} value={this.state.goMetric} onChange={this.handleChangeMetric}/>
						<Button type='submit' onClick={this.setNewValues}>GO!</Button>
					</Input>
				</div>
				{ tellUserAboutChange ? <p className='automaticValueChange'>You have chosen a value of {metricValue} for {goMetric}. The next closest possible value has been selected for you: {finalValues[goMetric]}.</p> :
					metricValue ? <p className='automaticValueChange'>You have chosen a value of {metricValue} for {goMetric}.</p> :
					<p className='automaticValueChange'>Please choose a metric and a value.</p> }
				
				<hr className="dividerClass"/>

				<div id='RadarInformation'>
					<MetricsShow metricValues={finalValues} numberOfColumns={2} styling={'SmallLabels'} thresholdWithout={true}/>
				</div>
			</div>
		)
	}
}