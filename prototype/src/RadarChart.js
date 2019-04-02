import React, { Component } from 'react';

import './styling/RadarChart.css';

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

//export function Handle({
function Handle({
	handle: { id, value, percent }, 
	getHandleProps
}) {
	return (
		<div
			style={{
			left: `${percent}%`,
			position: 'absolute',
			marginLeft: -15,
			marginTop: 25,
			zIndex: 2,
			width: 21,
			height: 21,
			border: '3px solid black',
			textAlign: 'center',
			cursor: 'pointer',
			borderRadius: '50%',
			backgroundColor: 'white',
			}}
			{...getHandleProps(id)}
		>
			<div style={{ fontFamily: 'Arial', fontSize: 11, marginTop: -35 }}>
				{value}
			</div>
		</div>
	)
}

function Track({ source, target, getTrackProps }) { // your own track component
	return (
		<div
			style={{
				position: 'absolute',
				height: 2,
				zIndex: 1,
				marginTop: 35,
				backgroundColor: '#989898',
				borderRadius: 5,
				cursor: 'pointer',
				left: `${source.percent}%`,
				width: `${target.percent - source.percent}%`,
			}}
			{...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
		/>
	)
}

export default class RadarChart2 extends Component {

	state = {

	}
	
	round = (val) => {
		
		//round to 3 digits
		return Math.round(val*1000)/1000
		
	}
	
	onUpdate1 = axis1 => {
		const newVal = this.round(axis1[0])
		if(this.props.finalValuesRadar['precision'] !== newVal){
			this.props.callback('precision', newVal, true)
		}
	}
	
	onUpdate2 = axis2 => {
		const newVal = this.round(axis2[0])
		if(this.props.finalValuesRadar['recall'] !== newVal){
			this.props.callback('recall', newVal, true)
		}
	}
	
	onUpdate3 = axis3 => {
		const newVal = this.round(axis3[0])
		if(this.props.finalValuesRadar['fpr'] !== newVal){
			this.props.callback('fpr', newVal, true)
		}
	}
	
	
	render() {
		
		const { finalValuesRadar, displayValues, } = this.props
		
		const slider1 = 
			<Slider className='slider axis1Slider'
				domain={[0, 1]}
				step={0.001}
				mode={2}
				values={[finalValuesRadar['precision']]}
				onUpdate={this.onUpdate1}
			>
				<Rail>
					{({ getRailProps }) => (  // adding the rail props sets up events on the rail
						<div className='sliderRail slider1Rail' {...getRailProps()} /> 
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
			
		const slider2 = 
			<Slider className='slider axis2Slider'
				reversed
				domain={[0, 1]}
				step={0.001}
				mode={2}
				values={[finalValuesRadar['recall']]}
				onUpdate={this.onUpdate2}
			>
				<Rail>
					{({ getRailProps }) => (  // adding the rail props sets up events on the rail
						<div className='sliderRail slider2Rail' {...getRailProps()} /> 
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
		
		const slider3 = 
			<Slider className='slider axis3Slider'
				vertical
				reversed
				domain={[0, 1]}
				step={0.001}
				mode={2}
				values={[finalValuesRadar['fpr']]}
				onUpdate={this.onUpdate3}
			>
				<Rail>
					{({ getRailProps }) => (  // adding the rail props sets up events on the rail
						<div className='sliderRail slider3Rail' {...getRailProps()} /> 
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
			<div id='customRadar'>
				<div id='axis1'>
					{slider1}
				</div>
				<div id='axis2'>
					{slider2}
				</div>
				<div id='axis3'>
					{slider3}	
				</div>
				<svg width='500' height='500' id='customRadarSvg'>
					<circle cx='250' cy='250' r='40' className='radarCircle'/>
					<circle cx='250' cy='250' r='80' className='radarCircle'/>
					<circle cx='250' cy='250' r='120' className='radarCircle'/>
					<circle cx='250' cy='250' r='160' className='radarCircle'/>
					<circle cx='250' cy='250' r='200' className='radarCircle'/>
					<text className='svgText' x='415' y='380'>Precision</text>
					<text className='svgTextSmaller' x='415' y='400'>{displayValues['precision']}</text>					
					<text className='svgText' x='25' y='380'>Recall</text>
					<text className='svgTextSmaller' x='25' y='400'>{displayValues['recall']}</text>
					<text className='svgText' x='175' y='20'>False positive rate {this.state.axis3}</text>
					<text className='svgTextSmaller' x='232' y='40'>{displayValues['fpr']}</text>					
				</svg>
				{JSON.stringify(this.state)}
			</div>
		)
	}
}