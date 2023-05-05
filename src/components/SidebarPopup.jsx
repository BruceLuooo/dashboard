import React from 'react';
import menu from '../assets/menu.png';
import { sidebarOptions } from '../constants/Constant';

function SidebarPopup({ setOpenSidebarPopup }) {
	const closePopup = e => {
		setOpenSidebarPopup(false);
	};

	return (
		<div>
			<div className='sidebar-header-popup'>
				<button className='option-menu-button-popup' onClick={closePopup}>
					<img src={menu} alt='' className='option-image' />
				</button>
				<span>Dashborder</span>
			</div>
			<div className='sidebar-options-popup'>
				{sidebarOptions.map((option, index) => (
					<a
						href={`/${option.option}`}
						key={index}
						className={`sidebar-option-popup `}
						onClick={closePopup}
					>
						<img src={option.image} alt='' className='option-image-popup' />
						<span>{option.option}</span>
					</a>
				))}
			</div>
		</div>
	);
}

export default SidebarPopup;
