import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import './styling/App.css';
import OptUrlGen from './OptUrlGen.js';
import Visualisations from './Visualisations.js';
import { OresApi } from './OresApi.js';

export default class App extends Component {
	state = {
		activeItem: 'optUrlGen',
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
		const { activeItem } = this.state
		var optUrlGen = <OptUrlGen/>
		var visualisations = <Visualisations data={this.state.oresEnComplete}/>

		return (
			<div className="App">
				<div className="Header">
					<Menu id='MainMenu'>
						<Menu.Item header className="MenuItem">	
							<img id='HeaderLogo' src={require('./styling/images/Objective_Revision_Evaluation_Service_logo.svg.png')} alt=''/>
							ORES
						</Menu.Item>
						<Menu.Item
							name='Optimisation Queries'
							active={activeItem === 'optUrlGen'}
							activename='optUrlGen'
							onClick={this.handleItemClick}
						/>
						<Menu.Item 
							name='Visualisations'
							active={activeItem === 'visualisations'}
							activename='visualisations'
							onClick={this.handleItemClick} />
						<Menu.Item
							name='Another Menu Tab'
							active={activeItem === 'menu2'}
							activename='menu2'
							onClick={this.handleItemClick}
						/>
					</Menu>
				</div>
				<div className="Content">
					{this.state.activeItem === 'optUrlGen' ? optUrlGen : 
						this.state.activeItem === 'visualisations' ? visualisations : ''
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