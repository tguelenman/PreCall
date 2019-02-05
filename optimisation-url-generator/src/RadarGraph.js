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

	render () {
		const {finalValues,} = this.state
		console.log("fpr: ",finalValues["fpr"])
		return (
			<div id='visualisationRadar'>
				{finalValues ? 
					<Radar
						width={400}
						height={400}
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