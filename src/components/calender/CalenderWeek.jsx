import { useContext } from 'react';
import dayjs from 'dayjs';
import HourlyDay from './HourlyDay';
import CalenderContext from '../../context/CalenderContext';

function CalenderWeek({ week }) {
	const hours = [];

	for (let i = 1; i < 24; i++) {
		const hour = dayjs().startOf('day').add(i, 'hour');
		hours.push(hour.format('h A'));
	}

	const { direction, mounted, setMounted, showModal } =
		useContext(CalenderContext);

	const onAnimationEnd = () => {
		setMounted(false);
	};

	function getActiveClass(day) {
		if (day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')) {
			return true;
		}
	}

	return (
		<div
			className={`table ${
				mounted
					? `animate-leave-${direction}`
					: `animate-enter-${direction === 'left' ? 'right' : 'left'} ${
							direction === 'left' ? 'from-right' : 'from-left'
					  }`
			}`}
			onAnimationEnd={onAnimationEnd}
			key={week}
		>
			<div className='week-container'>
				<div className='week-header-gap'></div>
				<div className='week-header-container'>
					{week.map((day, index) => (
						<div className='week-header' key={index}>
							<div className={`${getActiveClass(day) && 'current'}`}>
								{dayjs(day).format('ddd')}
							</div>
							<div className={`${getActiveClass(day) && 'current-date'}`}>
								{dayjs(day).format('DD')}
							</div>
						</div>
					))}
				</div>
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
