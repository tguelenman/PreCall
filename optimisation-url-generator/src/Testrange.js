import React, { Component } from 'react'
import './styling/Testrange.css'


export default class Testrange extends Component {
	state = {

	}

	render() {

		var tNContent = []
		var fNContent = []
		var fPContent = []
		var tPContent = []

		//fill true-negatives-content in the right order
		for(var i=99; i>=0; i--){
			tNContent.push(<div className='bubble'>{i}</div>)
		}
		
		//fill false-negatives-content in the right order
		for(var col=0; col<=99; col=col+10){
			for(var row=9; row>=0; row--){
				fNContent.push(<div className='bubble'>{col+row}</div>)
			}
		}
		
		//fill false-positives-content in the right order
		for(var row=90; row>=0; row=row-10){
			for(var col=0; col<10; col++){
				fPContent.push(<div className='bubble'>{row+col}</div>)
			}
		}
		
		//fill true-positives-content in the right order
		for(var i=0; i <=99; i++){
			tPContent.push(<div className='bubble'>{i}</div>)
		}
		
		return (
			<div id='outerDistributionDiv'>
				<div id='predictedNegatives' className='outerTotal'>
				
					<div id='trueNegatives' className='actualNegatives total'>
						<div id='trueNegativesContent'>
							{tNContent}
						</div>
					</div>
					<div id='falseNegatives' className='actualPositives total'>
						<div id='falseNegativesContent'>
							{fNContent}
						</div>
					</div>
					
				</div>
				<div id='predictedPositives' className='outerTotal'>
				
					<div id='falsePositives' className='actualNegatives total'>
						<div id='falsePositivesContent'>
							{fPContent}
						</div>
					</div>
					<div id='truePositives' className='actualPositives total'>
						<div id='truePositivesContent'>
							{tPContent}
						</div>
					</div>
					
				</div>
			
			</div>
		)
	}
}