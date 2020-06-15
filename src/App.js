import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './styling/App.css'
import Visualizations from './Visualizations.js'
import { OresApi } from './OresApi.js'

export default class App extends Component {
	
	state = {
		activeItem: 'visualizations',
		didCallApi: false,
		oresComplete: '',
	}

	handleItemClick = (e, { activename }) => this.setState({ activeItem: activename })
	
	
	componentWillMount = () => {
		
		//call API once on start
		if (!this.state.didCallApi) {
			
			//and save result to state (currently only enwiki)
			OresApi.getAll(
				(result) => this.setState({
					didCallApi: true,
					oresComplete: result['enwiki']['models']['damaging']['statistics']['thresholds']['true'],
				})
			)
		}
	}
	
	render() {
		
		const { activeItem, oresComplete } = this.state

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
					</Menu>
				</div>
				<div className="Content">
					{
						activeItem === 'visualizations' && oresComplete ? <Visualizations data={oresComplete}/> :  ''
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