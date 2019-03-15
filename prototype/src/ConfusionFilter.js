import React, { Component } from 'react'

import './styling/ConfusionFilter.css'

export default class ConfusionFilter extends Component {
	
	state = {
	}

	calculateConfusion = () => {
		
		const data = this.props.data
		
		//arrays that will be saved to the state (once!)
		var allTPs = []
		var allFPs = []
		var allTNs = []
		var allFNs = []
		
		console.log("hi: ",data[0])
	}
	
	render () {
		
		/*const filters = Math.round(100*metricValues['filter_rate'])
		const matches = Math.round(100*metricValues['match_rate'])
		
		tp = Math.round(matches*metricValues['precision'])
		fp = matches-tp
		tn = Math.round(filters*metricValues['!precision'])
		fn*/
		
		this.calculateConfusion()
		
		
		
		return (
			<div>
			</div>
		)
	}
}