import React, { Component } from 'react'
import './styling/ConfusionDistribution.css'


export default class ConfusionDistribution extends Component {
	state = {
		metricValues: this.props.metricValues
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ metricValues: nextProps.metricValues })
	}
	
	round = (a) => {
		return Number(Math.round(a+'e'+2)+'e-'+2)
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
				
			//Calculate TN/FN/TP/FP	in %	
			const filters = this.round(100*metricValues['filter_rate'])
			const matches = this.round(100*metricValues['match_rate'])
									
			tp = this.round(matches*metricValues['precision'])
			fp = this.round(matches-tp)
			tn = this.round(filters*metricValues['!precision'])
			fn = this.round(filters-tn)
			
			/***fill containers with bubbles and triangles***/
			//TPs
			//fill with colored shapes
			for (var index = 0; index < tp; index++){
				tPContent.push(<div className='triangle' key={'tp'+ index.toString()}><div className='tp innerTriangle'/></div>)
			}
			//fill up the rest with empty shapes			
			for (index; index < 100; index++){
				tPContent.push(							
					<div className='triangle'>
						<div className='innerTriangle legendTriangle'/>
					</div>
				)
			}

			//FNs
			//fill with colored shapes
			for (index = 0; index < fn; index++){
				fNContent.push(<div className='triangle' key={'fn'+ index.toString()}><div className='fn innerTriangle'/></div>)
			}
			
			//fill up the rest with empty shapes
			for (index; index < 100; index++){
				fNContent.push(							
					<div className='triangle'>
						<div className='innerTriangle legendTriangle'/>
					</div>
				)
			}
			
			//TNs
			//fill with colored shapes
			for (index = 0; index < tn; index++){
				tNContent.push(<div className='bubble tn' key={'tn'+ index.toString()}></div>)
			}
			
			//fill up the rest with empty shapes
			for (index; index < 100; index++){
				tNContent.push(<div className='bubble'/>)
			}

			//FPs
			//fill with colored shapes			
			for (index = 0; index < fp; index++){
				fPContent.push(<div className='bubble fp' key={'fp'+ index.toString()}></div>)
			}
			
			//fill up the rest with empty shapes
			for (index; index < 100; index++){
				fPContent.push(<div className='bubble'/>)
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