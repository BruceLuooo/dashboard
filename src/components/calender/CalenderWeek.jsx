import React from 'react';
import dayjs from 'dayjs';
import HourlyDay from './HourlyDay';

function CalenderWeek({ week }) {
	const hours = [];

	for (let i = 1; i < 24; i++) {
		const hour = dayjs().startOf('day').add(i, 'hour');
		hours.push(hour.format('h A'));
	}

	return (
		<div className='table'>
			<div className='week-header-container'>
				{week.map((day, index) => (
					<div className='week-header' key={index}>
						<div>{dayjs(day).format('ddd')}</div>
						<div>{dayjs(day).format('DD')}</div>
					</div>
				))}
			</div>
			<div className='week-day-container'>
				<div className='week-time-slots'>
					<div className='week-hour'>
						<div className='hihi'></div>
					</div>
					{hours.map(hour => (
						<div className='week-hour'>
							<div className='hihi'>{hour}</div>
						</div>
					))}
				</div>
				<div className='week-day'>
					{week.map((day, idx) => (
						<HourlyDay day={day} rowIdx={idx} key={idx} />
					))}
				</div>
			</div>
		</div>
	);
}

export default CalenderWeek;
