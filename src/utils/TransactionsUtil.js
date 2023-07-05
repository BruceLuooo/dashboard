import { dataForCharts } from '../constants/ChartDummyData';

export const sortByDate = currentMonth => {
	const data = dataForCharts.filter(obj => obj.month === Number(currentMonth));

	const test = data.sort((a, b) => new Date(a.date) - new Date(b.date));

	return test;
};

export const sortBySelectedMethod = (
	completeMonthlySalesData,
	sortMethod,
	newOrder,
) => {
	const test = completeMonthlySalesData.sort((a, b) => {
		if (sortMethod === 'price') {
			if (newOrder === 'asc') {
				return a.price - b.price;
			} else {
				return b.price - a.price;
			}
		} else if (sortMethod === 'date') {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			if (newOrder === 'asc') {
				return dateA - dateB;
			} else {
				return dateB - dateA;
			}
		} else if (sortMethod === 'quantity') {
			if (newOrder === 'asc') {
				return a.quantity - b.quantity;
			} else {
				return b.quantity - a.quantity;
			}
		}
		return 0;
	});

	return test;
};
