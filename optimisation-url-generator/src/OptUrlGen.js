import React, { Component } from 'react';
import { 
	Form, Input, Button, 
	Label, 
} from 'semantic-ui-react'
	
import './OptUrlGen.css';

//listing only wikis that have a damaging model
const wikiOptions = [
	{ key: 'ar', text: 'arwiki', value: 'arwiki' },
    { key: 'bs', text: 'bswiki', value: 'bswiki' },
    { key: 'ca', text: 'cawiki', value: 'cawiki' },
    { key: 'cs', text: 'cswiki', value: 'cswiki' },
    { key: 'de', text: 'dewiki', value: 'dewiki' },
    { key: 'en', text: 'enwiki', value: 'enwiki' },
    { key: 'es', text: 'eswiki', value: 'eswiki' },
    { key: 'eswikibooks', text: 'eswikibooks', value: 'eswikibooks' },
    { key: 'et', text: 'etwiki', value: 'etwiki' },
    { key: 'fa', text: 'fawiki', value: 'fawiki' },
    { key: 'fi', text: 'fiwiki', value: 'fiwiki' },
    { key: 'fr', text: 'frwiki', value: 'frwiki' },
    { key: 'he', text: 'hewiki', value: 'hewiki' },
    { key: 'hu', text: 'huwiki', value: 'huwiki' },
    { key: 'it', text: 'itwiki', value: 'itwiki' },
    { key: 'lv', text: 'lvwiki', value: 'lvwiki' },
    { key: 'nl', text: 'nlwiki', value: 'nlwiki' },
    { key: 'pl', text: 'plwiki', value: 'plwiki' },
    { key: 'pt', text: 'ptwiki', value: 'ptwiki' },
    { key: 'ro', text: 'rowiki', value: 'rowiki' },
    { key: 'ru', text: 'ruwiki', value: 'ruwiki' },
    { key: 'simplewiki', text: 'simplewiki', value: 'simplewiki' },
    { key: 'sq', text: 'sqwiki', value: 'sqwiki' },
    { key: 'sr', text: 'srwiki', value: 'srwiki' },
    { key: 'sv', text: 'svwiki', value: 'svwiki' },
    { key: 'testwiki', text: 'testwiki', value: 'testwiki' },
	{ key: 'tr', text: 'trwiki', value: 'trwiki' },
	{ key: 'wikidatawiki', text: 'wikidatawiki', value: 'wikidatawiki' },
]

const minMaxOptions = [
	{ key: 'max', text: 'maximum', value: 'maximum' },
    { key: 'min', text: 'minimum', value: 'minimum' },
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
		wiki: 'enwiki',
		minMax: 'maximum',
		metric1: '',
		metric2: '',
		lg: '>=',
		metricFloat: '',
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	//TODO 2) open in new tab <- only possible if all states have a value

	render() {
		const { 
			wiki, minMax, metric1,
			metric2, lg, metricFloat,
			/*submittedMinMax, 
			submittedMetric1, submittedMetric2, submittedLg,
			submittedMetricFloat,*/
		} = this.state

		var outputUrl = "https://ores.wikimedia.org/v3/scores/"+wiki+"/?models=damaging&model_info=statistics.thresholds.true.'"+minMax+" "+metric1+" @ "+metric2+" "+lg+" "+metricFloat+"'"
		return (
			<div className = "OptUrlGen">
			{/*<Form onSubmit={this.handleSubmit}>*/}
				<Form>
					<Label basic pointing='below' color='red'>Select a wiki</Label>
					<Form.Select name='wiki' fluid value={wiki} options={wikiOptions} onChange={this.handleChange}/>
					<hr className="DividerClass"/>
					<Label basic pointing='below' color='red'>Construct your optimisation query</Label>
					<Form.Group widths='equal'>
						<Form.Select name='minMax' fluid value={minMax} options={minMaxOptions} onChange={this.handleChange}/>
						<Form.Select name='metric1' fluid value={metric1} placeholder='Metric 1' options={metricOptions} onChange={this.handleChange}/>
						<p>@</p>
						<Form.Select name='metric2' fluid value={metric2} placeholder='Metric 2' options={metricOptions}  onChange={this.handleChange}/>
						<Form.Select name='lg' fluid value={lg} options={glOptions}  onChange={this.handleChange}/>
						<Form.Input name='metricFloat' fluid value={metricFloat} placeholder='value between 0.0 and 1.0'  onChange={this.handleChange}/>
					</Form.Group>
					<Input Id='OutputUrl' name='outputUrl' value={outputUrl} />
					<Form.Button Id='NewTabButton' content='Open in new tab' onClick={() => window.open(outputUrl, '_blank')}/>
				</Form>
			</div>
		)
	}
}