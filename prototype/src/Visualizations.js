import React, { Component } from 'react'
import { Select, Button, Input, } from 'semantic-ui-react'
import RadarChart from './RadarChart.js'
import MetricsShow from './MetricsShow.js'
import ConfusionDistribution from './ConfusionDistribution.js'
import PreviewLegend from './PreviewLegend.js'
import ConfusionFilter from './ConfusionFilter.js'
import ThresholdBar from './ThresholdBar.js'

import './styling/Visualizations.css';

const metricOptionsRadar = [
	{ key: 'fpr', text: 'false positive rate', value: 'fpr'},
	{ key: 'precision', text: 'precision', value: 'precision'},
	{ key: 'recall', text: 'recall', value: 'recall'},
]

export default class Visualizations extends Component {

	state = {
		metric: 'recall',
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

	setNewValues = (metric, metricValue, lastChangeByRadar) => {
		//lastChangeByRadar = true, false
		
		const data = this.props.data
		
		//find the closest existing value to the specified one
		//(metricValue is specified by the user by interacting with the visualizations)
		const definitiveValue = this.findClosestValue(metric, metricValue)
		
		//now find the index of an object (set of metric values)
		//that corresponds to the specified metric and its definitiveValue
		const indexOfDataObject = this.findWithAttr(data, metric, definitiveValue)

		//with that index, get the object
		const finalValues = data[indexOfDataObject]
		
		if (finalValues === undefined) {
			return false
		}

		//sometimes we might not need to rerender - that case gets catched here
		if(definitiveValue !== this.state.finalValues[metric]){
			
			//and save it to the state
			this.setState({
				finalValues: finalValues,
				tellUserAboutChange: (definitiveValue !== metricValue),
				metric: metric,
				metricValue: metricValue,
				lastChangeByRadar: lastChangeByRadar,
			})
			
		}
		else{
			console.log("def: ",definitiveValue,", state: ",this.state.finalValues[metric])
		}
	}
	
	componentDidMount = () => {
		
		if(!this.state.didMountOnce) {
			
			this.setState({
				didMountOnce: true,
			}, () => { this.setNewValues('threshold',0.5) })
			
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
		
		this.setNewValues('threshold', thresholdValue)
		
	}
	
	render() {
		
		//note: metricValue does not contain a necessarily *existing* value for metric
		//the existing value is calculated in setNewValues() and then saved as part of finalValues
		
		const {
			finalValues, tellUserAboutChange, metric,
			metricValue, lastChangeByRadar, 
		} = this.state
		
		/*We need finalValues, but with the currently handled value not changed to an actually existing one.
		This means that on the radar chart, we want to keep e.g. precision 0.349, even if the closest existing value
		is 0.35, because it would cause the handle to jump around a little on the radar otherwise.
		This does not influence the actual result or other values, as the original finalValues remains intact.*/
		
		var finalValuesRadar = finalValues
		if(lastChangeByRadar && finalValues[metric] !== metricValue){
			
			finalValuesRadar = {}
			finalValuesRadar[metric] = metricValue

			for (var m in finalValues){
				if(m !== metric){
					finalValuesRadar[m] = finalValues[m]
				}
			}
		}
		
		return (

			<div id='Visualizations'>
			
				{ finalValues ?
					<div id='BottomFlexContainer'>
						<h2 className='title' id='mainTitle'>ORES Human-Centered Model Inspection</h2>
						<div id='metricsAndThreshold'>
							<div id='qualityMetrics'>
								<h2 className='title'>Model quality metrics</h2>
								<RadarChart finalValuesRadar={finalValuesRadar} displayValues={finalValues} callback={this.setNewValues}/>						
							</div>
							<div id='threshold'>
								<h2 className='title'>Threshold good / damaging</h2>
								<ThresholdBar threshold={finalValues['threshold']} callback={this.setNewValues} /> 
							</div>
						</div>
						<div id='preview'>
							<PreviewLegend/>
							<ConfusionDistribution data={this.props.data} finalValues={finalValues} callback={this.setNewValues}/>
						</div>
					</div> : ''
				}
				
				<hr className="dividerClass"/>
				<ConfusionFilter data={this.props.data} callback={this.setNewValues} currentThreshold={finalValues['threshold']}/>
				<hr className="dividerClass"/>
				<div id='ParameterSelection'>
					<Input id='ParameterSelectionInput' name='metricValue' onChange={this.handleChangeMetricValue} placeholder='Value between 0.0 and 1.0' action>
						<input />
						<Select compact name='metric' options={metricOptionsRadar} value={this.state.metric} onChange={this.handleChangeMetric}/>
						<Button type='submit' onClick={this.setNewValues}>GO!</Button>
					</Input>
				</div>
				
				{ tellUserAboutChange ? <p className='automaticValueChange'>You have chosen a value of {metricValue} for {metric}. The next closest possible value has been selected for you: {finalValues[metric]}.</p> :
					metricValue ? <p className='automaticValueChange'>You have chosen a value of {metricValue} for {metric}.</p> :
					<p className='automaticValueChange'>Please choose a metric and a value.</p> 
				}
				
				<hr className="dividerClass"/>
				<div id='RadarInformation'>
					<MetricsShow finalValues={finalValues} numberOfColumns={2} styling={'SmallLabels'} thresholdWithout={true}/>
				</div>
			</div>
		)
	}
}