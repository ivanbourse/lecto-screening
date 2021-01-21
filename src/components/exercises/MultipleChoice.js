import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ExerciseContainer from '../ExerciseContainer';

const MultipleChoice = props => {
	const [selected, setSelected] = useState(null);

	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	useEffect(() => {
		setSelected(null);
	}, [exercise]);

	const selectOption = i => {
		setSelected(i);
	};

	return (
		<ExerciseContainer classes='multiple-choice-container'>
			<p className='instruction'>Seleccioná la opción correcta</p>
			<div className='options'>
				{exercise.exercise.answers.map((item, i) => (
					<div key='item' className={`option ${selected === i ? 'selected' : ''}`} onClick={() => selectOption(i)}>
						<p>{item.name}</p>
					</div>
				))}
			</div>
		</ExerciseContainer>
	);
};

export default MultipleChoice;
