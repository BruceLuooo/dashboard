import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import {
	pieChartOptions,
	columnChartOptions,
	barChartOptions,
} from '../../constants/ChartConstants';
import {
	columnChartSetup,
	pieChartSetup,
	barChartSetup,
} from '../../utils/ChartsUtil';

function Charts({ currentMonth }) {
	const [columnChart, setColumnChart] = useState([]);
	const [pieChart, setPieChart] = useState([]);
	const [barChart, setBarChart] = useState([]);

	useEffect(() => {
		setColumnChart(columnChartSetup(currentMonth));
		setPieChart(pieChartSetup(currentMonth));
		setBarChart(barChartSetup(currentMonth));
	}, [currentMonth]);

	return (
		<div className='charts-container'>
			<Chart
				className='pie-chart'
				chartType='PieChart'
				data={pieChart}
				options={pieChartOptions}
			/>
			<Chart
				className='column-chart'
				chartType='ColumnChart'
				data={columnChart}
				options={columnChartOptions}
			/>
			<Chart
				chartType='BarChart'
				className='bar-chart'
				data={barChart}
				options={barChartOptions}
			/>
		</div>
	);
}

export default Charts;
