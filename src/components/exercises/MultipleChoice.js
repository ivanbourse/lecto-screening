import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ExerciseContainer from '../ExerciseContainer';

const MultipleChoice = props => {
	const [selected, setSelected] = useState(null);

	const current = useSelector(state => state.questions.current);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	useEffect(() => {
		setSelected(null);
	}, [exercise]);

	const selectOption = i => {
		setSelected(i);
	};

	return (
		<>
			{exercise && (
				<ExerciseContainer classes='multiple-choice-container' change={current}>
					<p className='instruction'>Seleccioná la opción correcta</p>
					<div className='options'>
						{exercise.exercise.answers.map((item, i) => (
							<div key='item' className={`option ${selected === i ? 'selected' : ''}`} onClick={() => selectOption(i)}>
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
