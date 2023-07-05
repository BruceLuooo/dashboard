import { dataForCharts } from '../constants/ChartDummyData';
import { legend } from '../constants/Constant';
import { formatter } from './util';
import dayjs from 'dayjs';

const productRevenue = dataForCharts.reduce((acc, obj) => {
	const { productType, price, month } = obj;
	if (!acc[month]) {
		acc[month] = [];
	}

	const exists = acc[month].find(x => x.productType === productType);

	exists
		? (exists.total += price)
		: acc[month].push({ productType, total: price });

	return acc;
}, []);

const quantitySold = dataForCharts.reduce((acc, obj) => {
	const { productType, quantity, month } = obj;
	if (!acc[month]) {
		acc[month] = [];
	}

	const exists = acc[month].find(x => x.productType === productType);

	exists
		? (exists.total += quantity)
		: acc[month].push({ productType, total: quantity });

	return acc;
}, []);

const totalMonthlyRevenue = currentMonth => {
	return dataForCharts
		.filter(obj => obj.month === currentMonth)
		.reduce((acc, obj) => acc + obj.price, 0);
};

export const columnChartSetup = currentMonth => {
	const columnChartSetup = [
		['Category', 'Revenue', { role: 'style' }, { role: 'annotation' }],
	];

	productRevenue[currentMonth].forEach((item, index) => {
		const { productType, total } = item;
		columnChartSetup.push([
			productType,
			total,
			legend[index].color,
			formatter.format(total),
		]);
	});

	return columnChartSetup;
};

export const pieChartSetup = currentMonth => {
	const pieChartSetup = [['Category', 'Quantity', { role: 'style' }]];

	quantitySold[currentMonth].forEach((item, index) => {
		const { productType, total } = item;
		pieChartSetup.push([productType, total, legend[index].color]);
	});

	return pieChartSetup;
};

export const barChartSetup = currentMonth => {
	const barChartSetup = [
		['Months', 'Lamps', 'Wall Deco', 'Sofas', 'Tables', { role: 'annotation' }],
	];

	for (let i = currentMonth - 2; i <= currentMonth; i++) {
		const monthName = dayjs()
			.month(i - 1)
			.format('MMM');

		if (productRevenue[i] !== undefined) {
			let newArray = [monthName];
			productRevenue[i].forEach(item => {
				newArray.push(item.total);
			});
			newArray.push(formatter.format(totalMonthlyRevenue(i)));
			barChartSetup.push(newArray);
		}
	}

	return barChartSetup;
};
