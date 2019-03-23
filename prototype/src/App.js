import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './styling/App.css'
import OptUrlGen from './OptUrlGen.js'
import Visualizations from './Visualizations.js'
import { OresApi } from './OresApi.js'
import Testrange from './Testrange.js'

export default class App extends Component {
	state = {
		activeItem: 'visualizations',
		didCallApi: false,
		oresEnComplete: '',
	}

	handleItemClick = (e, { activename }) => this.setState({ activeItem: activename })
	
	componentWillMount = () => {
		if (!this.state.didCallApi) {
			OresApi.getAll(
				(result) => this.setState({
					didCallApi: true,
					oresEnComplete: result['enwiki']['models']['damaging']['statistics']['thresholds']['true'],
				})
			)
		}
	}
	
	render() {
		const { activeItem, oresEnComplete } = this.state

		return (
			<div className="App">
				<div className="Header">
					<Menu id='MainMenu'>
						<Menu.Item header className="MenuItem">	
							<img id='HeaderLogo' src={require('./styling/images/Objective_Revision_Evaluation_Service_logo.svg.png')} alt=''/>
							ORES
						</Menu.Item>
						<Menu.Item 
							name='Visualizations'
							active={activeItem === 'visualizations'}
							activename='visualizations'
							onClick={this.handleItemClick} />
						<Menu.Item
							name='Optimisation Queries'
							active={activeItem === 'optUrlGen'}
							activename='optUrlGen'
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							name='Testrange'
							active={activeItem === 'testrange'}
							activename='testrange'
							onClick={this.handleItemClick}
						/>
					</Menu>
				</div>
				<div className="Content">
					{this.state.activeItem === 'optUrlGen' ? <OptUrlGen/> : 
						this.state.activeItem === 'visualizations' && oresEnComplete ? <Visualizations data={this.state.oresEnComplete}/> : 
						this.state.activeItem === 'testrange' ? <Testrange/> : ''
					}
				</div>
				{/*
				<div className="Footer">
					<a className="FooterLinks" href='https://www.mediawiki.org/wiki/ORES'>https://www.mediawiki.org/wiki/ORES</a>
					<a className="FooterLinks" href='https://ores.wikimedia.org/'>https://ores.wikimedia.org/</a>
				</div>
				*/}
			</div>
		)
	}
}