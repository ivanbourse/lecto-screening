import React from 'react';
import ExerciseContainer from '../ExerciseContainer';

const GapQuestion = () => {
	return (
		<ExerciseContainer classes='gap-question-container'>
			<p className='instruction'>Contá desde el 1 hasta el número que vos sepas en voz alta</p>
		</ExerciseContainer>
	);
};

export default GapQuestion;
