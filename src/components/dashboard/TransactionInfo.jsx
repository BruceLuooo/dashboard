import { useState, useEffect } from 'react';
import { dataForCharts } from '../../constants/ChartDummyData';
import { formatter } from '../../utils/util';
import downArrow from '../../assets/downArrow.svg';
import useDebounce from '../../utils/useDebounce';
import { sortingMethods } from '../../constants/Constant';
import { sortByDate, sortBySelectedMethod } from '../../utils/TransactionsUtil';

function TransactionInfo({ currentMonth }) {
	const [completeMonthlySalesData, setCompleteMonthlySalesData] = useState([]);
	const [search, setSearch] = useState('');
	const [sortOrder, setSortOrder] = useState(sortingMethods);
	const debounce = useDebounce(search, 300);

	useEffect(() => {
		setCompleteMonthlySalesData(sortByDate(currentMonth));
		setSortOrder(sortingMethods);
		setSearch('');
	}, [currentMonth]);

	useEffect(() => {
		const data = dataForCharts.filter(
			obj => obj.month === Number(currentMonth),
		);

		if (search === '') {
			const allData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

			setCompleteMonthlySalesData(allData);
		} else {
			const filterData = data.filter(data =>
				data.productName.toLowerCase().startsWith(search.toLowerCase()),
			);
			setCompleteMonthlySalesData(filterData);
		}
		setSortOrder(sortingMethods);
	}, [debounce]);

	const sortData = sortMethod => {
		const newOrder = sortOrder[sortMethod] === 'asc' ? 'desc' : 'asc';
		setSortOrder({ ...sortOrder, [sortMethod]: newOrder });
		setCompleteMonthlySalesData(
			sortBySelectedMethod(completeMonthlySalesData, sortMethod, newOrder),
		);
	};

	return (
		<div className='transaction-data-container'>
			<div className='transaction-header'>
				<div>Transaction</div>
				<input
					type='text'
					className='search-transaction'
					placeholder='Search by name'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<div className='single-transaction' style={{ marginRight: '22px' }}>
				<div
					className='filter-button transaction-date'
					onClick={() => sortData('date')}
				>
					<img src={downArrow} alt='down arrow' className='down-arrow' />
					<div>Date</div>
				</div>
				<div className='transaction-name'>Name</div>
				<div className='transaction-type'>Type</div>
				<div
					className='filter-button small-margin'
					onClick={() => sortData('price')}
				>
					<img src={downArrow} alt='down arrow' className='down-arrow' />
					<div>Amount</div>
				</div>
				<div
					className='filter-button small-margin small-width'
					onClick={() => sortData('quantity')}
				>
					<img src={downArrow} alt='down arrow' className='down-arrow' />
					<div>Qty.</div>
				</div>
			</div>
			<div className='transaction-list'>
				{completeMonthlySalesData.map((data, index) => (
					<div className='single-transaction' key={index}>
						<div className='transaction-date'>{data.date}</div>
						<div className='transaction-name'>{data.productName}</div>
						<div className='transaction-type'>{data.productType}</div>
						<div className='small-margin'>{formatter.format(data.price)}</div>
						<div
							className='small-margin small-width'
							style={{ paddingLeft: '10px' }}
						>
							{data.quantity}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default TransactionInfo;
