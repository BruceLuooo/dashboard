import { useContext, useEffect } from 'react';
import CalenderContext from '../../context/CalenderContext';

function CalendarBookmark({ setOpenFilterModal }) {
	const { activeBookmarks, updateActiveBookmark } = useContext(CalenderContext);

	useEffect(() => {
		const handleClick = () => {
			setOpenFilterModal(false);
		};

		window.addEventListener('click', handleClick);
	});

	return (
		<div
			className='bookmark-modal-container'
			onClick={e => e.stopPropagation()}
		>
			{activeBookmarks.map((bookmark, index) => (
				<div key={index} className='calendar-bookmark'>
					<input
						type='checkbox'
						checked={bookmark.checked}
						onChange={() => updateActiveBookmark(bookmark)}
					/>
					<div key={index}>{bookmark.color}</div>
				</div>
			))}
		</div>
	);
}

export default CalendarBookmark;
