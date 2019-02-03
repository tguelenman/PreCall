import React, { Component } from 'react'
import './styling/Testrange.css'


export default class Testrange extends Component {
	state = {
		metricValues: this.props.metricValues
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ metricsValues: nextProps.metricValues })
	}
	
	render() {

		const metricValues = this.state.metricValues
		
		var tNContent = []
		var fNContent = []
		var fPContent = []
		var tPContent = []
		
		if(metricValues) {
				
			//Calculate how many TN/FN/TP/FP we have
			const filters = 100*metricValues['filter_rate']
			const matches = 100*metricValues['match_rate']
			
			const tn = Math.round(filters*metricValues['!precision'])
			const fn = 100-tn
			const tp = Math.round(matches*metricValues['precision'])
			const fp = 100-tp

			console.log("filterRate: ",metricValues['filter_rate'])
			console.log("matchRate: ",metricValues['match_rate'])
			console.log("tn: ",tn)
			console.log("fn: ",fn)
			console.log("fp: ",fp)
			console.log("tp: ",tp)
			
		
			
			/***Visualise up to 100 bubbles for TN/FN/FP/TP***/
			//fill true-negatives-content in the right order
			/*for(var i=tn; i>=0; i--){
				tNContent.push(<div className='bubble'>{i}</div>)
			}*/
			
			/*var ordering = tn

			for(var i=0; i<tn; i++){
				var tnStyling = {
					order: ordering
				}
				tNContent.push(<div className='bubble' style={tnStyling}>{i}</div>)
				ordering--
			}*/
			
			/*for(var i=0; i<tn; i=i+10){
				for(var j=9; j>=0; j--){
					var tnStyling = {
						order: i+j
					}
					tNContent.push(<div className='bubble' style={tnStyling}>{i+j}</div>)
				}
			}*/
			var down = {
				marginBottom: 0,
			}
			for(var i=0; i<tn; i=i+10){
				for(var j=9; j>=0; j--){
					if(i+j >= tn){
						continue
					}
					tNContent.push(<div className='bubble' style={down}>{i+j}</div>)
				}
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
			/***End of Visualisation***/
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