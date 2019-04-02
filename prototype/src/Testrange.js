import React from 'react';
import './styling/Testrange.css'

import RadarChart2 from './RadarChart2.js'



export default class Testrange extends React.Component {

	state = {
		
	}

	componentWillReceiveProps = (nextProps) => {

	}
	
	componentDidMount = () => {
		
	}
	

	
	render() {

		const finalValues = {
			'fpr': 0.1,
			'recall': 0.4,
			'precision': 0.85,
		}
		
		return (
			<div>
				<RadarChart2 finalValues={finalValues}/>
			</div>
		)
	}
}



