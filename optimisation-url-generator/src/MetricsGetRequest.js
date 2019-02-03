import React, { Component } from 'react';
import Request from 'superagent';
import { Button, } from 'semantic-ui-react';

import './styling/MetricsGetRequest.css';

export default class MetricsGetRequest extends Component {

	state = {
	}
	
	//just do the request
	requestMetrics = () => {
		Request
			.get(this.props.getUrl)
			.then( res => {
				
				//and send the answer back to the parent component
				this.props.requestHandler(res.body)
			})
			.catch(err => {
				// err.message, err.response
			});

	}
	
	render() {
		return (
			<Button id='GetResultsButton' color={'red'} onClick={this.requestMetrics}>Get Results</Button>
		)
	}
}