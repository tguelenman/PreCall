import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import './styling/ThresholdBar.css'


export default class ThresholdBar extends Component {
		
	handleOnChange = (value) => {

		//set the new threshold in parent
		this.props.callback('threshold',value/1000) 
		
	}
	
	componentDidMount = () => {
		
		//adjust Decision Threshold handle
		var handle = document.getElementsByClassName('rangeslider__handle')[0]
		var handleCircle = document.createElement('div')
		handleCircle.id = 'sliderHandleCircle'
		handle.appendChild(handleCircle)

	}	
	
	render () {
		
		const threshold = this.props.threshold
		const labelStyle={ marginTop: 400 - threshold * 400 }
		const thresholdValueStyle= {marginTop: 410 - threshold * 400}
		
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

