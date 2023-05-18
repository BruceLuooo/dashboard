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

	const [bookmarks, setBookmarks] = useState([
		{ bookmarkColor: 'purple', name: 'Event' },
		{ bookmarkColor: 'green', name: 'Birthday' },
		{ bookmarkColor: 'gray', name: 'Busines' },
		{ bookmarkColor: 'blue', name: 'Meeting' },
		{ bookmarkColor: 'red', name: 'Casual' },
	]);

	useEffect(() => {
		if (showModal == false) {
			setSelectedEvent(null);
		}
	}, [showModal]);

	// useEffect(() => {
	// 	setActiveBookMarks(prevLabels => {
	// 		return [
	// 			...new Set(
	// 				state.map(event => {
	// 					return event.bookmark;
	// 				}),
	// 			),
	// 		].map(bookmark => {
	// 			const currentLabel = prevLabels.find(
	// 				lbl => lbl.color === bookmark.color,
	// 			);
	// 			return {
	// 				color: bookmark.color,
	// 				name: bookmark.name,
	// 				checked: currentLabel ? currentLabel.checked : true,
	// 			};
	// 		});
	// 	});
	// }, [state]);
	useEffect(() => {
		setActiveBookMarks(prevLabels => {
			return [...new Set(state.map(event => event.bookmark))].map(color => {
				const currentLabel = prevLabels.find(lbl => lbl.color === color);
				return {
					color,
					checked: currentLabel ? currentLabel.checked : true,
				};
			});
		});
	}, [state]);

	const updateActiveBookmark = color => {
		setActiveBookMarks(
			activeBookmarks.map(bookmark =>
				bookmark.color === color.color
					? { color: color.color, checked: !color.checked }
					: bookmark,
			),
		);
	};

	const getFilteredEvents = useMemo(() => {
		const filteredEvents = state.filter(event => {
			return activeBookmarks
				.filter(bookmark => bookmark.checked === true)
				.map(bookmark => bookmark.color)
				.includes(event.bookmark);
		});

		return filteredEvents;
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
