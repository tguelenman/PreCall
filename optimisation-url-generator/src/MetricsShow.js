import React, { Component } from 'react';
import { 
	Form, Input, 
	} from 'semantic-ui-react';

import './styling/MetricsShow.css';

//with threshold
const firstColumn = ['!f1', '!precision', '!recall', 'accuracy', 'f1', 'filter_rate']
const secondColumn = ['fpr', 'match_rate', 'precision', 'recall', 'threshold']

//without threshold
const firstColumnNoT = ['!f1', '!precision', '!recall', 'accuracy', 'f1']
const secondColumnNoT = ['filter_rate', 'fpr', 'match_rate', 'precision', 'recall']

export default class MetricsGetRequest extends Component {

	state = {
		metrics: this.props.metrics
	}
	
	componentWillReceiveProps  = (nextProps) => {
		this.setState({ metrics: nextProps.metrics })
	}
	
	render() {
		const { metrics, } = this.state
		const style = this.props.style
		const numberOfColumns = this.props.numberOfColumns
		const thresholdWithout = this.props.thresholdWithout
		console.log("MetricsShow: ",JSON.stringify(this.state.metrics))
		
		//listing the metrics in 1 column
		var output = []
		if (numberOfColumns === 1){
			Object.keys(metrics).forEach((key) => {
				output.push(
					<Form.Field>
						<Input className={style} label={key} value={metrics[key] ? metrics[key] : "null"} />
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
			
			Object.keys(metrics).forEach((key) => {
				
				//metric is to be shown in the first Column
				if (firstColumnOutput.indexOf(key) !== -1){
					firstOutput.push(
						<Form.Field>
							<Input className={style} label={key} value={metrics[key] ? metrics[key] : "null"} />
						</Form.Field>
					)
				}
				else if (secondColumnOutput.indexOf(key) !== -1){
					secondOutput.push(
						<Form.Field>
							<Input className={style} label={key} value={metrics[key] ? metrics[key] : "null"} />
						</Form.Field>
					)
				}
			})
		}
		
		return (
			<div id='MetricsShowDiv'>
				{metrics ?
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