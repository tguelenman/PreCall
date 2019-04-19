import React, { Component } from 'react'
import { Button, Input, Select } from 'semantic-ui-react'
import './styling/ConfusionFilter.css'

const options = [
	{ key: 'tn', text: 'TN', value: 'TN' },
	{ key: 'fp', text: 'FP', value: 'FP' },
	{ key: 'tp', text: 'TP', value: 'TP' },
	{ key: 'fn', text: 'FN', value: 'FN' },
]

export default class ConfusionFilter extends Component {
	
	state = {
		confOptParam: 'TN',
	}

	round = (a) => {
		return Number(Math.round(a+'e'+2)+'e-'+2)
	}
	
	calculateConfusion = () => {
		
		const data = this.props.data
		
		//arrays that will be saved to the state (once!)
		var allTPs = []
		var allFPs = []
		var allTNs = []
		var allFNs = []
		
		//thresholds[i] will represent the threshold to obtain allTPs[i], allFPs[i] etc.
		var thresholds = []
		
		for (var i=0; i < data.length; i++){

			//save threshold
			thresholds.push(data[i].threshold)

			//necessary constants
			const filters = this.round(100*data[i]['filter_rate'])
			const matches = this.round(100*data[i]['match_rate'])
					
			//calculate confusion values					
			const tp = this.round(matches*data[i]['precision'])
			const fp = this.round(matches-tp)
			const tn = this.round(filters*data[i]['!precision'])
			const fn = this.round(filters-tn)
			
			//fill arrays
			allTPs.push(tp)
			allFPs.push(fp)
			allTNs.push(tn)
			allFNs.push(fn)
		}
		
		this.setState({
			thresholds: thresholds,
			'allTPs': allTPs,
			'allFPs': allFPs,
			'allTNs': allTNs,
			'allFNs': allFNs,
		})
	}
	
	setConfusion = (confusionValue, wantedValue) => {
		
		//confusionValue = 'TP', 'FP', 'TN', 'FN'
		//wantedValue = 'max', 'min', int
		const thresholds = this.state.thresholds
		const currentThreshold = this.props.currentThreshold
		
		//get the full array of TPs, FPs, TNs or FNs from state, depending on what Button has been clicked
		const fullArray = eval('this.state.' + 'all' + confusionValue +'s')
		
		var wantedIndex
		var newThreshold
		
		if (wantedValue === 'max'){
			
			//get the maximum's index
			wantedIndex = fullArray.indexOf(this.arrayMax(fullArray))
						
		} else if (wantedValue === 'min'){
			
			//get the minimum's index
			wantedIndex = fullArray.indexOf(this.arrayMin(fullArray))
						
		} else if (this.isNumber(wantedValue)) {
			
			//user passed value in %
			var closest = Infinity
			wantedIndex = 0
			
			//find index of closest existing value to the one specified by user
			for (var i = 0; i < fullArray.length; i++){
				
				if (Math.abs(wantedValue - fullArray[i]) < Math.abs(wantedValue - closest) ){
					
					closest = fullArray[i]
					wantedIndex = i
					
				}
			}
			
		} else {
			
			return 
			
		}
		
		return thresholds[wantedIndex]
		
	}
	
	pmConfusion = (confusionValue, plusMinus) => {
		
		//confusionValue = 'TP', 'FP', 'TN', 'FN'
		//plusMinus = '+', '-'
		
		//calculate current % of confusion value...
		const currentThreshold = this.props.currentThreshold
		const wantedIndex = this.state.thresholds.indexOf(currentThreshold)
		const fullArray = eval('this.state.' + 'all' + confusionValue +'s')
		let currentConfusion = fullArray[wantedIndex]
		const min = this.arrayMin(fullArray)
		const max = this.arrayMax(fullArray)
		
		var newThreshold = currentThreshold
		
		//two extra conditions needed not to get stuck in an infinite loop when max or min has been reached
		while(newThreshold === currentThreshold && currentConfusion >= min && currentConfusion <= max){
			//...and either add 1 to it
			if(plusMinus === '+'){
				
				currentConfusion = currentConfusion+0.1
				newThreshold = this.setConfusion(confusionValue,currentConfusion)
				
			} 
			
			//...or subtract 1 from it
			else if (plusMinus === '-'){
				
				currentConfusion = currentConfusion-0.1
				newThreshold = this.setConfusion(confusionValue,currentConfusion)	
				
			}
		}
		
		//stop the hold effect on - / + buttons
		if(currentConfusion >= max || currentConfusion <= min){
			clearInterval(this.buttonPressTimer)
		}
		
		//new threshold is determined, pass it
		this.props.callback('threshold',newThreshold)

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
	
	isNumber = (n) => {
		return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	startTimer = (pm) => {
	
		this.buttonPressTimer = setInterval(() => this.pmConfusion(this.props.confusionValue,pm), 75)
		
	}
	
	render () {
		
		const {confOptParam, confOptValue} = this.state
		
		if (!this.state.allTNs && !this.state.allFPs && !this.state.allTPs && !this.state.allFNs){
			this.calculateConfusion()	
		}		
		
		//#50 part 2

		const fullArray = eval('this.state.' + 'all' + this.props.confusionValue +'s')
		let currentConfusion, min, max
		
		//check if max or min has been reached to grey out corresponding button
		if(fullArray){
			
			min = this.arrayMin(fullArray)
			max = this.arrayMax(fullArray)
			const currentThreshold = this.props.currentThreshold
			const wantedIndex = this.state.thresholds.indexOf(currentThreshold)
			currentConfusion = fullArray[wantedIndex]

		}
		
		return (

			<div className='pmButtons'>
				{/*<Button color='blue' onClick={() => this.setConfusion('TN','max')}>Maximize TNs</Button>*/}
				{ this.props.buttonType === '-' ?
					(currentConfusion > min ?
						<Button
							className='pmButton pmButton1'
							onMouseDown={() => {
								this.startTimer('-')
								this.pmConfusion(this.props.confusionValue,'-')
							}}
							onMouseUp={() => clearInterval(this.buttonPressTimer)}>
							<p>-</p>
						</Button>
						: 
						<Button
							className='pmButton pmButton1 greyButton'
							onMouseUp={() => clearInterval(this.buttonPressTimer)}>
							<p>-</p>
						</Button>
					)
					:
					(currentConfusion < max ?
						<Button
							className='pmButton pmButton2'
							onMouseDown={() => {
								this.startTimer('+')
								this.pmConfusion(this.props.confusionValue,'+')
							}}
							onMouseUp={() => clearInterval(this.buttonPressTimer)}>
							<p>+</p>
						</Button>
						: 
						<Button
							className='pmButton pmButton2 greyButton'
							onMouseUp={() => clearInterval(this.buttonPressTimer)}>
							<p>+</p>
						</Button>
					)
				}
			</div>
			
		)
	}
}