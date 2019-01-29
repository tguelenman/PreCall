import React, { Component } from 'react';
import { 
	Select, Button, Input, 
	Label, } from 'semantic-ui-react';
import Radar from 'react-d3-radar';

import './styling/RadarChart.css';

const metricOptionsRadar = [
	{ key: 'recall', text: 'Recall', value: 'recall'},
	{ key: 'precision', text: 'Precision', value: 'precision'},
	{ key: 'threshold', text: 'Threshold', value: 'threshold'},
]

export default class RadarChart extends Component {

	state = {
		//TODO radar in state
		goMetric: 'recall',
	}
	
	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
		}

	render() {
		
		//TODO metricF etc.
		//var getUrl = "https://ores.wikimedia.org/v3/scores/enwiki/?models=damaging&model_info=statistics.thresholds.true.'"+minMax+" "+this.state.goMetric+" @ "+this.state.goMetric+" "+lg+" "+metricFloat+"'"

		//build the radar chart
		var radar = <Radar id='RadarChart'
			width={400}
			height={400}
			padding={70}
			domainMax={1}
			highlighted={null}
			onHover={(point) => {
			/*if (point) {
				console.log('hovered over a data point');
			} else {
				console.log('not over anything');
				}*/
			}}
		data={{
			variables: [
				{key: 'recall', label: 'Recall'},
				{key: 'precision', label: 'Precision'},
				{key: 'threshold', label: 'Threshold'},
			],
			sets: [
				{
					key: 'get',
					label: 'GET Result',
					values: {
						recall: 0.3,
						precision: 0.5,
						threshold: 0.7,
					},
				},
			],
		}}
		/>
		
		return (
			<div id='RadarChart'>
				<div id='ParameterSelection'>
					<Input id='ParameterSelectionInput' type='text' placeholder='Value between 0.0 and 1.0' action>
						<input />
						<Select compact name='goMetric' options={metricOptionsRadar} value={this.state.goMetric} onChange={this.handleChange}/>
						<Button type='submit'>GO!</Button>
					</Input>
				</div>
				<hr className="DividerClass"/>
				<div id='Visualisation'>
					{radar}
				</div>
			</div>
		)
	}
}