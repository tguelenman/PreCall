import React, { Component } from 'react'
import './styling/ThresholdBar2.css'

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

const sliderStyle = {  // Give the slider some width
	position: 'relative',
	width: 80,
	height: '100%',
	border: '1px solid steelblue',
}

const railStyle = { 
	position: 'absolute',
	width: 10,
	height: '100%',
	borderRadius: 5,
	backgroundColor: '#8B9CB6',
}

export function Handle({ // your handle component
	handle: { id, value, percent }, 
	getHandleProps
}) {
	return (
		<div
			style={{
				top: `${percent}%`,
				position: 'absolute',
				          transform: 'translate(-50%, -50%)',

				marginLeft: 5,
				
				zIndex: 2,
				width: 30,
				height: 30,
				border: 0,
				textAlign: 'center',
				cursor: 'pointer',
				borderRadius: '50%',
				backgroundColor: '#2C4870',
				color: '#333',
			}}
			{...getHandleProps(id)}
		>
			<div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
				{value}
			</div>
		</div>
	)
}

function Track({ source, target, getTrackProps }) {
	return (
		<div
			style={{
			position: 'absolute',
			height: 300,
			zIndex: 1,
			marginTop: 35,
			backgroundColor: '#546C91',
			borderRadius: 5,
			cursor: 'pointer',
			left: `${source.percent}%`,
			height: `${target.percent - source.percent}%`,
			}}
			{...getTrackProps()}
		/>
	)
}

export default class ThresholdBar2 extends Component {
		
	onUpdate = (value) => {

		//set the new threshold in parent
		this.props.callback('threshold',value/1000) 
		
	}
	
	render () {
		
		const threshold = this.props.threshold
		//const labelStyle={ marginTop: 400 - threshold * 400 }
		//const thresholdValueStyle= {marginTop: 410 - threshold * 400}
		
		const slider = 
			<Slider
				vertical
				rootStyle={sliderStyle}
				domain={[0, 100]}
				step={1}
				mode={2}
				values={[30]}
			>
				<Rail>
					{({ getRailProps }) => (
						<div style={railStyle} {...getRailProps()} /> 
					)}
				</Rail>
				<Handles>
					{({ handles, getHandleProps }) => (
						<div className="slider-handles">
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

