import { useContext } from 'react';
import { notCurrentMonth, getActiveClass } from '../../../utils/CalendarUtil';
import CalenderContext from '../../../context/CalenderContext';

function DisplayDate({ rowIdx, day, mounted }) {
	const { monthIndex } = useContext(CalenderContext);

	return (
		<div className='calender-day-header'>
			{rowIdx === 0 && (
				<span className='calender-date'>{day.format('ddd').toUpperCase()}</span>
			)}
			<span
				className={`${notCurrentMonth(day, monthIndex)} ${getActiveClass(
					day,
				)} ${mounted && 'invisible'} calender-date `}
			>
				{day.format('D')}
			</span>
		</div>
	);
}

export default DisplayDate;
