import React, { Component } from 'react'
import './styling/ConfusionDistribution.css'


export default class ConfusionDistribution extends Component {
	state = {
		metricValues: this.props.metricValues
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ metricValues: nextProps.metricValues })
	}
	
	render() {

		const metricValues = this.state.metricValues
		
		var tNContent = []
		var fNContent = []
		var fPContent = []
		var tPContent = []
		
		if(metricValues) {
				
			//Calculate how many TN/FN/TP/FP we have

			
			const filters = Math.round(100*metricValues['filter_rate'])
			const matches = Math.round(100*metricValues['match_rate'])
			

			
			const tn = Math.round(filters*metricValues['!precision'])
			const fn = filters-tn
			const tp = Math.round(matches*metricValues['precision'])
			const fp = matches-tp

			/*
			console.log("filterRate: ",metricValues['filter_rate'])
			console.log("matchRate: ",metricValues['match_rate'])
			console.log("filters: ",filters)
			console.log("matches: ",matches)
			console.log("tn: ",tn)
			console.log("fn: ",fn)
			console.log("fp: ",fp)
			console.log("tp: ",tp)
			*/
			
			/***Visualise up to 100 bubbles for TN/FN/FP/TP***/
			//fill true-negatives-content in the right order
			for(var colTN=0; colTN<tn; colTN=colTN+10){
				for(var rowTN=9; rowTN>=0; rowTN--){
					if(colTN+rowTN >= tn){
						continue
					}
					//{colTN+rowTN}
					tNContent.push(<div className='bubble tn'></div>)
				}
			}
			
			//fill false-negatives-content in the right order
			for(var colFN=0; colFN<=fn; colFN=colFN+10){
				for(var rowFN=9; rowFN>=0; rowFN--){
					if(colFN+rowFN >= fn) {
						continue
					}
					//{colFN+rowFN}
					fNContent.push(<div className='bubble fn'></div>)
				}
			}
			
			//fill false-positives-content in the right order
			for(var colFP=0; colFP<fp; colFP=colFP+10){
				for(var rowFP=0; rowFP<10; rowFP++){
					if(colFP+rowFP > fp || colFP+rowFP < 0){
						continue;
					}
					//{colFP+rowFP}
					fPContent.push(<div className='bubble fp'></div>)
				}
			}
			
			//fill true-positives-content in the right order
			for(var itp=0; itp <tp; itp++){
				//{itp}
				tPContent.push(<div className='bubble tp'></div>)
			}
			/***End of Visualisation***/
		}
		
		return (
			<div id='outerDistributionDiv'>
				<div id='predictedNegatives' className='predicted'>
				
					<div id='trueNegatives' className='actualNegatives total tfnp'>
						<div id='trueNegativesContent' className='content'>
							{tNContent}
						</div>
					</div>
					<div id='falseNegatives' className='actualPositives total tfnp'>
						<div id='falseNegativesContent' className='content'>
							{fNContent}
						</div>
					</div>
					
				</div>
				<div id='predictedPositives' className='predicted'>
				
					<div id='falsePositives' className='actualNegatives total tfnp'>
						<div id='falsePositivesContent' className='content'>
							{fPContent}
						</div>
					</div>
					<div id='truePositives' className='actualPositives total tfnp'>
						<div id='truePositivesContent' className='content'>
							{tPContent}
						</div>
					</div>
					
				</div>
			
			</div>
		)
	}
}