import React, { useEffect, useState } from 'react';
import ExerciseContainer from '../ExerciseContainer';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';

const PrevPostNumber = props => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [answer, setAnswer] = useSetAnswer();
	/* useEffect(() => {
		if (numbers.before && numbers.after) {
			const correctPrevAndPost = { ...exercise };
			delete correctPrevAndPost.number;
			const correct = Object.entries(exercise).every(([key, value]) => numbers[key] === value);
			console.log({ correct, exercise, numbers });
		} else {
			console.log('nosepuede');
		}
	}, [numbers]); */

	return (
		<ExerciseContainer classes='prev-post-container'>
			<p className='instruction'>{exercise.instructions[0]}</p>
			<div className='numbers'>
				<div className='number-input'>
					<div className='number'>
						<input
							autoComplete='off'
							type='number'
							name='prev'
							id='prev'
							onChange={e => setAnswer(value => ({ ...value, before: +e.target.value }))}
						/>
					</div>
					<label htmlFor='prev' className='label'>
						Anterior
					</label>
				</div>
				<div className='number'>{exercise.exercise.number}</div>
				<div className='number-input'>
					<div className='number'>
						<input
							autoComplete='off'
							type='number'
							name='post'
							id='post'
							onChange={e => setAnswer(value => ({ ...value, after: +e.target.value }))}
						/>
					</div>
					<label htmlFor='post' className='label'>
						Posterior
					</label>
				</div>
			</div>
		</ExerciseContainer>
	);
};

export default PrevPostNumber;
