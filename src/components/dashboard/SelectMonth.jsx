import React from 'react';

function SelectMonth({ setCurrentMonth }) {
	const selectMonth = e => {
		setCurrentMonth(e.target.value);
	};

	return (
		<div className='select-data'>
			<div className='select-dates'>
				<span>Month</span>
				<select
					name='months'
					id='months'
					className='month-options'
					onChange={selectMonth}
				>
					<option value={1}>January</option>
					<option value={2}>Febuary</option>
					<option value={3}>March</option>
					<option value={4}>April</option>
					<option value={5}>May</option>
					<option value={6}>June</option>
				</select>
			</div>
			<div className='select-dates'>
				<span>Year</span>
				<select name='year' id='year' className='month-options'>
					<option value='2023'>2023</option>
				</select>
			</div>
		</div>
	);
}

export default SelectMonth;
