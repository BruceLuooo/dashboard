import dayjs from 'dayjs';

export function getActiveClass(day) {
	if (day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')) {
		return 'current-date';
	}
}

export function notCurrentMonth(day, monthIndex) {
	if (day.$M !== monthIndex) {
		return 'not-current-month';
	}
}
