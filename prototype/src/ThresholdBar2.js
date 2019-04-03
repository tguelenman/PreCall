import React, { Component, Fragment } from 'react'
import './styling/ThresholdBar2.css'

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

function Handle({
	handle: { id, value, percent }, 
	getHandleProps
}) {
	return (
		<div id='thresholdHandle'
			style={{
				top: `${percent}%`,
				position: 'absolute',
				zIndex: 2,
				width: 21,
				height: 21,
				border: '3px solid black',
				textAlign: 'center',
				cursor: 'pointer',
				borderRadius: '50%',
				backgroundColor: 'white',
				transform: 'translate(-50%, -50%)',
				zIndex: 5,
				marginLeft: -35,
			}}
			{...getHandleProps(id)}
		>
			<div id='thresholdLabel'>
					{value}
			</div>
		</div>
	)
}

function Track({ source, target, getTrackProps }) {
	return (
		<div className='thresholdTrack'
			style={{
					top: '${source.percent}%',
					height: `${target.percent - source.percent}%`,
					pointerEvents: 'none',
			}}
			{...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
		/>
	)
}


export default class ThresholdBar2 extends Component {
		
	onUpdate = (value) => {

		//set the new threshold in parent
		//this.props.callback('threshold',value/1000) 
		
	}
	
	componentDidMount = () => {
		
		//dynamically set blue to white background for bottom part of slider
		var rail = document.getElementById('thresholdRail')
		rail.style['background'] = 'linear-gradient(to top, #0083ca, white) bottom center/50px '+this.props.threshold*100+'% no-repeat'
		
		//attach "stick" to handle circle
		var handle = document.getElementById('thresholdHandle')
		var handleStick = document.createElement('div')
		handleStick.className = 'handleStick'
		handle.appendChild(handleStick)
		
		//position damaging / good labels
		var good = document.createElement('p')
		var damaging = document.createElement('p')
		good.className = 'good gd'
		damaging.className = 'damaging gd'
		good.innerHTML = 'good'
		damaging.innerHTML = 'damaging'
		handle.appendChild(damaging)
		handle.appendChild(good)

	}
	
	render () {
		
		const threshold = this.props.threshold
		const labelStyle={ marginTop: 400 - threshold * 400 }

		const slider = 
		<Slider className='thresholdSlider'
			vertical
			reversed
			domain={[0, 1]}
			step={0.001}
			mode={2}
			values={[0.5]}
			onUpdate={this.onUpdate1}
		>
			<Rail>
				{({ getRailProps }) => (  // adding the rail props sets up events on the rail
					<div id='thresholdRail' {...getRailProps()} /> 
				)}
			</Rail>
			<Handles>
				{({ handles, getHandleProps }) => (
					<div className='slider-handles'>
						{handles.map(handle => (
							<Handle
								key={handle.id}
								handle={handle}
								getHandleProps={getHandleProps}
							/>
						))}
					</div>
				)}
			</Handles>
			<Tracks right={false}>
				{({ tracks, getTrackProps }) => (
					<div className="slider-tracks">
						{tracks.map(({ id, source, target }) => (
							<Track
								key={id}
								source={source}
								target={target}
								getTrackProps={getTrackProps}
							/>
						))}
					</div>
				)}
			</Tracks>
			<div id='zeroToOneLabel'>
				<p>1.0</p><p>0.0</p>
			</div>
		</Slider>
			
		return (
			<div>
				{ threshold ? 
					<div id='thresholdBar'>
						{slider}
					</div>
				: '' }
			</div>
		)
	}
}

