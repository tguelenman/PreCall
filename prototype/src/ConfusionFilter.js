import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import './styling/ConfusionFilter.css'

export default class ConfusionFilter extends Component {
	
	state = {
	}

	calculateConfusion = () => {
		
		const data = this.props.data
		
		//arrays that will be saved to the state (once!)
		var allTPs = []
		var allFPs = []
		var allTNs = []
		var allFNs = []
		
		//TODO unnecessary?
		//thresholds[i] will represent the threshold to obtain allTPs[i], allFPs[i] etc.
		var thresholds = []
		
		for (var i=0; i < data.length; i++){
			
			//save threshold
			thresholds.push(data[i].threshold)

			//necessary constants
			const matches = data[i].match_rate
			const filters = data[i].filter_rate

			//calculate confusion values
			const tp = matches*data[i].precision
			const fp = matches-tp
			const tn = filters*data[i]['!precision']
			const fn = filters-tn
			
			//fill arrays
			allTPs.push(tp)
			allFPs.push(fp)
			allTNs.push(tn)
			allFNs.push(fn)
		}
		
		this.setState({
			'thresholds': thresholds,
			'allTPs': allTPs,
			'allFPs': allFPs,
			'allTNs': allTNs,
			'allFNs': allFNs,
		})
	}
	
	setConfusion = (sampleValue, wantedValue) => {
		
		//sampleValue = 'TP', 'FP', 'TN', 'FN'
		//wantedValue = 'max', 'min', int
		
		//get the full array of TPs, FPs, ... from state, depending on what Button has been clicked
		var fullArray = eval('this.state.' + 'all' + sampleValue +'s')
		
		var wantedIndex
		var newThreshold
		
		if (wantedValue === 'max'){
			
			//get the maximum and the associated threshold 
			wantedIndex = fullArray.indexOf(this.arrayMax(fullArray))
			newThreshold = this.state.thresholds[wantedIndex]
						
		} else if (wantedValue === 'min'){
			
			//get the minimum and the associated threshold 
			wantedIndex = fullArray.indexOf(this.arrayMin(fullArray))
			newThreshold = this.state.thresholds[wantedIndex]
						
		}
		
		this.props.setNewThreshold(newThreshold)
		
	}
	
	arrayMin = (arr) => {
		var len = arr.length, min = Infinity
			while (len--) {
				if (arr[len] < min) {
					min = arr[len]
				}
			}
		return min
	}
	
	arrayMax = (arr) => {
		var len = arr.length, max = -Infinity
			while (len--) {
				if (arr[len] > max) {
					max = arr[len]
				}
			}
		return max
	}
	
	
	render () {
		
		
		/*const filters = Math.round(100*metricValues['filter_rate'])
		const matches = Math.round(100*metricValues['match_rate'])
		
		tp = Math.round(matches*metricValues['precision'])
		fp = matches-tp
		tn = Math.round(filters*metricValues['!precision'])
		fn = filters-tn*/
		
		
		if(!this.state.allTPs){
			this.calculateConfusion()	
		}
		
		
		
		
		return (
			<div>
				<div>
					<Button color='blue' onClick={() => this.setConfusion('TN','max')}>Maximize TNs</Button>
					<Button color='red' onClick={() => this.setConfusion('FP','max')}>Maximize FPs</Button>
					<Button color='red' onClick={() => this.setConfusion('TP','max')}>Maximize TPs</Button>
					<Button color='blue' onClick={() => this.setConfusion('FN','max')}>Maximize FNs</Button>
				</div>
				<hr className='dividerClass'/>
				<div>
					<Button color='blue' onClick={() => this.setConfusion('TN','min')}>Minimize TNs</Button>
					<Button color='red' onClick={() => this.setConfusion('FP','min')}>Minimize FPs</Button>
					<Button color='red' onClick={() => this.setConfusion('TP','min')}>Minimize TPs</Button>
					<Button color='blue' onClick={() => this.setConfusion('FN','min')}>Minimize FNs</Button>
				</div>
			</div>
		)
	}
}