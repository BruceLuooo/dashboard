import React from 'react';
import dayjs from 'dayjs';
import HourlyDay from './HourlyDay';

function CalenderWeek({ week }) {
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
					<div className='week-hour'>
						<div className='hihi'>1</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>2</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>3</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>4</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>5</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>6</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>7</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>8</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>9</div>
					</div>
					<div className='week-hour'>
						<div className='hihi'>10</div>
					</div>
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
