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
		
		const labelStyle={ marginTop: 410 - threshold * 400 }
		return (
			<div>
				{ threshold ? 
					<div id='thresholdBar'>

						<div id='sliderContainer'>
							<div id='thresholdValue'>
								<p style={labelStyle}>{threshold}</p>
							</div>
							<Slider
								value={threshold * 1000}
								orientation="vertical"
								onChange={this.handleOnChange}
								min={0}
								max={1000}
								steps={1}
								tooltip={false}
							/>
							<div id='zeroToOneLabel'>
								<p>1.0</p><p>0.0</p>
							</div>
							<div id='goodToDamagingLabel' style={labelStyle}>
								<p>damaging</p><p>good</p>
							</div>

						</div> 
					</div>
				: '' }
			</div>
		)
	}

}

