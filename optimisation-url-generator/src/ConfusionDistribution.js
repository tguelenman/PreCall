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
				tPContent.push(<div className='triangle' key={'tp'+ index.toString()}><div className='tp innerTriangle'/></div>)
			}
			
			for (index = 0; index < fn; index++){
				fNContent.push(<div className='triangle' key={'fn'+ index.toString()}><div className='fn innerTriangle'/></div>)
			}
			
			for (index = 0; index < tn; index++){
				tNContent.push(<div className='bubble tn' key={'tn'+ index.toString()}></div>)
			}
			
			for (index = 0; index < fp; index++){
				fPContent.push(<div className='bubble fp' key={'fp'+ index.toString()}></div>)
			}			
		}
		
		
		return (
			<div id='DistributionDiv'>
				<div className='outerBubbleContainer'>
					<div id='trueNegatives' className='bubbleContainer'>
						{tNContent}
						<div className='bubbleLabeling'>
							<p className='bubbleP bubbleValueP'>{tn}%</p>
							<p className='bubbleP'>correctly</p>
							<p className='bubbleP'>detected as</p>
							<p className='bubbleP'>good</p>
						</div>
					</div>
				</div>
				<div className='outerBubbleContainer'>
					<div id='falsePositives' className='bubbleContainer'>
						{fPContent}
						<div className='bubbleLabeling'>
							<p className='bubbleP bubbleValueP'>{fp}%</p>
							<p className='bubbleP'>wrongly</p>
							<p className='bubbleP'>detected as</p>
							<p className='bubbleP'>damaging</p>
						</div>
					</div>
				</div>
				<div className='outerBubbleContainer'>
					<div id='truePositives' className='bubbleContainer'>
						{tPContent}
						<div className='bubbleLabeling'>
							<p className='bubbleP bubbleValueP'>{tp}%</p>
							<p className='bubbleP'>correctly</p>
							<p className='bubbleP'>detected as</p>
							<p className='bubbleP'>damaging</p>
						</div>
					</div>
				</div>
				<div className='outerBubbleContainer'>
					<div id='falseNegatives' className='bubbleContainer'>
						{fNContent}
						<div className='bubbleLabeling'>
							<p className='bubbleP bubbleValueP'>{fn}%</p>
							<p className='bubbleP'>wrongly</p>
							<p className='bubbleP'>detected as</p>
							<p className='bubbleP'>good</p>
						</div>
					</div>	
				</div>
			</div>
		)
	}
}