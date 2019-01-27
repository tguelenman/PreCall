import React, { Component } from 'react';
import './styling/ApiCallsTestrange.css';
import Request from 'superagent';


export default class ApiCallsTestrange extends Component {
	state = {
		currentUrl: "https://ores.wikimedia.org/v3/scores/enwiki/?models=damaging&model_info=statistics.thresholds.true.'maximum recall @ precision >= 0.9'",
		fetchedResults: '',
	}

	componentDidMount = () => {
		Request
			.get(this.state.currentUrl)
			.then( res => {
				this.setState({
					fetchedResults: res.body
					//fetchedResults: res.body["enwiki"]["models"]["damaging"]["statistics"]["thresholds"]["true"],
				})
				// res.body, res.headers, res.status
				console.log(res.body)
			})
			.catch(err => {
				// err.message, err.response
			});
	}

	render() {
		var parsedJSON = JSON.stringify(this.state.fetchedResults)
		return (
			<div id="TestRange">
			<p>{parsedJSON}</p>
			</div>
		)
	}
}