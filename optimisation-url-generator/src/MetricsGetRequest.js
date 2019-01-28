import React, { Component } from 'react';
import Request from 'superagent';
import { Button, } from 'semantic-ui-react';

import './styling/MetricsGetRequest.css';

export default class MetricsGetRequest extends Component {

	state = {
	}
	
	//ComponentWillUpdate = (nextProps) => {}

	requestMetrics = () => {
		console.log('currentURL: ',this.props.currentUrl)
		Request
			.get(this.props.currentUrl)
			.then( res => {
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