import React from 'react';
import close from '../../../assets/close.png';

function ShowAllEvents({
	day,
	selectDay,
	handleDragOver,
	handleDrop,
	setSelectedEvent,
	allDayEvents,
	handleDragStart,
	onContextMenu,
}) {
	return (
		<div className='all-events-popup'>
			<div className='popup-align-center'>
				{day.format('ddd').toUpperCase()}
			</div>
			<img className='close-all-events-popup' src={close} alt='close popup' />
			<div className='popup-align-center'>{day.get('date')}</div>
			<div
				onClick={selectDay}
				onDragOver={handleDragOver}
				onDrop={e => {
					handleDrop(e, day);
				}}
			>
				{allDayEvents.map((evt, idx) => (
					<div
						key={idx}
						onClick={() => setSelectedEvent(evt)}
						className={`${evt.bookmark.color} calender-day-event all-day-events`}
						draggable={true}
						onDragStart={() => {
							handleDragStart(evt);
						}}
						onContextMenu={e => {
							onContextMenu(e, evt);
						}}
					>
						{evt.title}
					</div>
				))}
			</div>
		</div>
	);
}

export default ShowAllEvents;
