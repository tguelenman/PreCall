import React from 'react';

import './styling/PreviewLegend.css'

export default class PreviewLegend extends React.Component {

	render() {
		
		return (
			<div id='previewUpper'>
				<h2 className='title' id='previewTitle'>Expected classification result</h2>
				{/*<div id='previewLegend'>
					<div className='legendRow'>
						<div className='legendShapeContainer'>
							<div className='bubble legendMargin'/>
						</div>
						<p className='legendLabel'>good</p>
					</div>
					<div className='legendRow'>
						<div className='legendShapeContainer'>
							<div className='triangle legendMargin'>
								<div className='innerTriangle legendTriangle'/>
							</div>
						</div>
						<p className='legendLabel'>damaging</p>	
					</div>
				</div>*/}
			</div>
		)
	}
}