import React from 'react';
import Sidebar from '../components/Sidebar';

function Dashboard() {
	return (
		<div className='main-container'>
			<Sidebar currentPage={'Dashboard'} />
			<div>hi bitch</div>
		</div>
	);
}

export default Dashboard;
