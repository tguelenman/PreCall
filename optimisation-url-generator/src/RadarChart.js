import React, { Component } from 'react';
import { 
	Select, Button, Input, 
	Label, } from 'semantic-ui-react';
import Radar from 'react-d3-radar';
import MetricsShow from './MetricsShow.js';

import './styling/RadarChart.css';

const metricOptionsRadar = [
	{ key: 'recall', text: 'Recall', value: 'recall'},
	{ key: 'precision', text: 'Precision', value: 'precision'},
	{ key: 'filter_rate', text: 'Filter_rate', value: 'filter_rate'},
]

export default class RadarChart extends Component {

	state = {
		goMetric: 'recall',
		metricValue: '',
		data: this.props.data,
		tellUserAboutChange: false,
		finalValues: '',
	}
	
	handleChangeMetric = (e, { name, value }) => {
		this.setState({ [name]: value })
	}
	
	handleChangeMetricValue = (e, { name, value }) => {
		this.setState({ [name]: parseFloat(value) })
	}

	goButtonClicked = () => {
		const { goMetric, metricValue, data } = this.state
		
		//find the closest existing value to the specified one
		//(metricValue is specified by the User)
		const definitiveValue = this.findClosestValue(goMetric, metricValue)
		
		//now find the index of an object (set of metric values)
		//that corresponds to the specified metric and its definitiveValue
		const indexOfDataObject = this.findWithAttr(data, goMetric, definitiveValue)

		//with that index, get the object
		const finalValues = data[indexOfDataObject]
		
		this.setState({
			finalValues: finalValues,
			tellUserAboutChange: (definitiveValue !== metricValue),
		})
		
		/*TODO
		if definitiveValue !== metricValue{
			this.setState({tellUserAboutChange: true,})
		}*/
	}
	
	findClosestValue = (metric, metricValue) => {
		const data = this.state.data
		
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
			//console.log("hi: ",metricValue, metricArray[i])
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
	
	render() {
		const {
			finalValues, tellUserAboutChange, goMetric,
			metricValue, 
		} = this.state
		
		/*const t = this.findClosestValue('recall', 1.0)
		console.log("hi :",t)*/
		
		//TODO chosen non existing value text: value changes on input change before pressing the button
		return (
			<div id='RadarChart'>
				<div id='ParameterSelection'>
					<Input id='ParameterSelectionInput' name='metricValue' onChange={this.handleChangeMetricValue} placeholder='Value between 0.0 and 1.0' action>
						<input />
						<Select compact name='goMetric' options={metricOptionsRadar} value={this.state.goMetric} onChange={this.handleChangeMetric}/>
						<Button type='submit' onClick={this.goButtonClicked}>GO!</Button>
					</Input>
				</div>
				{ tellUserAboutChange ? <p id='AutomaticValueChange'>You have chosen a value of {metricValue} for {goMetric}. The next closest possible value has been selected for you: {finalValues[goMetric]}.</p> :''}
				<hr className="DividerClass"/>
				<div id='BottomFlexContainer'>
					<div id='BottomFlexPart1'>
						<div id='VisualisationRadar'>
							{finalValues ? 
								<Radar id='RadarChart'
									width={400}
									height={400}
									padding={70}
									domainMax={1}
									highlighted={null}
									/*onHover={(point) => {
									if (point) {
										console.log('hovered over a data point');
									} else {
										console.log('not over anything');
										}
									}}*/
									data={{
										variables: [
											{key: 'recall', label: 'Recall'},
											{key: 'precision', label: 'Precision'},
											{key: 'filter_rate', label: 'Filter_rate'},
										],
										sets: [
											{
												key: 'get',
												label: 'GET Result',
												values: {
													//get these values from state
													recall: finalValues['recall'],
													precision: finalValues['precision'],
													filter_rate: finalValues['filter_rate'],
												},
											},
										],
									}}
								/> : ''
							}
						</div>
						<div id='VisualisationDistribution'>
						
						</div>
					</div>
					<div id='BottomFlexPart2'>
						<div id='RadarInformation'>
							{ finalValues? 
								<MetricsShow metrics={finalValues} numberOfColumns={2} style={'SmallLabels'} thresholdWithout={true}/>
								:
								<p>Please insert a value and choose a metric to display more information.</p>
							}
						</div>
						<div id='VisualisationResult'>
							<p>Threshold: {finalValues['threshold']}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}