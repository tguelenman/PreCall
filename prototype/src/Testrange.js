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
         {axis: "dexterity", value: 4, order:3},  
         {axis: "luck", value: 10, order:4},
         {axis: "azole", value: 10, order:5}
        ];


		return (
			<div>
				<script src="http://d3js.org/d3.v3.min.js"></script>
				<script src="radar-library/radar-chart.js"></script>

				<RadarChart name={'#chart'} data={d}/>
			</div>
		)
	}
}



