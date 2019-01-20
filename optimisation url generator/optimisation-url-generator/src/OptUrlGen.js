import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react'
import './OptUrlGen.css';

const minMaxOptions = [
  { key: 'min', text: 'minimum', value: 'minimum' },
  { key: 'max', text: 'maximum', value: 'maximum' },
]

const metricOptions = [
  { key: '!f1', text: '!f1', value: '!f1' },
  { key: '!precision', text: '!precision', value: '!precision' },
  { key: '!recall', text: '!recall', value: '!recall' },
  { key: 'accuracy', text: 'accuracy', value: 'accuracy' },
  { key: 'f1', text: 'f1', value: 'f1' },
  { key: 'filter_rate', text: 'filter_rate', value: 'filter_rate' },
  { key: 'fpr', text: 'fpr', value: 'fpr' },
  { key: 'match_rate', text: 'match_rate', value: 'match_rate' },
  { key: 'precision', text: 'precision', value: 'precision' },
  { key: 'recall', text: 'recall', value: 'recall' },
]

const glOptions = [
  { key: 'ge', text: '>=', value: '>=' },
  { key: 'le', text: '<=', value: '<=' },
]

export default class OptUrlGen extends Component {
	
	state = {
		minMax: 'maximum',
		metric1: '',
		metric2: '',
		lg: '>=',
		metricFloat: '',
		submittedMinMax: '',
		submittedMetric1: '',
		submittedMetric2: '',
		submittedLg: '',
		submittedMetricFloat: '',
	}
	
	handleSubmit = () => {
		const { 
			minMax, metric1, metric2, 
			lg, metricFloat, submittedMinMax, 
			submittedMetric1, submittedMetric2, submittedLg,
			submittedMetricFloat,
		} = this.state

		this.setState({ 
			submittedMinMax: minMax, 
			submittedMetric1: metric1,
			submittedMetric2: metric2,
			submittedLg: lg,
			submittedMetricFloat: metricFloat,
		})
	}

	//handleChange = (e, { value }) => this.setState({ value })
	handleChange = (e, { name, value }) => this.setState({ [name]: value })


	//TODO also for other models <- mit trennstrich zur naechsten section
	//TODO no submit button but 1) copy to clipboard, 2) open in new tab <- only possible if all states have a value

	render() {
		const { 
			minMax, metric1, metric2, 
			lg, metricFloat, submittedMinMax, 
			submittedMetric1, submittedMetric2, submittedLg,
			submittedMetricFloat,
		} = this.state

		return (
			<div className = "OptUrlGen">
				<Form onSubmit={this.handleSubmit}>
					<Form.Group widths='equal'>
						<Form.Select name='minMax' fluid value={'maximum'} options={minMaxOptions} onChange={this.handleChange}/>
						<Form.Select name='metric1' fluid value={metric1} placeholder='Metric 1' options={metricOptions} onChange={this.handleChange}/>
						<p>@</p>
						<Form.Select name='metric2' fluid value={metric2} placeholder='Metric 2' options={metricOptions}  onChange={this.handleChange}/>
						<Form.Select name='lg' fluid value={'>='} options={glOptions}  onChange={this.handleChange}/>
						<Form.Input name='metricFloat' fluid value={metricFloat} placeholder='value between 0.0 and 1.0'  onChange={this.handleChange}/>
					</Form.Group>
					<Input Id='outputUrl' name='outputUrl' value={"https://ores.wikimedia.org/v3/scores/enwiki/?models=damaging&model_info=statistics.thresholds.true.'"+this.state.minMax+" "+this.state.metric1+" @ "+this.state.metric2+" "+this.state.lg+" "+this.state.metricFloat+"'"} />
					<Form.Button content='Submit' />
				</Form>
				
			</div>
		)
	}
}