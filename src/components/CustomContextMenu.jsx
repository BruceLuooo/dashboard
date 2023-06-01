import {
	useState,
	useContext,
	useEffect,
	useRef,
	useLayoutEffect,
} from 'react';
import CalenderContext from '../context/CalenderContext';
import bookmarkLogo from '../assets/bookmark2.png';
import check from '../assets/check.png';
import removeEvent from '../assets/delete-event.png';
import { bookmarkColors } from '../constants/Constant';

const MyCustomContextMenu = ({ points }) => {
	const {
		selectedEvent,
		setSelectedEvent,
		dispatch,
		setShowModal,
		contextMenuAnimation,
		setContextMenuAnimation,
	} = useContext(CalenderContext);

	const [contextData, setContextData] = useState({
		posX: points.x,
		posY: points.y,
		visible: true,
		closeToWindowSide: 'left',
	});
	const contextRef = useRef(null);

	const [bookmark, setBookmark] = useState(
		selectedEvent && {
			color: selectedEvent.bookmark.color,
			name: selectedEvent.bookmark.name,
		},
	);

	useEffect(() => {
		setContextData({
			posX: points.x,
			posY: points.y,
			visible: true,
		});
	}, [points]);

	useLayoutEffect(() => {
		if (
			contextData.posX + contextRef.current?.offsetWidth >
			window.innerWidth
		) {
			setContextData({
				...contextData,
				posX: contextData.posX - contextRef.current?.offsetWidth,
				closeToWindowSide: 'right',
			});
		}
		if (
			contextData.posY + contextRef.current?.offsetHeight >
			window.innerHeight
		) {
			setContextData({
				...contextData,
				posY: contextData.posY - contextRef.current?.offsetHeight,
			});
		}
	}, [contextData]);

	const updateEventBookmark = color => {
		const event = {
			...selectedEvent,
			bookmark: color,
		};
		dispatch({ type: 'update', payload: event });
		setSelectedEvent(null);
	};

	const deleteEvent = () => {
		dispatch({ type: 'delete', payload: selectedEvent });
		setShowModal(false);
		setSelectedEvent(null);
	};

	return (
		<div
			ref={contextRef}
			className={`contextMenu ${
				contextMenuAnimation &&
				`contextMenu-${
					contextData.closeToWindowSide === 'right'
						? 'animation-right'
						: 'animation-left'
				}`
			}`}
			style={{
				display: contextData.visible ? 'block' : 'none',
				left: contextData.posX,
				top: contextData.posY + 10,
			}}
			onAnimationEnd={() => setContextMenuAnimation(false)}
		>
			<div className='modal contextMenu-delete' onClick={deleteEvent}>
				<img src={removeEvent} alt='' className='modal-image' />
				<div>Delete</div>
			</div>
			<div className='modal layout'>
				<img src={bookmarkLogo} alt='' className='modal-image' />
				<div className='modal-bookmark-container'>
					{bookmarkColors.map((color, index) => (
						<div
							key={index}
							className={`modal-bookmark ${color.color}`}
							onClick={() => updateEventBookmark(color)}
						>
							{color.color === bookmark.color && (
								<img src={check} alt='' className='check' />
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyCustomContextMenu;
