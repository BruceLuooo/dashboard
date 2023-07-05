import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TransactionInfo from '../components/dashboard/TransactionInfo';
import Charts from '../components/dashboard/Charts';
import SelectMonth from '../components/dashboard/SelectMonth';
import Legend from '../components/dashboard/Legend';

function Dashboard() {
	const [currentMonth, setCurrentMonth] = useState(1);

	return (
		<div className='main-container'>
			<Sidebar currentPage={'Dashboard'} />
			<div className='dashboard-container'>
				<SelectMonth setCurrentMonth={setCurrentMonth} />
				<Charts currentMonth={currentMonth} />
				<Legend />
				<TransactionInfo currentMonth={currentMonth} />
			</div>
		</div>
	);
}

export default Dashboard;
