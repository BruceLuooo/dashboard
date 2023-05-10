import React, { useContext, useEffect, useState } from 'react';
import CalenderDay from './CalenderDay';
import CalenderContext from '../../context/CalenderContext';

function CalenderMonth({ month }) {
	const { direction, mounted, setMounted } = useContext(CalenderContext);

	const onAnimationEnd = () => {
		setMounted(false);
	};

	return (
		<div className='border'>
			<div
				className={`calender-month-container ${
					mounted
						? `animate-leave-${direction}`
						: `animate-enter-${direction === 'left' ? 'right' : 'left'} ${
								direction === 'left' ? 'from-right' : 'from-left'
						  }`
				}`}
				onAnimationEnd={onAnimationEnd}
				key={month}
			>
				{month.map((row, i) => (
					<React.Fragment key={i}>
						{row.map((day, idx) => (
							<CalenderDay day={day} key={idx} rowIdx={i} />
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export default CalenderMonth;
