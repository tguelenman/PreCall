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
		metricValues: this.props.metricValues
	}
	
	componentWillReceiveProps  = (nextProps) => {
		this.setState({ metricValues: nextProps.metricValues })
	}
	
	render() {
		const { metricValues, } = this.state
		const styling = this.props.styling
		const numberOfColumns = this.props.numberOfColumns
		const thresholdWithout = this.props.thresholdWithout
		
		var metricValuesSorted = {
			'recall': metricValues['recall'],
			'!recall': metricValues['!recall'],
			'precision': metricValues['precision'],
			'!precision': metricValues['!precision'],
			'filter_rate': metricValues['filter_rate'],
			'match_rate': metricValues['match_rate'],
			'fpr': metricValues['fpr'],
			'accuracy': metricValues['accuracy'],
			'f1': metricValues['f1'],
			'!f1': metricValues['!f1']
		}
		
		//listing the metrics in 1 column
		var output = []
		if (numberOfColumns === 1){
			Object.keys(metricValuesSorted).forEach((key) => {
				output.push(
					<Form.Field>
						<Input className={styling} label={key} value={metricValues[key] ? metricValues[key] : "null"} />
					</Form.Field>
				)
			})
		}
		
		//listing the metrics in 2 columns
		var firstOutput = []
		var secondOutput = []
				
		if (numberOfColumns === 2){
			
			var firstColumnOutput = []
			var secondColumnOutput = []
			
			//check if we are to display the threshold or not
			if (thresholdWithout) {
				firstColumnOutput = firstColumnNoT
				secondColumnOutput = secondColumnNoT
			} else {
				firstColumnOutput = firstColumn
				secondColumnOutput = secondColumn
			}
			
			Object.keys(metricValuesSorted).forEach((key) => {
				
				//metric is to be shown in the first Column
				if (firstColumnOutput.indexOf(key) !== -1){
					firstOutput.push(
						<Form.Field>
							<Input className={styling} label={key} value={metricValues[key] ? metricValues[key] : "null"} />
						</Form.Field>
					)
				}
				else if (secondColumnOutput.indexOf(key) !== -1){
					secondOutput.push(
						<Form.Field>
							<Input className={styling} label={key} value={metricValues[key] ? metricValues[key] : "null"} />
						</Form.Field>
					)
				}
			})
		}
		
		return (
			<div id='MetricsShowDiv'>
				{metricValues ?
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