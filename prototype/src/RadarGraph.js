import React, { Component } from 'react'
import Radar from 'react-d3-radar'

import './styling/RadarGraph.css'

export default class RadarGraph extends Component {
	
	state = {
		finalValues: this.props.finalValues,
	}
	
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			finalValues: nextProps.finalValues,
		}, () => { this.adjustRadar() })
	}
	
	componentDidMount = () => {
		
		this.adjustRadar()
	}
	
	adjustRadar = () => {
	
		//adjust Radar Chart handles
		var allCircles = document.getElementsByTagName('circle')
		
		for (let circle of allCircles) {
			
			if (circle['attributes']['r']['value'] === '3') {
				circle.setAttribute('class', 'connectTheseCircles')
			}
		}

		//draw straight lines instead of curves in the radar chart
		const path = document.getElementsByTagName('path')[0]
		const threeCircles = document.getElementsByClassName('connectTheseCircles')
		const firstCircleCoords = this.coordinates(threeCircles[0])
		const secondCircleCoords = this.coordinates(threeCircles[1])
		const thirdCircleCoords = this.coordinates(threeCircles[2])
		const newD = 'M'+firstCircleCoords+','+secondCircleCoords+','+thirdCircleCoords+','+firstCircleCoords
		
		path.setAttribute('d',newD)	
	}
	
	coordinates = (circle) => {
		
		return circle['cx']['baseVal']['valueAsString']+','+circle['cy']['baseVal']['valueAsString']
	}

	render () {
		const {finalValues,} = this.state

		return (
			<div id='visualisationRadar'>
				{finalValues ? 
					<Radar
						width={500}
						height={500}
						padding={70}
						domainMax={1}
						highlighted={null}
						/*onHover={(point) => {
						if (point) {
							console.log('hovered over a data point');
						} else {
							console.log('not over anything');
							}
						}}*/
						data={{
							variables: [
								{key: 'fpr', label: 'false positive rate '+finalValues['fpr']},
								{key: 'precision', label: 'precision '+finalValues['precision']},
								{key: 'recall', label: 'recall '+finalValues['recall']},
							],
							sets: [
								{
									key: 'get',
									label: 'GET Result',
									values: {
										//get these values from state
										fpr: finalValues['fpr'],
										precision: finalValues['precision'],
										recall: finalValues['recall'],
									},
								},
							],
						}}
					/> : ''
				}
			</div>
		)
	}
}