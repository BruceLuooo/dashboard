import { useContext, useState, useRef, useEffect } from 'react';
import CalenderContext from '../../context/CalenderContext';
import close from '../../assets/close.png';
import clock from '../../assets/clock.png';
import bookmarkLogo from '../../assets/bookmark2.png';
import descriptionLogo from '../../assets/description2.png';
import check from '../../assets/check.png';
import group from '../../assets/group.png';
import removeEvent from '../../assets/delete-event.png';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function EventModal({ eventBannerRef }) {
	const bookmarkColors = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

	const {
		daySelected,
		selectedEvent,
		setShowModal,
		dispatch,
		mouseLeftClick,
		contextMenuAnimation,
		setContextMenuAnimation,
		weekStartTime,
	} = useContext(CalenderContext);

	const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
	const [description, setDescription] = useState(
		selectedEvent ? selectedEvent.description : '',
	);
	const [bookmark, setBookmark] = useState(
		selectedEvent ? selectedEvent.bookmark : 'indigo',
	);
	const [addPeople, setAddPeople] = useState(
		selectedEvent ? selectedEvent.people : '',
	);

	const contextRef = useRef(null);

	const [contextData, setContextData] = useState({
		posX: eventBannerRef.current?.offsetWidth,
		posY: eventBannerRef.current?.offsetHeight,
		visible: true,
		closeToWindowSide: 'left',
		height: 'bottom',
	});

	useEffect(() => {
		let copy = { ...contextData };
		if (mouseLeftClick.x > window.innerWidth / 2) {
			copy.closeToWindowSide = 'right';
		} else {
			copy.closeToWindowSide = 'left';
		}
		if (mouseLeftClick.y > window.innerHeight / 2) {
			copy.height = 'top';
		} else {
			copy.height = 'bottom';
		}
		setContextData(copy);
	}, [mouseLeftClick]);

	const deleteEvent = e => {
		dispatch({ type: 'delete', payload: selectedEvent });
		setShowModal(false);
	};

	const saveEvent = e => {
		e.preventDefault();

		const extractStartTime = dayjs(startTime, 'h:mm A');
		const extractEndTime = dayjs(endTime, 'h:mm A');

		const eventStartTime = daySelected
			.set('hour', extractStartTime.hour())
			.set('minute', extractStartTime.minute());
		const eventEndTime = daySelected
			.set('hour', extractEndTime.hour())
			.set('minute', extractEndTime.minute());

		const event = {
			title,
			description,
			people: addPeople,
			start: eventStartTime.format('YYYY-MM-DDTHH:mm:ss'),
			end: eventEndTime.format('YYYY-MM-DDTHH:mm:ss'),
			bookmark,
			id: selectedEvent ? selectedEvent.id : 5,
		};

		if (selectedEvent) {
			dispatch({ type: 'update', payload: event });
		} else {
			dispatch({ type: 'push', payload: event });
		}

		setShowModal(false);
	};

	const [timeSlots, setTimeSlots] = useState([]);
	const [endTimeSlots, setEndTimeSlots] = useState([]);
	const [openStartTime, setOpenStartTime] = useState(false);
	const [openEndTime, setOpenEndTime] = useState(false);
	const [startTime, setStartTime] = useState(
		selectedEvent
			? dayjs(selectedEvent.start).format('h:mm A')
			: weekStartTime
			? weekStartTime
			: '12:00 AM',
	);
	const [endTime, setEndTime] = useState(
		selectedEvent
			? dayjs(selectedEvent.end).format('h:mm A')
			: dayjs(startTime, 'h:mm A').add(1, 'hour').format('h:mm A'),
	);

	const [timeDifference, setTimeDifference] = useState(null);

	useEffect(() => {
		//Calculates the time difference between the start and end of event
		const difference = dayjs(endTime, 'h:mm A').diff(
			dayjs(startTime, 'h:mm A'),
			'minute',
		);
		setTimeDifference(difference);
	}, [endTime]);

	const updateEventStartTime = current => {
		let updateStartTime = null;

		updateStartTime = dayjs(startTime, 'h:mm A');
		updateStartTime = updateStartTime.set('hour', `${current.hour()}`);
		updateStartTime = updateStartTime.set('minute', `${current.minute()}`);

		const updateEndTime = updateStartTime.add(timeDifference, 'minute');

		setStartTime(updateStartTime.format('h:mm A'));
		setEndTime(updateEndTime.format('h:mm A'));

		setOpenStartTime(false);
	};
	const updateEventEndTime = current => {
		let updateTime = dayjs(endTime, 'h:mm A');
		updateTime = updateTime.set('hour', `${current.$H}`);
		updateTime = updateTime.set('minute', `${current.$m}`);

		setEndTime(dayjs(updateTime).format('h:mm A'));

		setOpenEndTime(false);
	};

	useEffect(() => {
		const start = dayjs().startOf('day');
		const end = dayjs().endOf('day');
		const slots = [];
		let current = start;
		while (current.isBefore(end)) {
			slots.push(current);
			current = current.add(15, 'minute');
		}
		setTimeSlots(slots);
	}, []);

	useEffect(() => {
		const start = dayjs(startTime, 'h:mm A').add(15, 'minute');
		const end = dayjs().endOf('day');
		const slots = [];
		let current = start;
		while (current.isBefore(end)) {
			slots.push(current);
			current = current.add(15, 'minute');
		}
		setEndTimeSlots(slots);
	}, [startTime]);

	const startTimeModal = () => {
		setOpenStartTime(true);
		setOpenEndTime(false);
	};
	const endTimeModal = () => {
		setOpenEndTime(true);
		setOpenStartTime(false);
	};

	return (
		<div
			className={`modal-container ${
				contextMenuAnimation &&
				`eventModal-${
					contextData.closeToWindowSide === 'right'
						? 'animation-right'
						: 'animation-left'
				}`
			}`}
			ref={contextRef}
			style={{
				display: contextData.visible ? 'block' : 'none',
				right:
					contextData.closeToWindowSide === 'right'
						? `${contextData.posX}px`
						: null,
				left:
					contextData.closeToWindowSide === 'left'
						? `${contextData.posX}px`
						: null,
				top:
					contextData.height === 'bottom'
						? `${contextData.posY - 113}px`
						: null,
				bottom:
					contextData.height === 'top' ? `${contextData.posY - 57}px` : null,
			}}
			onAnimationEnd={() => setContextMenuAnimation(false)}
			onClick={e => e.stopPropagation()}
		>
			<div className='modal-header'>
				{selectedEvent && (
					<img
						src={removeEvent}
						alt=''
						className='close-modal'
						onClick={deleteEvent}
					/>
				)}
				<img
					src={close}
					alt=''
					className='close-modal'
					onClick={e => {
						setShowModal(false);
						e.stopPropagation();
					}}
				/>
			</div>
			<div className='modal title'>
				<input
					type='text'
					placeholder='Add Title'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			</div>
			<div className='modal layout'>
				<img src={clock} alt='' className='modal-image' />
				<div>{daySelected.format('dddd, MMMM DD')}</div>
				<div className='time-period'>
					<div className='time-period-select'>
						<div onClick={startTimeModal}>{startTime}</div>
						<div
							className={`time-period-modal-active ${
								openStartTime && 'underline'
							}`}
						></div>
						{openStartTime && (
							<div className='time-period-modal'>
								{timeSlots.map((time, index) => (
									<div key={index}>
										<div
											key={time}
											onClick={() => updateEventStartTime(time)}
											className={`time-slots ${
												selectedEvent &&
												time.format('h:mm A') ===
													dayjs(selectedEvent.start).format('h:mm A') &&
												'current-selected-time'
											}`}
										>
											{time.format('h:mm A')}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
					<div>-</div>
					<div className='time-period-select'>
						<div onClick={endTimeModal}>{endTime}</div>
						<div
							className={`time-period-modal-active ${
								openEndTime && 'underline'
							}`}
						></div>
						{openEndTime && (
							<div className='time-period-modal'>
								{endTimeSlots.map((time, index) => (
									<div key={index}>
										<div
											key={time}
											onClick={() => updateEventEndTime(time)}
											className={`time-slots ${
												selectedEvent &&
												time.format('h:mm A') ===
													dayjs(selectedEvent.start).format('h:mm A') &&
												'current-selected-time'
											}`}
										>
											{time.format('h:mm A')}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='modal layout'>
				<img src={descriptionLogo} alt='' className='modal-image' />
				<textarea
					type='text'
					placeholder='Add a description'
					className='description'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
			</div>
			<div className='modal layout'>
				<img src={group} alt='' className='modal-image' />
				<input
					type='text'
					placeholder='Add people'
					className='description'
					value={addPeople}
					onChange={e => setAddPeople(e.target.value)}
				/>
			</div>
			<div className='modal layout'>
				<img src={bookmarkLogo} alt='' className='modal-image' />
				<div className='modal-bookmark-container'>
					{bookmarkColors.map((color, index) => (
						<div
							key={index}
							className={`modal-bookmark ${color}`}
							onClick={() => setBookmark(color)}
						>
							{color === bookmark && (
								<img src={check} alt='' className='check' />
							)}
						</div>
					))}
				</div>
			</div>
			<div className='modal-header modal-save'>
				<button onClick={saveEvent}>Save</button>
			</div>
		</div>
	);
}

export default EventModal;
