import React from 'react';
import { Link } from 'react-router-dom';

const FinishedTest = () => {
	return (
		<div className='finished-test-container'>
			<h1 className='title'>¡LISTO!</h1>
			<h3 className='subtitle'>Muchas gracias por completar esta prueba, los resultados ya han sido enviados</h3>
			{/* <div className='emoji'>😁</div> */}
			<Link to='/' className='button'>
				Volver al inicio
			</Link>
		</div>
	);
};

export default FinishedTest;
