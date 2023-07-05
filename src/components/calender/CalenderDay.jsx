import React, { useState, useContext, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import CalenderContext from '../../context/CalenderContext';
import EventModal from './EventModal';
import ShowAllEvents from './calendarDay/ShowAllEvents';
import DisplayDate from './calendarDay/DisplayDate';

function CalenderDay({ day, rowIdx }) {
	const {
		setDaySelected,
		daySelected,
		setShowModal,
		setSelectedEvent,
		selectedEvent,
		state,
		dispatch,
		getFilteredEvents,
		activeBookmarks,
		setMouseRightClick,
		setRightClickPoints,
		setContextMenuAnimation,
		setMouseLeftClick,
		showModal,
		mounted,
	} = useContext(CalenderContext);

	const eventBannerRef = useRef(null);

	const [dayEvents, setDayEvents] = useState([]);
	const [allDayEvents, setAllDayEvents] = useState([]);
	const [popup, setPopup] = useState(false);

	useEffect(() => {
		const events = getFilteredEvents.filter(
			event => dayjs(event.start).format('DD-MM-YY') === day.format('DD-MM-YY'),
		);

		const test = events.slice(0, 3);
		setDayEvents(test);
		setAllDayEvents(events);
	}, [day, state, activeBookmarks]);

	useEffect(() => {
		function handle() {
			setPopup(false);
		}
		addEventListener('click', handle);
	}, []);

	const handleDragStart = event => {
		setSelectedEvent(event);
		setMouseRightClick(false);
	};

	const handleDragOver = (e, day) => {
		e.preventDefault();
		setPopup(false);
	};

	const handleDrop = (e, day) => {
		e.preventDefault();

		let newEventDate = selectedEvent;
		newEventDate.start = dayjs(newEventDate.start)
			.date(day.$D)
			.month(day.$M)
			.format('YYYY-MM-DDTHH:mm:ss');
		newEventDate.end = dayjs(newEventDate.end)
			.date(day.$D)
			.month(day.$M)
			.format('YYYY-MM-DDTHH:mm:ss');
		dispatch({ type: 'update', payload: newEventDate });
		setSelectedEvent(null);
		setShowModal(false);
	};

	const showAllEvents = e => {
		e.stopPropagation();
		setPopup(!popup);
	};

	const onContextMenu = (e, evt) => {
		e.preventDefault();
		e.stopPropagation();
		setContextMenuAnimation(true);
		setSelectedEvent(evt);
		setShowModal(false);
		setRightClickPoints({ x: e.clientX, y: e.clientY });
		setMouseRightClick(true);
	};

	const selectDay = e => {
		setDaySelected(day);
		setShowModal(true);
		setMouseLeftClick({ x: e.clientX, y: e.clientY });
		setContextMenuAnimation(true);
		setMouseRightClick(false);
		e.stopPropagation();
		if (dayEvents.length === 0) {
			setSelectedEvent(null);
		}
	};

	return (
		<div
			className={`calender-day-container ${rowIdx === 0 && 'border-top'}`}
			ref={eventBannerRef}
		>
			<DisplayDate rowIdx={rowIdx} day={day} mounted={mounted} />
			<div
				className='calender-events'
				onClick={selectDay}
				onDragOver={e => {
					handleDragOver(e, day);
				}}
				onDrop={e => handleDrop(e, day)}
			>
				{dayEvents.map((evt, idx) => (
					<div
						key={idx}
						onClick={e => {
							setSelectedEvent(evt);
						}}
						className={`${evt.bookmark.color} calender-day-event ${
							mounted && 'invisible'
						}`}
						draggable={true}
						onDragStart={() => {
							handleDragStart(evt);
						}}
						onContextMenu={e => {
							onContextMenu(e, evt);
						}}
					>
						<div>{evt.title}</div>
					</div>
				))}

				{allDayEvents.length > dayEvents.length && (
					<div
						onClick={showAllEvents}
						className={`gray calender-day-event white ${
							mounted && 'invisible'
						}`}
					>
						{allDayEvents.length - dayEvents.length} more
					</div>
				)}
			</div>
			{showModal && day === daySelected && (
				<EventModal eventBannerRef={eventBannerRef} />
			)}
			{popup && (
				<ShowAllEvents
					day={day}
					selectDay={selectDay}
					handleDragOver={handleDragOver}
					handleDrop={handleDrop}
					setSelectedEvent={setSelectedEvent}
					allDayEvents={allDayEvents}
					handleDragStart={handleDragStart}
					onContextMenu={onContextMenu}
				/>
			)}
		</div>
	);
}

export default CalenderDay;
