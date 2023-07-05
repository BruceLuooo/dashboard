import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
dayjs.extend(weekYear);
dayjs.extend(weekOfYear);

export function getMonth(month = dayjs().month()) {
	month = Math.floor(month);
	const year = dayjs().year();
	const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
	let currentMonthCount = 0 - firstDayOfTheMonth;
	const daysMatrix = new Array(6).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;
			return dayjs(new Date(year, month, currentMonthCount));
		});
	});
	return daysMatrix;
}

export function getWeek(numWeeks) {
	const startOfWeek = dayjs().add(numWeeks, 'week').startOf('week');
	const dates = [];

	for (let i = 0; i < 7; i++) {
		const date = startOfWeek.add(i, 'day');
		dates.push(dayjs(new Date(date)));
	}

	return dates;
}

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});
