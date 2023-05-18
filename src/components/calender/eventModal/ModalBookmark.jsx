import React from 'react';
import bookmarkLogo from '../../../assets/bookmark2.png';
import check from '../../../assets/check.png';
import { bookmarkColors } from '../../../constants/Constant';

function ModalBookmark({ bookmark, setBookmark }) {
	return (
		<div className='modal layout'>
			<img src={bookmarkLogo} alt='' className='modal-image' />
			<div className='modal-bookmark-container'>
				{bookmarkColors.map((color, index) => (
					<div
						key={index}
						className={`modal-bookmark ${color}`}
						onClick={() => setBookmark(color)}
					>
						{color === bookmark && <img src={check} alt='' className='check' />}
					</div>
				))}
			</div>
		</div>
	);
}

export default ModalBookmark;
