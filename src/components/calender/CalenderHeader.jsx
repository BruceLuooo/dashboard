import React, { useContext, useEffect, useState } from 'react';
import arrow from '../../assets/arrow.png';
import dayjs from 'dayjs';
import CalenderContext from '../../context/CalenderContext';

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
			setDirection('left');
			setMounted(true);
		} else {
			setWeekIndex(weekIndex + 1);
		}
	};
	const prev = () => {
		if (setting === 'month') {
			setMonthIndex(monthIndex - 1);
			setDirection('right');
			setMounted(true);
		} else {
			setWeekIndex(weekIndex - 1);
		}
	};
	const today = () => {
		if (setting === 'month') {
			if (monthIndex > dayjs().month()) {
				setDirection('right');
			} else {
				setDirection('left');
			}
			setMounted(true);
			setMonthIndex(dayjs().month());
		} else {
			setWeekIndex(0);
		}
	};

	const [isSameMonth, setIsSameMonth] = useState(true);
	const [isSameYear, setIsSameYear] = useState(true);
	const [backgroundColor, setBackgroundColor] = useState('left');

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

	return (
		<div className='calender-header-container'>
			<div className='calender-header-container'>
				<button onClick={today}>Today</button>
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
				{activeBookmarks.map((bookmark, index) => (
					<div key={index} className='calender-header-bookmark'>
						<input
							type='checkbox'
							checked={bookmark.checked}
							onChange={() => updateActiveBookmark(bookmark)}
						/>
						<div key={index}>{bookmark.color}</div>
					</div>
				))}
			</div>
			<div className='calender-header-toggle'>
				<div className={`background ${backgroundColor}`}></div>
				<button onClick={displayMonth}>Month</button>
				<button onClick={displayWeek}>Week</button>
			</div>
		</div>
	);
}

export default CalenderHeader;