import { useContext, useState } from 'react';
import CalenderContext from '../../context/CalenderContext';
import close from '../../assets/close.png';
import clock from '../../assets/clock.png';
import bookmarkLogo from '../../assets/bookmark2.png';
import descriptionLogo from '../../assets/description2.png';
import check from '../../assets/check.png';
import group from '../../assets/group.png';
import removeEvent from '../../assets/delete-event.png';

function EventModal() {
	const bookmarkColors = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

	const { daySelected, selectedEvent, setShowModal, dispatch } =
		useContext(CalenderContext);

	const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
	const [description, setDescription] = useState(
		selectedEvent ? selectedEvent.description : '',
	);
	const [bookmark, setBookmark] = useState(
		selectedEvent ? selectedEvent.bookmark : '',
	);
	const [addPeople, setAddPeople] = useState(
		selectedEvent ? selectedEvent.people : '',
	);

	const deleteEvent = e => {
		dispatch({ type: 'delete', payload: selectedEvent });
		setShowModal(false);
	};

	const saveEvent = e => {
		e.preventDefault();
		const event = {
			title,
			description,
			people: addPeople,
			date: daySelected.format('MMMM DD, YYYY'),
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

	return (
		<div className='modal-container'>
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
				<span>{daySelected.format('dddd, MMMM DD')}</span>
				<button className={`modal-time`}>Add Time</button>
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
