import React from 'react';
import './styling/Testrange.css'

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
//import * as d3 from 'd3'

export function Handle({ // your handle component
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

export default class Testrange extends React.Component {

	state = {
		axis1: 0.3,
		axis2: 0.6,
		axis3: 0.9,
	}

	componentWillReceiveProps = (nextProps) => {

	}
	
	componentDidMount = () => {
		
		//TODO ? append circles here
		/*
		var radar = document.getElementById('customRadar')
		var svg = radar.append('svg')
			.attr('width', 500)
			.attr('height', 500)
			
		console.log(svg)
		//svg.id = 'customRadarSvg'
		
		//svg.id = 'customSvg'
		//.attr('width', '500px').attr('height', '500px').append('g') //.attr('viewBox','-20 -50 450 520').append("g")
		
		
		//value of width&height, num of circles, level factor
		const wh = 500
		const levels = 5
		const lvlfac = (wh / levels / 2)
		
		
		for(var i = 0; i < levels; i++){

	
			svg.append('svg:circle')
				.attr('cx', wh/2)
				.attr('cy', wh/2)
				.attr('r', i*lvlfac)
				.attr('class', 'radarBackgroundCircle')
				.style('fill','transparent')
				//.style('fill','grey').style('fill-opacity', 0.1)
		}*/
	}
	
	onUpdate1 = axis1 => {
		if(this.state.axis1[0] !== axis1[0]){
			this.setState({ axis1: axis1[0] })
		}
	}
	
	onUpdate2 = axis2 => {
		if(this.state.axis2[0] !== axis2[0]){
			this.setState({ axis2: axis2[0] })
		}
	}
	
	onUpdate3 = axis3 => {
		if(this.state.axis3[0] !== axis3[0]){
			this.setState({ axis3: axis3[0] })
		}
	}
	
	render() {
		const { axis1, axis2, axis3, update} = this.state
		
		const slider1 = 
			<Slider className='slider axis1Slider'
				domain={[0, 1]}
				step={0.001}
				mode={2}
				values={[axis1]}
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
				values={[axis2]}
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
				values={[axis3]}
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
					<text className='svgText' x='415' y='380'>Precision {this.state.axis1}</text>
					<text className='svgText' x='25' y='380'>Recall {this.state.axis2}</text>
					<text className='svgText' x='175' y='35'>False positive rate {this.state.axis3}</text>
				</svg>
				{JSON.stringify(this.state)}
			</div>
		)
	}
}



