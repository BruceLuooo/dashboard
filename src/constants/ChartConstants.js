export const barChartOptions = {
	title: 'Monthly Revenue Comparison',
	isStacked: true,
	titleTextStyle: {
		fontSize: 16,
	},
	legend: { position: 'none' },
	annotations: { alwaysOutside: true },
	chartArea: {
		left: 90,
		right: 70,
		// width: '100%',
		height: '80%',
	},
	hAxis: {
		textStyle: { fontName: 'Arial', fontSize: 12 },
		minValue: 0,
		format: '$#,###',
	},
};

export const columnChartOptions = {
	title: 'Revenue Distribution',
	hAxis: { textPosition: 'none' },
	legend: { position: 'none' },
	vAxis: {
		textStyle: { fontName: 'Arial', fontSize: 12 },
		gridlines: { count: 4 },
		baseline: 0,
		format: '$#,###',
	},
	bar: { groupWidth: '40%' },
	titleTextStyle: {
		fontSize: 16,
	},
	annotations: { alwaysOutside: true },
	chartArea: {
		left: 50,
		right: 20,
		height: '80%',
	},
};

export const pieChartOptions = {
	title: 'Quantity Sold',
	legend: { position: 'none' },
	pieHole: 0.4,
	titleTextStyle: {
		fontSize: 16,
	},
	chartArea: {
		left: 50,
		right: 20,
		width: '100%',
		height: '80%',
	},
};
