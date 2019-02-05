import React, { Component } from 'react'
import { 
	Select, Button, Input, 
	Label, } from 'semantic-ui-react'
import RadarGraph from './RadarGraph.js'
import MetricsShow from './MetricsShow.js'
import ThresholdBar from './ThresholdBar.js'
import ConfusionDistribution from './ConfusionDistribution.js'

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

			<div id='Visualisations'>

				<div id='ParameterSelection'>
					<Input id='ParameterSelectionInput' name='metricValue' onChange={this.handleChangeMetricValue} placeholder='Value between 0.0 and 1.0' action>
						<input />
						<Select compact name='goMetric' options={metricOptionsRadar} value={this.state.goMetric} onChange={this.handleChangeMetric}/>
						<Button type='submit' onClick={this.goButtonClicked}>GO!</Button>
					</Input>
				</div>
				{ tellUserAboutChange ? <p id='AutomaticValueChange'>You have chosen a value of {metricValue} for {goMetric}. The next closest possible value has been selected for you: {finalValues[goMetric]}.</p> :''}
				<hr className="dividerClass"/>
				
				{ finalValues ?
					<div id='BottomFlexContainer'>
						<RadarGraph finalValues={finalValues}/>						
						<ThresholdBar threshold={finalValues['threshold']}/> 
						<ConfusionDistribution metricValues={finalValues}/>
							<div id='RadarInformation'>
								<MetricsShow metricValues={finalValues} numberOfColumns={2} styling={'SmallLabels'} thresholdWithout={true}/>
							</div>
					</div> : ''
				}
				
			</div>
		)
	}
}