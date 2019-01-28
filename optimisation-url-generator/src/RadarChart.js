import React, { Component } from 'react';
import { 
	Select, Button, Input, 
	Label, Form } from 'semantic-ui-react';

import './styling/RadarChart.css';

const metricOptionsRadar = [
	{ key: 'recall', text: 'Recall', value: 'recall'},
	{ key: 'precision', text: 'Precision', value: 'precision'},
	{ key: 'threshold', text: 'Threshold', value: 'threshold'},
]

export default class RadarChart extends Component {

	state = {
	}
	
	render() {
		
		
		return (
			<div id='RadarChart'>
				<div id='ParameterSelection'>
					<Input id='ParameterSelectionInput' type='text' placeholder='Value between 0.0 and 1.0' action>
						<input />
						<Select compact options={metricOptionsRadar} defaultValue='recall' />
						<Button type='submit'>GO!</Button>
					</Input>
				</div>
				<hr className="DividerClass"/>
				<div id='Visualisation'>
				
				</div>
			</div>
		)
	}
}