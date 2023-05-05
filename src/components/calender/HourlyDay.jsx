import React, { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
import CalenderContext from '../../context/CalenderContext';

function HourlyDay({ day }) {
	const {
		setDaySelected,
		setShowModal,
		setSelectedEvent,
		selectedEvent,
		monthIndex,
		state,
		dispatch,
		getFilteredEvents,
		activeBookmarks,
		setMouseRightClick,
		setRightClickPoints,
	} = useContext(CalenderContext);

	const [dayEvents, setDayEvents] = useState([]);
	const [timeSlots, setTimeSlots] = useState([]);

	useEffect(() => {
		const events = getFilteredEvents.filter(
			event => dayjs(event.start).format('DD-MM-YY') === day.format('DD-MM-YY'),
		);
		setDayEvents(events);
	}, [day, state, activeBookmarks]);

	useEffect(() => {
		const start = day.startOf('day');
		const end = day.endOf('day');
		const slots = [];
		let current = start;
		while (current.isBefore(end)) {
			const isStartOfHour = current.minute() === 0;

			slots.push({ current, isStartOfHour });
			current = current.add(15, 'minute');
		}
		setTimeSlots(slots);
	}, [day]);

	const handleDragStart = event => {
		setSelectedEvent(event);
	};

	const handleDragOver = e => {
		e.preventDefault();
	};

	const handleDrop = (e, day) => {
		e.preventDefault();

		const duration = dayjs(selectedEvent.end).diff(
			dayjs(selectedEvent.start),
			'minute',
		);
		const newStartTime = day.clone();
		const newEndTime = newStartTime.add(duration, 'minute');

		let newEventDate = selectedEvent;
		newEventDate.start = dayjs(newStartTime).format('YYYY-MM-DDTHH:mm:ss');
		newEventDate.end = dayjs(newEndTime).format('YYYY-MM-DDTHH:mm:ss');
		dispatch({ type: 'update', payload: newEventDate });
		setSelectedEvent(null);
	};

	return (
		<div className='hourly-day-container'>
			{timeSlots.map((time, index) => {
				const overlappingEvent = dayEvents.find(event =>
					time.current.isSame(event.start),
				);

				let eventDisplayHeight = 18;

				if (overlappingEvent !== undefined) {
					const duration = dayjs(overlappingEvent.end).diff(
						overlappingEvent.start,
						'minute',
					);

					eventDisplayHeight = duration / 15;
				}

				return (
					<div
						key={index}
						style={{ position: 'relative', height: '18px' }}
						onDragOver={handleDragOver}
						onDrop={e => handleDrop(e, time.current)}
					>
						<div
							// onClick={() => handleClick(time)}
							className={`time-interval ${overlappingEvent ? 'selected' : ''} `}
							style={{
								borderTop: time.isStartOfHour ? '1px solid black' : 'none',
								position: overlappingEvent && 'absolute',
								height: overlappingEvent && `${eventDisplayHeight * 18}px`,
								zIndex: overlappingEvent && '10',
								width: '100%',
							}}
							onContextMenu={e => {
								if (overlappingEvent) {
									e.preventDefault();
									e.stopPropagation();
									setSelectedEvent(overlappingEvent);
									setRightClickPoints({ x: e.clientX, y: e.clientY });
									setMouseRightClick(true);
								}
							}}
							draggable={true}
							onDragStart={() => {
								if (overlappingEvent !== undefined) {
									handleDragStart(overlappingEvent);
								}
							}}
							onClick={() => {
								if (overlappingEvent !== undefined) {
									setDaySelected(day);
									setSelectedEvent(overlappingEvent);
								}
								setShowModal(true);
							}}
						>
							<div style={{ userSelect: 'none' }}>
								{time.current.format('h:mm A')}
							</div>
							{overlappingEvent ? (
								<div style={{ zIndex: '1000' }}>
									<div className='testing' style={{ position: 'relative' }}>
										{overlappingEvent.title}
									</div>
									<div className='testing'>
										{dayjs(overlappingEvent.start).format('h:mmA')} -{' '}
										{dayjs(overlappingEvent.end).format('h:mmA')}
									</div>
								</div>
							) : (
								<div className='invis'>bye</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default HourlyDay;
