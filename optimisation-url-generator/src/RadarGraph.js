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
		})
	}
	
	componentDidMount = () => {
		//TODO ausprobieren ganz neues element an g ranhängen und altes löschen
		
		/*var radar = document.getElementById('visualisationRadar')
		var svg = radar.childNodes[0]
		var gs = svg.childNodes[0].childNodes[1].childNodes
		
		//0: path, 1, 2 and 3: circle
		var circles = gs[4].childNodes
		
		for (var i=1; i<=4; i++){
			console.log("circle: ",circles[i])
			circles[i].setAttribute('r', '20')
		}
		
		console.log(radar)
		console.log(circles)*/
		var allCircles = document.getElementsByTagName("circle")
		for (let circle of allCircles) {
			if (circle['attributes']['r']['value'] == 3) {
				circle.setAttribute('r', '9')
				circle.setAttribute('stroke-width', '3px')
				circle.setAttribute('stroke-opacity', '1')
				circle.setAttribute('stroke', 'black')
				circle.setAttribute('fill', 'white')
			}
		}
		console.log(allCircles)
	}

	render () {
		const {finalValues,} = this.state
		console.log("fpr: ",finalValues["fpr"])
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
								{key: 'fpr', label: 'false positive rate'},
								{key: 'precision', label: 'precision'},
								{key: 'recall', label: 'recall'},
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