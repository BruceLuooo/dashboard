import React, { useState, useContext, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
import CalenderContext from '../../context/CalenderContext';
import EventModal from './EventModal';

function HourlyDay({ day }) {
	const {
		setDaySelected,
		setShowModal,
		setSelectedEvent,
		selectedEvent,
		state,
		dispatch,
		getFilteredEvents,
		activeBookmarks,
		setMouseRightClick,
		setRightClickPoints,
		showModal,
		setMouseLeftClick,
		setContextMenuAnimation,
		setWeekStartTime,
		isSame,
		setIsSame,
		mounted,
	} = useContext(CalenderContext);

	const [dayEvents, setDayEvents] = useState([]);
	const [timeSlots, setTimeSlots] = useState([]);
	const [editZindex, setEditZindex] = useState(false);

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
		setEditZindex(true);
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
		setEditZindex(false);
		setShowModal(false);
	};

	const eventBannerRef = useRef(null);

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
						ref={eventBannerRef}
						onClick={e => {
							e.stopPropagation();
							setMouseRightClick(false);
						}}
					>
						<div
							className={`time-interval ${
								overlappingEvent &&
								`${overlappingEvent.bookmark.color} testingTwo ${
									editZindex && 'testingThree'
								}`
							}  ${mounted && 'invisible'}`}
							style={{
								borderTop: time.isStartOfHour ? '1px solid #ededed' : 'none',
								height: overlappingEvent && `${eventDisplayHeight * 18}px`,
								width: '100%',
							}}
							onContextMenu={e => {
								if (overlappingEvent) {
									e.preventDefault();
									e.stopPropagation();
									setContextMenuAnimation(true);
									setSelectedEvent(overlappingEvent);
									setShowModal(false);
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
							onClick={e => {
								if (overlappingEvent !== undefined) {
									setSelectedEvent(overlappingEvent);
								} else {
									setSelectedEvent(null);
								}
								setDaySelected(day);
								setWeekStartTime(time.current.format('h:mm A'));
								setIsSame(time.current.format('YYYY-MM-DDTHH:mm:ss'));
								setShowModal(true);
								setMouseLeftClick({ x: e.clientX, y: e.clientY });
								setContextMenuAnimation(true);
							}}
						>
							<div style={{ userSelect: 'none' }}>
								{time.current.format('h:mm A')}
							</div>
							{overlappingEvent ? (
								<div>
									<div className='testing'>
										{dayjs(overlappingEvent.start).format('h:mmA')} -{' '}
										{dayjs(overlappingEvent.end).format('h:mmA')}
									</div>
									<div
										style={{
											color: 'white',
											marginLeft: '6px',
											marginTop: '4px',
										}}
									>
										{overlappingEvent.title}
									</div>
								</div>
							) : (
								<div className='invis'>bye</div>
							)}
						</div>
						{showModal &&
							time.current.format('YYYY-MM-DDTHH:mm:ss') === isSame && (
								<EventModal eventBannerRef={eventBannerRef} />
							)}
					</div>
				);
			})}
		</div>
	);
}

export default HourlyDay;
