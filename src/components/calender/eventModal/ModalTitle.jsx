import React from 'react';

function ModalTitle({ title, setTitle }) {
	return (
		<div className='modal title'>
			<input
				type='text'
				placeholder='Add Title'
				autoFocus
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
		</div>
	);
}

export default ModalTitle;
