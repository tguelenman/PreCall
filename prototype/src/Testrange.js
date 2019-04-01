import React from 'react';
import './styling/Testrange.css'

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

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

function Track({ source, target, getTrackProps }) { // your own track component
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
    />
  )
}

const axis1 = 51

export default class Testrange extends React.Component {

	state = {
		axis1: axis1,
		axis2: 13,
		axis3: 99,
	}

	componentWillReceiveProps = (nextProps) => {

	}
	
	componentDidMount = () => {
		
	}
	
	onUpdate1 = axis1 => {
		if(this.state.axis1[0] !== axis1[0]){
			this.setState({ axis1 })
		}
	}
	
	onUpdate2 = axis2 => {
		if(this.state.axis2[0] !== axis2[0]){
			this.setState({ axis2 })
		}
	}
	
	onUpdate3 = axis3 => {
		if(this.state.axis3[0] !== axis3[0]){
			this.setState({ axis3 })
		}
	}
	
	render() {
		const { axis1, axis2, axis3, update} = this.state

		const sliderStyle = {  // Give the slider some width
			position: 'relative',
			width: '100%',
			height: 80,
			border: '1px solid steelblue',
		}

		const railStyle = { 
			position: 'absolute',
			width: '100%',
			height: 10,
			marginTop: 35,
			borderRadius: 5,
			backgroundColor: '#8B9CB6',
		}
		
		const slider1 = 
			<Slider
				rootStyle={sliderStyle}
				domain={[0, 100]}
				step={1}
				mode={2}
				values={[axis1]}
				onUpdate={this.onUpdate1}
			>
				<Rail>
					{({ getRailProps }) => (  // adding the rail props sets up events on the rail
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
			
		const slider2 = 
			<Slider
				rootStyle={sliderStyle}
				domain={[0, 100]}
				step={1}
				mode={2}
				values={[axis2]}
				onUpdate={this.onUpdate2}
			>
				<Rail>
					{({ getRailProps }) => (  // adding the rail props sets up events on the rail
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
		
		const slider3 = 
			<Slider
				rootStyle={sliderStyle}
				domain={[0, 100]}
				step={1}
				mode={2}
				values={[axis3]}
				onUpdate={this.onUpdate3}
			>
				<Rail>
					{({ getRailProps }) => (  // adding the rail props sets up events on the rail
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
			<div id='customRadar'>
			{slider1}
			{slider2}
			{slider3}
				{JSON.stringify(this.state)}
			</div>
		)
	}
}



