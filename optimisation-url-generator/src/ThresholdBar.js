import React, { Component } from 'react'
import HSBar from "react-horizontal-stacked-bar-chart";

import './styling/ThresholdBar.css'


export default class ThresholdBar extends Component {
	
	state = {
		threshold: this.props.threshold,
	}
	
	componentWillReceiveProps = (nextProps) => {
		this.setState({ threshold: nextProps.threshold, })
	}
	
	render () {
		const threshold = this.state.threshold
		
		return (
			<div id='thresholdBarDiv'>
				<h2>Threshold Result</h2>
				{ threshold ? <HSBar id='thresholdBar'
					showTextDown
					data={[
						{ value: threshold, description: '0', color: 'rgb(155,205,180)' },
						{ value: 0.01, description: ' ', color: 'black'},
						{ value: 1-threshold, description: <div id='thresholdDiv'><p id='thresholdP'>{threshold}</p><p>Threshold</p></div>, color: 'rgb(205,130,130)' },
						{ value: 0.01, description: '1', color: 'rgb(205,130,130)' },						
					]}
				/> : ''					
				}
				
			</div>
		)
	}

}