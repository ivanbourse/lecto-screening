import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const NextButton = props => {
	const current = useSelector(state => state.questions.current);
	const [error, setError] = useState(false);

	useEffect(() => {
		setError(false);
	}, [current]);

	return (
		<div className='button-container'>
			{error && <p className='warning'>¡Tenés que completar el ejercicio para poder continuar!</p>}
			<button
				className='next-button'
				onClick={e => {
					if (props.answered === true) {
						document.activeElement.blur();
						props.setUserAnswer();
					} else {
						setError(true);
					}
				}}
			>
				¡Siguiente!
			</button>
		</div>
	);
};

export default NextButton;
