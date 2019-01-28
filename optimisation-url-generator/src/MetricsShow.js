import React, { Component } from 'react';
import { Button, Input, Label} from 'semantic-ui-react';

import './styling/MetricsShow.css';

export default class MetricsGetRequest extends Component {

	state = {
		metrics: this.props.metrics
	}
	
	/*componentWillUpdate = (nextProps) => {
		this.setState({
			metrics: nextProps.metrics,
		})
	}*/
	
	render() {
		const { metrics, } = this.state
		console.log("MetricsShow: ",JSON.stringify(this.state.metrics))
		
		var output = []
		Object.keys(metrics).forEach(function(key) {
			console.log(key,metrics[key])
			output.push(
				<div>
					<Label>{key}</Label>:<Input>{metrics[key]}</Input>
				</div>
			)
		})
		
		return (
			<div>
			{output}
			</div>
		)
	}
}