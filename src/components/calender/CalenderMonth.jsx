import React, { useContext, useEffect, useState } from 'react';
import CalenderDay from './CalenderDay';
import CalenderContext from '../../context/CalenderContext';
import CustomContextMenu from '../CustomContextMenu';

function CalenderMonth({ month }) {
	return (
		<>
			<div className='calender-month-container'>
				{month.map((row, i) => (
					<React.Fragment key={i}>
						{row.map((day, idx) => (
							<CalenderDay day={day} key={idx} rowIdx={i} />
						))}
					</React.Fragment>
				))}
			</div>
		</>
	);
}

export default CalenderMonth;
