import React, { Component } from 'react';
import Radar from 'react-d3-radar';

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
		console.log("finalValues: ",finalValues)
		return (
			<div id='VisualisationRadar'>
				{finalValues ? 
					<Radar id='RadarChart'
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
								{key: 'recall', label: 'Recall'},
								{key: 'precision', label: 'Precision'},
								{key: 'filter_rate', label: 'Filter_rate'},
							],
							sets: [
								{
									key: 'get',
									label: 'GET Result',
									values: {
										//get these values from state
										recall: finalValues['recall'],
										precision: finalValues['precision'],
										filter_rate: finalValues['filter_rate'],
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