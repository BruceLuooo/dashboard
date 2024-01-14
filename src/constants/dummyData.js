import dayjs from 'dayjs';

const currentMonth = dayjs().format('M');

export const events = [
	{
		title: 'Brunch',
		description: '@Bakery down the street',
		people: 'Bruce',
		bookmark: { color: 'red', name: 'Casual' },
		id: 1,
		start: `2024-${currentMonth}-06T11:00:00`,
		end: `2024-${currentMonth}-06T14:00:00`,
	},
	{
		title: 'Team Meeting',
		description: 'Go through the agenda for the month',
		people: 'Bruce',
		bookmark: { color: 'blue', name: 'Meeting' },
		id: 2,
		start: `2024-${currentMonth}-07T08:00:00`,
		end: `2024-${currentMonth}-07T10:00:00`,
	},
	{
		title: 'Birthday',
		description: 'Birthday Event',
		people: 'Bruce',
		bookmark: { color: 'purple', name: 'Event' },
		id: 3,
		start: `2024-${currentMonth}-18T08:00:00`,
		end: `2024-${currentMonth}-18T10:00:00`,
	},
	{
		title: 'Tennis Practice',
		description: 'Tennis practice with coach',
		people: 'Bruce',
		bookmark: { color: 'red', name: 'Casual' },
		id: 4,
		start: `2024-${currentMonth}-15T08:00:00`,
		end: `2024-${currentMonth}-15T10:00:00`,
	},
	{
		title: 'Meeting',
		description: 'Discuss promoting strategies',
		people: 'Bruce',
		bookmark: { color: 'blue', name: 'Meeting' },
		id: 5,
		start: `2024-${currentMonth}-15T11:00:00`,
		end: `2024-${currentMonth}-15T13:00:00`,
	},
	{
		title: 'Lunch',
		description: 'Lunch with team',
		people: 'Bruce',
		bookmark: { color: 'green', name: 'Food' },
		id: 6,
		start: `2024-${currentMonth}-15T13:00:00`,
		end: `2024-${currentMonth}-15T15:00:00`,
	},
	{
		title: 'Party',
		description: 'Network Event',
		people: 'Bruce',
		bookmark: { color: 'purple', name: 'Event' },
		id: 7,
		start: `2024-${currentMonth}-15T20:00:00`,
		end: `2024-${currentMonth}-15T23:00:00`,
	},
];
