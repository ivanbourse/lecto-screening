import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import ExerciseContainer from '../ExerciseContainer';

const MultipleChoice = props => {
	const current = useSelector(state => state.questions.current);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [answer, setAnswer] = useSetAnswer();

	return (
		<>
			{exercise && (
				<ExerciseContainer classes='multiple-choice-container' change={current}>
					<p className='instruction'>Seleccioná la opción correcta</p>
					<div className='options'>
						{exercise.exercise.answers.map((item, i) => (
							<div key='item' className={`option ${answer === i ? 'selected' : ''}`} onClick={() => setAnswer(i)}>
								<p>{item.name}</p>
							</div>
						))}
					</div>
				</ExerciseContainer>
			)}
		</>
	);
};

export default MultipleChoice;
