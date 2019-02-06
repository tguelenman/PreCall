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
			threshold: value
		})
	}
	
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			threshold: nextProps.threshold,
		})
	}
  
	render() {
		const { threshold } = this.state
		return (
			<div id='sliderContainer'>
				<Slider
					value={threshold}
					orientation="horizontal"
					onChange={this.handleOnChange}
				/>
				<div id='zeroToOneLabel'>
					<p>0</p><p>1</p>
				</div>
			</div>
		)
	}
}



