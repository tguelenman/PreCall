import React, { Component, Fragment } from 'react'
import './styling/ThresholdBar.css'

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

function round(val){
	
	//round to 3 digits
	return Math.round(val*1000)/1000

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
		this.props.callback('threshold',round(value[0])) 
		
	}

	Handle = ({
	
		handle: { id, value, percent }, 
		getHandleProps
		
	}) => {
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
						{this.props.threshold}
				</div>
				<div className='handleStick'/>
				<p className='damaging gd'>damaging</p>
				<p className='good gd'>good</p>
			</div>
			
		)
	}

	render () {
		
		const threshold = this.props.threshold
		const railStyle = {
			background: 'linear-gradient(to top, #0083ca, white) bottom center/50px '+this.props.threshold*100+'% no-repeat',
		}
		
		const slider = 
			<Slider className='thresholdSlider'
				vertical
				reversed
				domain={[0, 1]}
				step={0.001}
				mode={2}
				values={[threshold]}
				onUpdate={this.onUpdate}
			>
				<Rail>
					{({ getRailProps }) => (  // adding the rail props sets up events on the rail
						<div id='thresholdRail' style={railStyle} {...getRailProps()} /> 
					)}
				</Rail>
				<Handles>
					{({ handles, getHandleProps }) => (
						<div className='slider-handles'>
							{handles.map(handle => (
								<this.Handle
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

