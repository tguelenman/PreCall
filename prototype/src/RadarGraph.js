import React, { Component } from 'react'
//old radar
//import Radar from 'react-d3-radar'
import RadarChart from './radar-library/radar-chart.js'

import './styling/RadarGraph.css'

export default class RadarGraph extends Component {
	
	state = {
		finalValues: this.props.finalValues,
	}
	
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			finalValues: nextProps.finalValues,
		}
		//old radar
		//, () => { this.adjustRadar() })
		)
	}
	
	componentDidMount = () => {
		
		//old radar
		//this.adjustRadar()
	}
	
	//old radar
	/*adjustRadar = () => {
	
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
	}*/

	render () {
		const {finalValues,} = this.state
		
		var data = [
			{axis: 'false positive rate', value: finalValues['fpr'], order:0}, 
			{axis: 'recall', value: finalValues['recall'], order:1}, 
			{axis: 'precision', value: finalValues['precision'], order:2},  
        ]
		
		return (
			<div id='visualisationRadar'>
				{finalValues ? 
					<RadarChart chart={'#chart'} data={data}/>

				: ''}
			</div>
		)
		/*return (
			<div id='visualisationRadar'>
				{finalValues ? 
					<Radar
						width={500}
						height={500}
						padding={70}
						domainMax={1}
						highlighted={null}
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
		)*/
		
	}
}