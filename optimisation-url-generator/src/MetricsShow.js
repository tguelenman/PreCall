import React, { Component } from 'react';
import { 
	Form, Input, 
	} from 'semantic-ui-react';

import './styling/MetricsShow.css';

export default class MetricsGetRequest extends Component {

	state = {
		metrics: this.props.metrics
	}
	
	render() {
		const { metrics, } = this.state
		console.log("MetricsShow: ",JSON.stringify(this.state.metrics))
		
		//TODO what to do if everything is null
		var output = []
		Object.keys(metrics).forEach(function(key) {
			console.log(key,metrics[key])
			output.push(
				<Form.Field>
					<Input className='MetricLabel' label={key} value={metrics[key] ? metrics[key] : "null"} />
				</Form.Field>
			)
		})
		
		return (
			<div>
				<Form id='MetricLabels'>
					{output}
				</Form>
			</div>
		)
	}
}