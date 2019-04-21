import React, { Component } from 'react';
import { 
	Form, Input, 
	} from 'semantic-ui-react';

import './styling/MetricsShow.css';

//with threshold
const firstColumn = ['recall', 'precision', 'filter_rate', 'fpr', 'f1', 'threshold']
const secondColumn = ['!recall', '!precision', 'match_rate', 'accuracy', '!f1']

//without threshold
const firstColumnNoT = ['recall', 'precision', 'filter_rate', 'fpr', 'f1']
const secondColumnNoT = ['!recall', '!precision', 'match_rate', 'accuracy', '!f1']

export default class MetricsGetRequest extends Component {

	state = {
	}
	
	render() {
		const { finalValues, styling, numberOfColumns,
				thresholdWithout,
		} = this.props
		
		let finalValuesSorted = {
			'recall': finalValues['recall'],
			'!recall': finalValues['!recall'],
			'precision': finalValues['precision'],
			'!precision': finalValues['!precision'],
			'filter_rate': finalValues['filter_rate'],
			'match_rate': finalValues['match_rate'],
			'fpr': finalValues['fpr'],
			'accuracy': finalValues['accuracy'],
			'f1': finalValues['f1'],
			'!f1': finalValues['!f1']
		}
		
		//listing the metrics in 1 column
		let output = []
		if (numberOfColumns === 1){
			Object.keys(finalValuesSorted).forEach((key) => {
				output.push(
					<Form.Field>
						<Input className={styling} label={key} value={finalValues[key] ? finalValues[key] : "null"} />
					</Form.Field>
				)
			})
		}
		
		//listing the metrics in 2 columns
		let firstOutput = []
		let secondOutput = []
				
		if (numberOfColumns === 2){
			
			let firstColumnOutput = []
			let secondColumnOutput = []
			
			//check if we are to display the threshold or not
			if (thresholdWithout) {
				firstColumnOutput = firstColumnNoT
				secondColumnOutput = secondColumnNoT
			} else {
				firstColumnOutput = firstColumn
				secondColumnOutput = secondColumn
			}
			
			Object.keys(finalValuesSorted).forEach((key) => {
				
				//metric is to be shown in the first Column
				if (firstColumnOutput.indexOf(key) !== -1){
					firstOutput.push(
						<Form.Field>
							<Input className={styling} label={key} value={finalValues[key] ? finalValues[key] : "null"} />
						</Form.Field>
					)
				}
				else if (secondColumnOutput.indexOf(key) !== -1){
					secondOutput.push(
						<Form.Field>
							<Input className={styling} label={key} value={finalValues[key] ? finalValues[key] : "null"} />
						</Form.Field>
					)
				}
			})
		}
		
		return (
			<div id='MetricsShowDiv'>
				{finalValues ?
					(numberOfColumns === 1 ? 
						(<Form className='MetricLabels'>
							{output}
						</Form>) :
						
					numberOfColumns === 2 ?
						<div id='multipleColumns'>
							<Form id='MetricLabelsLeft'>
									{firstOutput}
							</Form>
							<Form id='MetricLabelsRight'>
									{secondOutput}
							</Form>
						</div> : ''
					) : ''
				}
			</div>
		)
	}
}