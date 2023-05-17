import React, { useContext, useEffect, useState } from 'react';
import arrow from '../../assets/arrow.png';
import dayjs from 'dayjs';
import CalenderContext from '../../context/CalenderContext';
import CalendarBookmark from './CalendarBookmark';

function CalenderHeader({ setting, setViewSetting, currentWeek }) {
	const {
		monthIndex,
		setMonthIndex,
		weekIndex,
		setWeekIndex,
		activeBookmarks,
		updateActiveBookmark,
		setMounted,
		setDirection,
	} = useContext(CalenderContext);

	const next = () => {
		if (setting === 'month') {
			setMonthIndex(monthIndex + 1);
		} else {
			setWeekIndex(weekIndex + 1);
		}
		setDirection('left');
		setMounted(true);
	};
	const prev = () => {
		if (setting === 'month') {
			setMonthIndex(monthIndex - 1);
		} else {
			setWeekIndex(weekIndex - 1);
		}
		setDirection('right');
		setMounted(true);
	};

	const [isSameMonth, setIsSameMonth] = useState(true);
	const [isSameYear, setIsSameYear] = useState(true);
	const [backgroundColor, setBackgroundColor] = useState('left');
	const [openFilterModal, setOpenFilterModal] = useState(false);
	const [settings, setSettings] = useState(null);

	useEffect(() => {
		const firstDayOfWeek = {
			month: currentWeek[0].$M,
			year: currentWeek[0].$y,
		};
		const lastDayOfWeek = {
			month: currentWeek[currentWeek.length - 1].$M,
			year: currentWeek[currentWeek.length - 1].$y,
		};

		if (firstDayOfWeek.month === lastDayOfWeek.month) {
			setIsSameMonth(true);
		} else setIsSameMonth(false);

		if (firstDayOfWeek.year === lastDayOfWeek.year) {
			setIsSameYear(true);
		} else setIsSameYear(false);
	}, [currentWeek]);

	const displayMonth = () => {
		setViewSetting('month');
		setBackgroundColor('left');
	};
	const displayWeek = () => {
		setViewSetting('week');
		setBackgroundColor('right');
	};

	const [coords, setCoords] = useState({ x: -1, y: -1 });
	const [isRippling, setIsRippling] = useState(false);

	const today = e => {
		const rect = e.target.getBoundingClientRect();
		setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
		setSettings('today');

		if (setting === 'month') {
			if (monthIndex === dayjs().month()) {
				return;
			}

			if (monthIndex > dayjs().month()) {
				setDirection('right');
			} else {
				setDirection('left');
			}
			setMounted(true);
			setMonthIndex(dayjs().month());
		} else {
			if (weekIndex === 0) {
				return;
			}
			if (weekIndex > 0) {
				setDirection('right');
			} else {
				setDirection('left');
			}
			setWeekIndex(0);
			setMounted(true);
		}
	};

	useEffect(() => {
		if (coords.x !== -1 && coords.y !== -1) {
			setIsRippling(true);
			setTimeout(() => {
				setIsRippling(false);
				setSettings(null);
			}, 300);
		} else setIsRippling(false);
	}, [coords]);

	useEffect(() => {
		if (!isRippling) setCoords({ x: -1, y: -1 });
	}, [isRippling]);

	return (
		<div className='calender-header-container'>
			<div className='calender-header-container'>
				<button onClick={e => today(e)} className='ripple-button'>
					{isRippling && settings === 'today' && (
						<span
							style={{
								left: coords.x,
								top: coords.y,
							}}
						/>
					)}
					Today
				</button>
				<div>
					<button onClick={prev}>
						<img src={arrow} alt='' className='calender-header-arrow' />
					</button>
					<button onClick={next}>
						<img
							src={arrow}
							alt=''
							className='calender-header-arrow opposite'
						/>
					</button>
				</div>
				<div>
					{setting === 'month' ? (
						<div>
							{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
						</div>
					) : (
						<div>
							{isSameMonth ? (
								<div>
									{dayjs(new Date(dayjs().add(weekIndex, 'week'))).format(
										'MMMM YYYY',
									)}
								</div>
							) : (
								<div>
									{dayjs(new Date(dayjs(currentWeek[0]))).format('MMM')}{' '}
									{!isSameYear &&
										dayjs(new Date(dayjs(currentWeek[0]))).format('YYYY')}{' '}
									-{' '}
									{dayjs(
										new Date(dayjs(currentWeek[currentWeek.length - 1])),
									).format('MMM YYYY')}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			<div className='calender-header-bookmarks'>
				<button
					className='ripple-button'
					onClick={e => {
						e.stopPropagation();
						const rect = e.target.getBoundingClientRect();
						setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
						setSettings('filter');
						setOpenFilterModal(!openFilterModal);
					}}
				>
					{isRippling && settings === 'filter' && (
						<span
							style={{
								left: coords.x,
								top: coords.y,
							}}
						/>
					)}
					Filter
				</button>
				{openFilterModal && (
					<CalendarBookmark setOpenFilterModal={setOpenFilterModal} />
				)}
			</div>
			<div className='calender-header-toggle'>
				<div className={`background ${backgroundColor}`}></div>
				<button
					onClick={e => {
						displayMonth();
						const rect = e.target.getBoundingClientRect();
						setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
						setSettings('monthsss');
					}}
				>
					{isRippling && settings === 'monthsss' && (
						<span
							className='month-button'
							style={{
								left: coords.x,
								top: coords.y,
							}}
						/>
					)}
					Month
				</button>
				{/* <button onClick={displayMonth}>Month</button> */}
				<button
					onClick={e => {
						displayWeek();
						const rect = e.target.getBoundingClientRect();
						setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
						setSettings('weekss');
					}}
				>
					{isRippling && settings === 'weekss' && (
						<span
							className='month-button'
							style={{
								left: coords.x,
								top: coords.y,
							}}
						/>
					)}
					Week
				</button>
				{/* <button onClick={displayWeek}>Week</button> */}
			</div>
		</div>
	);
}

export default CalenderHeader;
