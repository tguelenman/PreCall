import React, { Component, Fragment } from 'react'
import './styling/ThresholdBar2.css'

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

function Handle({
	handle: { id, value, percent }, 
	getHandleProps
}) {
	return (
		<div
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
			<div style={{ fontFamily: 'Arial', fontSize: 11, marginTop: -35 }}>
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
	
	render () {
		
		const threshold = this.props.threshold
		//const labelStyle={ marginTop: 400 - threshold * 400 }
		//const thresholdValueStyle= {marginTop: 410 - threshold * 400}

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
					<div className='thresholdRail' {...getRailProps()} /> 
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

