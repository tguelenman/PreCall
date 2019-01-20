import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import './App.css';

export default class App extends Component {
	state = {
		activeItem: "optUrlGen",
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<div className="App">
				<div className="Header">
					<Menu>
						<Menu.Item header>ORES</Menu.Item>
						<Menu.Item
							name='Optimisation URL Generator'
							active={activeItem === 'optUrlGen'}
							onClick={this.handleItemClick}
						/>
						<Menu.Item 
							name='Another Menu Tab 1'
							active={activeItem === 'menu1'}
							onClick={this.handleItemClick} />
						<Menu.Item
							name='Another Menu Tab 2'
							active={activeItem === 'menu2'}
							onClick={this.handleItemClick}
						/>
					</Menu>
				</div>
				<div className="Content">
					gfdnjo
				</div>
				<div className="Footer">
					Also check out <a>https://ores.wikimedia.org/</a>
				</div>
			</div>
		)
	}
}