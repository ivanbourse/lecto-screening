import React from 'react';
import { useHistory } from 'react-router-dom';

const SchoolForm = () => {
	const history = useHistory();
	const handleSubmit = e => {
		e.preventDefault();
		history.push('/tutorial');
	};

	return (
		<form className='inputs' onSubmit={handleSubmit}>
			<div className='input-group'>
				<label htmlFor='code' className='label'>
					Ingresá el código que te dio tu escuela
				</label>
				<input type='text' className='input' id='code' name='code' />
			</div>

			<button type='submit' to='/test' className='button'>
				Continuar
			</button>
		</form>
	);
};

export default SchoolForm;
