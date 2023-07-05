import { useContext, useState, useRef, useEffect } from 'react';
import CalenderContext from '../../context/CalenderContext';
import { saveEvent } from '../../utils/EventModalUtil';
import dayjs from 'dayjs';
import ModalTopBar from './eventModal/ModalTopBar';
import ModalTitle from './eventModal/ModalTitle';
import ModalDescription from './eventModal/ModalDescription';
import ModalBookmark from './eventModal/ModalBookmark';
import ModalPeople from './eventModal/ModalPeople';
import ModalTime from './eventModal/ModalTime';

function EventModal({ eventBannerRef }) {
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
	const contextRef = useRef(null);

	const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
	const [description, setDescription] = useState(
		selectedEvent ? selectedEvent.description : '',
	);
	const [bookmark, setBookmark] = useState({ color: '', name: '' });
	const [addPeople, setAddPeople] = useState('');
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

	const [contextData, setContextData] = useState({
		posX: eventBannerRef.current?.offsetWidth,
		posY: eventBannerRef.current?.offsetHeight,
		visible: true,
		closeToWindowSide: 'right',
		height: 'bottom',
	});

	useEffect(() => {
		setTitle(selectedEvent ? selectedEvent.title : '');
		setDescription(selectedEvent ? selectedEvent.description : '');
		setBookmark(
			selectedEvent
				? {
						color: selectedEvent.bookmark.color,
						name: selectedEvent.bookmark.name,
				  }
				: { color: 'indigo', name: 'Other' },
		);
		setAddPeople(selectedEvent ? selectedEvent.people : '');
		setStartTime(
			selectedEvent
				? dayjs(selectedEvent.start).format('h:mm A')
				: weekStartTime
				? weekStartTime
				: '12:00 AM',
		);
		setEndTime(
			selectedEvent
				? dayjs(selectedEvent.end).format('h:mm A')
				: dayjs(startTime, 'h:mm A').add(1, 'hour').format('h:mm A'),
		);
	}, [selectedEvent]);

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

	const saveEventForm = e => {
		e.preventDefault();
		const data = saveEvent(
			startTime,
			endTime,
			selectedEvent,
			title,
			description,
			addPeople,
			bookmark,
			daySelected,
		);

		if (selectedEvent) {
			dispatch({ type: 'update', payload: data });
		} else {
			dispatch({ type: 'push', payload: data });
		}
		setShowModal(false);
	};

	const modalStyle = {
		display: contextData.visible ? 'block' : 'none',
		right:
			contextData.closeToWindowSide === 'right'
				? `${contextData.posX}px`
				: null,
		left:
			contextData.closeToWindowSide === 'left' ? `${contextData.posX}px` : null,
		top: contextData.height === 'bottom' ? `${contextData.posY - 113}px` : null,
		bottom: contextData.height === 'top' ? `${contextData.posY - 57}px` : null,
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
			style={modalStyle}
			onAnimationEnd={() => setContextMenuAnimation(false)}
			onClick={e => e.stopPropagation()}
			onContextMenu={e => e.stopPropagation()}
		>
			<ModalTopBar />
			<ModalTitle title={title} setTitle={setTitle} />
			<ModalTime
				startTime={startTime}
				setStartTime={setStartTime}
				endTime={endTime}
				setEndTime={setEndTime}
			/>
			<ModalDescription
				description={description}
				setDescription={setDescription}
			/>
			<ModalPeople addPeople={addPeople} setAddPeople={setAddPeople} />
			<ModalBookmark bookmark={bookmark} setBookmark={setBookmark} />
			<div className='modal-header modal-save'>
				<button onClick={saveEventForm}>Save</button>
			</div>
		</div>
	);
}

export default EventModal;
