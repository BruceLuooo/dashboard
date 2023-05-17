import React, { useState, useContext, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import CalenderContext from '../../context/CalenderContext';
import EventModal from './EventModal';

function CalenderDay({ day, rowIdx }) {
	const {
		setDaySelected,
		daySelected,
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
		setContextMenuAnimation,
		setMouseLeftClick,
		showModal,
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
	});

	function getActiveClass() {
		if (day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')) {
			return 'current-date';
		}
	}

	function notCurrentMonth() {
		if (day.$M !== monthIndex) {
			return 'not-current-month';
		}
	}

	const handleDragStart = event => {
		setSelectedEvent(event);
	};

	const handleDragOver = e => {
		e.preventDefault();
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
		setPopup(true);
	};

	return (
		<div className='calender-day-container' ref={eventBannerRef}>
			<div className='calender-day-header'>
				{rowIdx === 0 && (
					<span className='calender-date'>
						{day.format('ddd').toUpperCase()}
					</span>
				)}
				<span
					className={` ${
						rowIdx !== 0 && 'calender-date'
					} ${getActiveClass()} ${notCurrentMonth()}`}
				>
					{day.format('DD')}
				</span>
			</div>
			<div
				className='calender-events'
				onClick={e => {
					setDaySelected(day);
					setShowModal(true);
					setMouseLeftClick({ x: e.clientX, y: e.clientY });
					setContextMenuAnimation(true);
				}}
				onDragOver={handleDragOver}
				onDrop={e => handleDrop(e, day)}
			>
				{dayEvents.map((evt, idx) => (
					<div
						key={idx}
						onClick={e => {
							setSelectedEvent(evt);
						}}
						className={`${evt.bookmark} calender-day-event`}
						draggable={true}
						onDragStart={() => {
							handleDragStart(evt);
							setMouseRightClick(false);
						}}
						onContextMenu={e => {
							e.preventDefault();
							e.stopPropagation();
							setContextMenuAnimation(true);
							setSelectedEvent(evt);
							setShowModal(false);
							setRightClickPoints({ x: e.clientX, y: e.clientY });
							setMouseRightClick(true);
						}}
					>
						<div>{evt.title}</div>
					</div>
				))}

				{allDayEvents.length > dayEvents.length ? (
					<div onClick={showAllEvents} className={`gray calender-day-event`}>
						{allDayEvents.length - dayEvents.length} more
					</div>
				) : (
					<div></div>
				)}
			</div>
			{showModal && day === daySelected && (
				<EventModal eventBannerRef={eventBannerRef} />
			)}
			{popup && (
				<div
					className='all-events-popup'
					onClick={e => {
						setDaySelected(day);
						setShowModal(true);
						e.stopPropagation();
					}}
					onDragOver={handleDragOver}
					onDrop={e => handleDrop(e, day)}
				>
					{allDayEvents.map((evt, idx) => (
						<div
							key={idx}
							onClick={() => setSelectedEvent(evt)}
							className={`${evt.bookmark} calender-day-event all-events-popup`}
							draggable={true}
							onDragStart={() => handleDragStart(evt)}
							onContextMenu={e => {
								e.preventDefault();
								e.stopPropagation();
								setSelectedEvent(evt);
								setRightClickPoints({ x: e.clientX, y: e.clientY });
								setMouseRightClick(true);
							}}
						>
							{evt.title}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default CalenderDay;
