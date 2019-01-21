import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import './App.css';
import OptUrlGen from './OptUrlGen.js';

export default class App extends Component {
	state = {
		activeItem: 'optUrlGen',
	}

	handleItemClick = (e, { activeName }) => this.setState({ activeItem: activeName })

	render() {
		const { activeItem } = this.state
		var optUrlGen = <OptUrlGen/>

		return (
			<div className="App">
				<div className="Header">
					<Menu>
						<Menu.Item header>ORES</Menu.Item>
						<Menu.Item
							name='Optimisation URL Generator'
							active={activeItem === 'optUrlGen'}
							activeName='optUrlGen'
							onClick={this.handleItemClick}
						/>
						<Menu.Item 
							name='Another Menu Tab 1'
							active={activeItem === 'menu1'}
							activeName='menu1'
							onClick={this.handleItemClick} />
						<Menu.Item
							name='Another Menu Tab 2'
							active={activeItem === 'menu2'}
							activeName='menu2'
							onClick={this.handleItemClick}
						/>
					</Menu>
				</div>
				<div className="Content">
					{this.state.activeItem === 'optUrlGen' ? optUrlGen : 
						this.state.activeItem === 'menu1' ? '' : ''
					}
				</div>
				<div className="Footer">
					<a className="FooterLinks" href='https://www.mediawiki.org/wiki/ORES'>https://www.mediawiki.org/wiki/ORES</a>
					<a className="FooterLinks" href='https://ores.wikimedia.org/'>https://ores.wikimedia.org/</a>
				</div>
			</div>
		)
	}
}