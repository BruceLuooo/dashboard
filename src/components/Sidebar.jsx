import { useState, useEffect } from 'react';
import menu from '../assets/menu.png';
import SidebarPopup from './SidebarPopup';
import { sidebarOptions } from '../constants/Constant';
import logo from '../assets/vite.svg';

function Sidebar({ currentPage }) {
	useEffect(() => {
		const handleEvent = () => setOpenSidebarPopup(false);

		window.addEventListener('click', handleEvent);
	}, []);

	const [openSidebarPopup, setOpenSidebarPopup] = useState(false);

	const openPopup = e => {
		e.stopPropagation();
		setOpenSidebarPopup(true);
	};

	return (
		<div className='sidebar-container'>
			<div className='sidebar-header'>
				<button className='option-menu-button' onClick={openPopup}>
					<img src={menu} alt='' className='option-image ' />
				</button>
				<img src={logo} alt='' className='logo' />
				<span style={{ fontWeight: '600' }}>
					Dash<span style={{ color: '#646cff' }}>border</span>
				</span>
			</div>
			<div className='sidebar-options'>
				{sidebarOptions.map((option, index) => (
					<a
						href={`/${option.option}`}
						key={index}
						className={`sidebar-option ${
							option === currentPage && 'sidebar-option-active'
						}`}
					>
						<img src={option.image} alt='' className='option-image' />
						<span>{option.option}</span>
					</a>
				))}
			</div>
			<div className={`sidebar-popup ${openSidebarPopup && 'active'}`}>
				<SidebarPopup setOpenSidebarPopup={setOpenSidebarPopup} />
			</div>
		</div>
	);
}

export default Sidebar;
