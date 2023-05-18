import { useContext } from 'react';
import removeEvent from '../../../assets/delete-event.png';
import close from '../../../assets/close.png';
import CalenderContext from '../../../context/CalenderContext';

function ModalTopBar() {
	const { selectedEvent, setShowModal, dispatch } = useContext(CalenderContext);

	const deleteEvent = () => {
		dispatch({ type: 'delete', payload: selectedEvent });
		setShowModal(false);
	};

	return (
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
	);
}

export default ModalTopBar;
