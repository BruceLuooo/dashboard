import React from 'react';
import descriptionLogo from '../../../assets/description2.png';

function ModalDescription({ description, setDescription }) {
	return (
		<div className='modal layout'>
			<img src={descriptionLogo} alt='' className='modal-image' />
			<textarea
				type='text'
				placeholder='Add a description'
				className='description'
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>
		</div>
	);
}

export default ModalDescription;
