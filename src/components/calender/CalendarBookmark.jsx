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
			{activeBookmarks.map((activeBookmark, index) => (
				<div
					key={index}
					className='calendar-bookmark'
					onClick={() => updateActiveBookmark(activeBookmark)}
				>
					<input
						type='checkbox'
						checked={activeBookmark.checked}
						style={{ accentColor: activeBookmark.bookmark.color }}
						className='checkbox'
					/>
					<div key={index}>{activeBookmark.bookmark.name}</div>
				</div>
			))}
		</div>
	);
}

export default CalendarBookmark;
