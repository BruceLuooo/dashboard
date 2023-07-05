import calender from '../assets/calender.png';
import dashboard from '../assets/dashboard.png';

export const sidebarOptions = [
	{ option: 'Dashboard', image: dashboard },
	{ option: 'Calender', image: calender },
];

export const bookmarkColors = [
	{ color: 'indigo', name: 'Other' },
	{ color: 'green', name: 'Food' },
	{ color: 'blue', name: 'Meeting' },
	{ color: 'red', name: 'Casual' },
	{ color: 'purple', name: 'Event' },
];

export const legend = [
	{ color: '#3366cc', product: 'Lamps' },
	{ color: '#dc3912', product: 'Wall Deco' },
	{ color: '#ff9900', product: 'Sofas' },
	{ color: '#109618', product: 'Tables' },
];

export const sortingMethods = {
	date: 'asc',
	price: 'asc',
	quantity: 'asc',
};
