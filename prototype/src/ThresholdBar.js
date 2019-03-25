import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import './styling/ThresholdBar.css'


export default class ThresholdBar extends Component {
	
	state = {
	}
	
	componentWillReceiveProps = (nextProps) => {
	}
		
	handleOnChange = (value) => {

		//a value of 0 for threshold is not allowed, note: 1 represents threshold of 0.001
		if (value === 0){
			value = 1
		}
		
		this.props.newOverallThreshold(value/1000) 
		
	}
	
	componentDidMount = () => {
		//adjust Decision Threshold handle
		var handle = document.getElementsByClassName('rangeslider__handle')[0]
		var handleCircle = document.createElement('div')
		handleCircle.id = 'sliderHandleCircle'
		handle.appendChild(handleCircle)
		
		//this.adjustThresholdBar()
		
	}	
		
	/*adjustThresholdBar = () => {
		
		//adjust upper background gradient
		const sliderTop = document.getElementsByClassName('rangeslider')[0]
		const newSize = '20px '+(400-this.state.threshold*400)+'px !important'
		sliderTop.setAttribute('background-size',newSize)		
	}*/
	
	render () {
		const threshold = this.props.threshold
		
		const labelStyle={ marginTop: 400 - threshold * 400 }
		const thresholdValueStyle= {marginTop: 410 - threshold * 400}
		
		/*if(document.getElementsByClassName('rangeslider rangeslider-vertical')[0]) {
			this.adjustThresholdBar()
		}*/
		
		return (
			<div>
				{ threshold ? 
					<div id='thresholdBar'>
						<div id='sliderContainer'>
							<div id='thresholdValue'>
								<p id='thresholdValueP' style={thresholdValueStyle}>{threshold}</p>
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

