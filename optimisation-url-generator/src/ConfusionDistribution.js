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
						
		var tPContent = []
		var fNContent = []
		var tNContent = []
		var fPContent = []

		var tp
		var fp
		var tn
		var fn
		
		if(metricValues) {
				
			//Calculate how many TN/FN/TP/FP we have		
			const filters = Math.round(100*metricValues['filter_rate'])
			const matches = Math.round(100*metricValues['match_rate'])
			
			tp = Math.round(matches*metricValues['precision'])
			fp = matches-tp
			tn = Math.round(filters*metricValues['!precision'])
			fn = filters-tn

			for (var index = 0; index < tp; index++){
				console.log("tp: o")
				tPContent.push(<div className='pentagon tp' key={'tp'+ index.toString()}></div>)
			}
			
			for (index = 0; index < fn; index++){
				console.log("fn: o")
				fNContent.push(<div className='pentagon fn' key={'fp'+ index.toString()}></div>)
			}
			
			for (index = 0; index < tn; index++){
				console.log("tn: o")
				tNContent.push(<div className='bubble tn' key={'tn'+ index.toString()}></div>)
			}
			
			for (index = 0; index < fp; index++){
				console.log("fp: o")
				fPContent.push(<div className='bubble fp' key={'fp'+ index.toString()}></div>)
			}
			
			
			/*
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
			
			*/
			console.log("tp, fn, tn, fp: ",tp, fn, tn, fp)
			
		}
		
		
		return (
			<div id='DistributionDiv'>

				<div id='trueNegatives' className='bubbleContainer'>
					{tNContent}
					<div className='bubbleLabeling'>
						<p className='bubbleP'>{tn}%</p>
						<p className='bubbleP'>correctly</p>
						<p className='bubbleP'>detected as</p>
						<p className='bubbleP'>good</p>
					</div>
				</div>
				<div id='falsePositives' className='bubbleContainer'>
					{fPContent}
					<div className='bubbleLabeling'>
						<p className='bubbleP'>{fp}%</p>
						<p className='bubbleP'>wrongly</p>
						<p className='bubbleP'>detected as</p>
						<p className='bubbleP'>damaging</p>
					</div>
				</div>
				<div id='truePositives' className='bubbleContainer'>
					{tPContent}
					<div className='bubbleLabeling'>
						<p className='bubbleP'>{tp}%</p>
						<p className='bubbleP'>correctly</p>
						<p className='bubbleP'>detected as</p>
						<p className='bubbleP'>damaging</p>
					</div>
				</div>
				<div id='falseNegatives' className='bubbleContainer'>
					{fNContent}
					<div className='bubbleLabeling'>
						<p className='bubbleP'>{fn}%</p>
						<p className='bubbleP'>wrongly</p>
						<p className='bubbleP'>detected as</p>
						<p className='bubbleP'>good</p>
					</div>
				</div>	
			</div>
		)
	}
}