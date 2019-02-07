import React from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import './styling/Testrange.css'


export default class Testrange extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			threshold: 0
		}
	}

	handleOnChange = (value) => {
		this.setState({
			threshold: value / 1000
		})
	}
	
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			threshold: nextProps.threshold,
		})
	}
  
	render() {
				const threshold = this.state.threshold
		
		const labelStyle={ marginTop: 325 - threshold * 300 }
		return (
			<div>
				<div id='thresholdBar'>
					<div id='thresholdTitle'>
						<h3>Threshold: {threshold}</h3>
					</div>
					<div id='sliderContainer'>
						<Slider
							value={threshold * 1000}
							orientation="vertical"
							onChange={this.handleOnChange}
							min={0}
							max={1000}
							steps={1}
							tooltip={false}
						/>
						<div id='goodToDamagingLabel' style={labelStyle}>
							<p>damaging</p><p>good</p>
						</div>
						<div id='zeroToOneLabel'>
							<p>0.0</p><p>1.0</p>
						</div>
					</div>
				</div>
				<div className='triangle2'><div className='innerTriangle2'/></div>
			</div>
		)
	}
}



