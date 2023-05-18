import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const saveEvent = (
	startTime,
	endTime,
	selectedEvent,
	title,
	description,
	addPeople,
	bookmark,
	daySelected,
) => {
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
		id: selectedEvent ? selectedEvent.id : Math.random(),
	};

	return event;
};

export const updateEventTimes = (startTime, current, timeDifference) => {
	let newStartTime = dayjs(startTime, 'h:mm A');
	newStartTime = newStartTime.set('hour', `${current.hour()}`);
	newStartTime = newStartTime.set('minute', `${current.minute()}`);

	const newEndTime = newStartTime.add(timeDifference, 'minute');

	return { newStartTime, newEndTime };
};

export const updateEndTime = (endTime, current) => {
	let updateTime = dayjs(endTime, 'h:mm A');
	updateTime = updateTime.set('hour', `${current.$H}`);
	updateTime = updateTime.set('minute', `${current.$m}`);

	return updateTime;
};

export const calculateTimeDifference = (endTime, startTime) => {
	const difference = dayjs(endTime, 'h:mm A').diff(
		dayjs(startTime, 'h:mm A'),
		'minute',
	);

	return difference;
};

export const getStartTimeSlots = () => {
	const start = dayjs().startOf('day');
	const end = dayjs().endOf('day');
	const slots = [];
	let current = start;
	while (current.isBefore(end)) {
		slots.push(current);
		current = current.add(15, 'minute');
	}

	return slots;
};

export const getEndTimeSlots = startTime => {
	const start = dayjs(startTime, 'h:mm A').add(15, 'minute');
	const end = dayjs().endOf('day');
	const slots = [];
	let current = start;
	while (current.isBefore(end)) {
		slots.push(current);
		current = current.add(15, 'minute');
	}

	return slots;
};
