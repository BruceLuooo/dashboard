import { useState, createContext, useEffect, useReducer, useMemo } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { events } from '../constants/dummyData';

dayjs.extend(customParseFormat);

function eventsReducer(state, { type, payload }) {
	switch (type) {
		case 'push':
			return [...state, payload];
		case 'update':
			return state.map(event => {
				return event.id === payload.id ? payload : event;
			});
		case 'delete':
			return state.filter(event => event.id !== payload.id);
	}
}

const CalenderContext = createContext();

export const CalenderProvider = ({ children }) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [weekIndex, setWeekIndex] = useState(0);
	const [daySelected, setDaySelected] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [activeBookmarks, setActiveBookMarks] = useState([]);
	const [mouseRightClick, setMouseRightClick] = useState(false);
	const [rightClickPoints, setRightClickPoints] = useState({ x: 0, y: 0 });
	const [state, dispatch] = useReducer(eventsReducer, events);
	const [contextMenuAnimation, setContextMenuAnimation] = useState(false);

	//This is for event modal animation to get the coordinates to see weather or not it displays from the left side or the right side of the event
	const [mouseLeftClick, setMouseLeftClick] = useState({ x: 0, y: 0 });

	const [mounted, setMounted] = useState(false);
	const [direction, setDirection] = useState('left');
	const [isSame, setIsSame] = useState(null);
	const [weekStartTime, setWeekStartTime] = useState(null);

	// const [bookmarks, setBookmarks] = useState([
	// 	{ bookmarkColor: 'purple', name: 'Event' },
	// 	{ bookmarkColor: 'green', name: 'Birthday' },
	// 	{ bookmarkColor: 'gray', name: 'Busines' },
	// 	{ bookmarkColor: 'blue', name: 'Meeting' },
	// 	{ bookmarkColor: 'red', name: 'Casual' },
	// ]);

	useEffect(() => {
		if (showModal == false) {
			setSelectedEvent(null);
		}
	}, [showModal]);

	useEffect(() => {
		const uniqueBookmarks = [];
		state
			.map(event => event.bookmark)
			.filter(bookmark => {
				const isUnique = !uniqueBookmarks.some(
					uniqueBookmark =>
						uniqueBookmark.color === bookmark.color &&
						uniqueBookmark.name === bookmark.name,
				);
				if (isUnique) {
					uniqueBookmarks.push(bookmark);
					return true;
				}
				return false;
			});

		const updateActiveBookmarks = uniqueBookmarks.map(bookmark => {
			const find = activeBookmarks.find(
				activeBookmark => activeBookmark.bookmark.color === bookmark.color,
			);
			if (!find) {
				return {
					bookmark,
					checked: true,
				};
			} else {
				return {
					bookmark,
					checked: find.checked,
				};
			}
		});
		setActiveBookMarks(updateActiveBookmarks);
	}, [state]);
	// useEffect(() => {
	// 	setActiveBookMarks(prevLabels => {
	// 		return [...new Set(state.map(event => event.bookmark))].map(color => {
	// 			console.log(color);
	// 			const currentLabel = prevLabels.find(lbl => lbl.color === color);
	// 			return {
	// 				color,
	// 				checked: currentLabel ? currentLabel.checked : true,
	// 			};
	// 		});
	// 	});
	// }, [state]);

	const updateActiveBookmark = selected => {
		setActiveBookMarks(
			activeBookmarks.map(current =>
				current.bookmark.color === selected.bookmark.color
					? {
							bookmark: {
								color: current.bookmark.color,
								name: current.bookmark.name,
							},
							checked: !selected.checked,
					  }
					: current,
			),
		);
	};

	const getFilteredEvents = useMemo(() => {
		const findCheckedActiveBookmarks = activeBookmarks.filter(
			activeBookmark => activeBookmark.checked === true,
		);

		const filteredEvent = state.filter(event => {
			return findCheckedActiveBookmarks
				.map(bookmark => bookmark.bookmark.color)
				.includes(event.bookmark.color);
		});

		return filteredEvent;
	}, [state, activeBookmarks]);

	return (
		<CalenderContext.Provider
			value={{
				monthIndex,
				setMonthIndex,
				setDaySelected,
				setSelectedEvent,
				daySelected,
				selectedEvent,
				setShowModal,
				showModal,
				state,
				dispatch,
				activeBookmarks,
				updateActiveBookmark,
				getFilteredEvents,
				setWeekIndex,
				weekIndex,
				setMouseRightClick,
				mouseRightClick,
				setRightClickPoints,
				rightClickPoints,
				mounted,
				setMounted,
				direction,
				setDirection,
				setContextMenuAnimation,
				contextMenuAnimation,
				mouseLeftClick,
				setMouseLeftClick,
				isSame,
				setIsSame,
				setWeekStartTime,
				weekStartTime,
			}}
		>
			{children}
		</CalenderContext.Provider>
	);
};

export default CalenderContext;
