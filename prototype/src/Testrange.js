import React from 'react'
import './styling/Testrange.css'

import ThresholdBar2 from './ThresholdBar2'

export default class Testrange extends React.Component {

	state = {
		
	}

	componentWillReceiveProps = (nextProps) => {

	}
	
	componentDidMount = () => {
		
	}
	

	
	render() {

		return (
			<div>
				<ThresholdBar2 threshold={0.5}/>
			</div>
		)
	}
}



