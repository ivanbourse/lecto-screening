import React from 'react';
import { resetTest } from '../redux/slices/questions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const FinishedTest = () => {
	const dispatch = useDispatch();
	const resetTestState = () => {
		dispatch(resetTest());
	};

	return (
		<div className='finished-test-container'>
			<h1 className='title'>¡LISTO!</h1>
			<h3 className='subtitle'>Muchas gracias por completar esta prueba, los resultados ya han sido enviados</h3>
			{/* <div className='emoji'>😁</div> */}
			<Link to='/' className='button' onClick={resetTestState}>
				Volver al inicio
			</Link>
		</div>
	);
};

export default FinishedTest;
