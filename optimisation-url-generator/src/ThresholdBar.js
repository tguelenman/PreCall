import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import './styling/ThresholdBar.css'


export default class ThresholdBar extends Component {
	
	state = {
		threshold: this.props.threshold,
	}
	
	componentWillReceiveProps = (nextProps) => {
		this.setState({ threshold: nextProps.threshold, })
	}
		
	handleOnChange = (value) => {
		this.setState({
			threshold: value / 1000
		})
	}
	render () {
		const threshold = this.state.threshold
		
		const labelStyle={ marginLeft: threshold * 200 }
		return (
			<div id='thresholdBar'>
				{ threshold ? 
					<div id='sliderContainer'>
						<div id='thresholdTitle'>
							<h3>Threshold: {threshold}</h3>
						</div>
						<div id='goodToDamagingLabel' style={labelStyle}>
							<p>good</p><p>damaging</p>
						</div>
						<Slider
							value={threshold * 1000}
							orientation="horizontal"
							onChange={this.handleOnChange}
							min={0}
							max={1000}
							steps={1}
							tooltip={false}
						/>
						<div id='zeroToOneLabel'>
							<p>0</p><p>1</p>
						</div>
					</div>
				: ''					
				}
				
			</div>
		)
	}

}
