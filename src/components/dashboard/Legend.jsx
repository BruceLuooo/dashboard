import React from 'react';
import { legend } from '../../constants/Constant';

function Legend() {
	return (
		<div className='charts-legend'>
			{legend.map((legend, index) => (
				<div className='legend' key={index}>
					<div
						className='testings'
						style={{ backgroundColor: `${legend.color}` }}
					></div>
					<div style={{ color: `${legend.color}` }}>{legend.product}</div>
				</div>
			))}
		</div>
	);
}

export default Legend;
