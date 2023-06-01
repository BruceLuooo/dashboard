import React from 'react';
import Sidebar from '../components/Sidebar';

function Dashboard() {
	return (
		<div className='main-container'>
			<Sidebar currentPage={'Dashboard'} />
			<div>In Development</div>
		</div>
	);
}

export default Dashboard;
