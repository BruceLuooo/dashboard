import React from 'react';
import group from '../../../assets/group.png';

function ModalPeople({ addPeople, setAddPeople }) {
	return (
		<div className='modal layout'>
			<img src={group} alt='' className='modal-image' />
			<input
				type='text'
				placeholder='Add people'
				className='description'
				value={addPeople}
				onChange={e => setAddPeople(e.target.value)}
			/>
		</div>
	);
}

export default ModalPeople;
