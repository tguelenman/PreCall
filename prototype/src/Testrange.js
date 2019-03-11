import React from 'react';
import './styling/Testrange.css'

import RadarChart from './radar-library/radar-chart.js'

export default class Testrange extends React.Component {

	state = {

	}

	componentWillReceiveProps = (nextProps) => {

	}
	
	componentDidMount = () => {
		
	}
	
	

	render() {
		var d = [
         {axis: "strength", value: 13, order:0}, 
         {axis: "intelligence", value: 1, order:1}, 
         {axis: "charisma", value: 8, order:2},  
        ];


		return (
			<div>
				<RadarChart chart={'#chart'} data={d}/>
			</div>
		)
	}
}



