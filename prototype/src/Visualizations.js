import React, { Component } from 'react'
import { 
	Select, Button, Input, 
	} from 'semantic-ui-react'
import RadarChart2 from './RadarChart2.js'
import MetricsShow from './MetricsShow.js'
import ThresholdBar from './ThresholdBar.js'
import ConfusionDistribution from './ConfusionDistribution.js'
import PreviewLegend from './PreviewLegend.js'
import ConfusionFilter from './ConfusionFilter.js'

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

	setNewValues = () => {
		
		const { metric, metricValue } = this.state
		const data = this.props.data
		
		//find the closest existing value to the specified one
		//(metricValue is specified by the user by interacting with the visualizations)
		const definitiveValue = this.findClosestValue(metric, metricValue)
		

		//now find the index of an object (set of metric values)
		//that corresponds to the specified metric and its definitiveValue
		const indexOfDataObject = this.findWithAttr(data, metric, definitiveValue)

		//console.log(definitiveValue, metric)

		//with that index, get the object
		const finalValues = data[indexOfDataObject]
		
		if (finalValues === undefined) {
			return false
		}
		
		
		//and save it to the state
		this.setState({
			finalValues: finalValues,
			tellUserAboutChange: (definitiveValue !== metricValue),
		})
	}
	
	adjustValues = (metric, metricValue, changeByRadar) => {

		if(changeByRadar){

			this.setState({
				lastChangeByRadar: true,
				metric: metric,
				metricValue: metricValue,
			}, () => {this.setNewValues()})
		
		} else {
			
			this.setState({
				lastChangeByRadar: false,
				metric: metric,
				metricValue: metricValue,
			}, () => {this.setNewValues()})
		}
	}
	
	componentDidMount = () => {
		
		if(!this.state.didMountOnce) {
			
			this.setState({
				metric: 'threshold',
				metricValue: 0.5,
				didMountOnce: true,
			}, () => { this.setNewValues() })
			
		}
	}
	
	/*findThresholdForMetricValue = (metric, metricValue) => {
		const data = this.props.data
		const existingValue = this.findClosestValue(metric, metricValue)
		for (var entry in data){
			if (existingValue === data[entry][metric]){
				//TODO slightly different results possible...?
				return data[entry]['threshold']
			}
		}
	}*/
	
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
		//console.log(attr, value)
		for(var i = 0; i < array.length; i += 1) {
			//console.log(array[i][attr])
			if(array[i][attr] === value) {
				return i;
			}
		}
		return -1;
	}
	
	setNewThreshold = (thresholdValue) => {
		this.adjustValues('threshold', thresholdValue)
	}
	
	render() {
		
		//note: metricValue does not contain a necessarily *existing* value for metric
		//the existing value is calculated in setNewValues() and then saved as part of finalValues
		
		const {
			finalValues, tellUserAboutChange, metric,
			metricValue, lastChangeByRadar, 
		} = this.state
		
		var finalValuesRadar = finalValues
		console.log(finalValues)
		if(lastChangeByRadar && finalValues[metric] !== metricValue){
			
			//TODO functional
			finalValuesRadar = {}
			finalValuesRadar[metric] = metricValue

			for (var m in finalValues){
				if(m !== metric){
					finalValuesRadar[m] = finalValues[m]
				}
			}
			
			/*finalValuesRadar['fpr'] = finalValues['fpr']
			finalValuesRadar['recall'] = finalValues['recall']*/
			
						
			console.log("changed to: ",finalValuesRadar)

		}
		//console.log(finalValues['recall'])
		
		return (

			<div id='Visualizations'>				
				{ finalValues ?
					<div id='BottomFlexContainer'>
						<h2 className='title' id='mainTitle'>ORES Human-Centered Model Inspection</h2>
						<div id='metricsAndThreshold'>
							<div id='qualityMetrics'>
								<h2 className='title'>Model quality metrics</h2>
								<RadarChart2 finalValues={finalValuesRadar} adjustValues={this.adjustValues}/>						
							</div>
							<div id='threshold'>
								<h2 className='title'>Threshold good / damaging</h2>
								<ThresholdBar threshold={finalValues['threshold']} setNewThreshold={this.setNewThreshold} /> 
							</div>
						</div>
						<div id='preview'>
							<PreviewLegend/>
							<ConfusionDistribution data={this.props.data} finalValues={finalValues} setNewThreshold={this.setNewThreshold}/>
						</div>
					</div> : ''
				}
				
				<hr className="dividerClass"/>
				<ConfusionFilter data={this.props.data} setNewThreshold={this.setNewThreshold} currentThreshold={finalValues['threshold']}/>
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