import React, { useEffect, useRef } from 'react';
import ExerciseContainer from '../ExerciseContainer';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import NextButton from '../NextButton';

const PrevPostNumber = props => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	const current = useSelector(state => state.questions.current);

	const prevInput = useRef(null);
	const postInput = useRef(null);

	const [answer, setAnswer, setUserAnswer] = useSetAnswer();

	useEffect(() => {
		prevInput.current.value = '';
		postInput.current.value = '';
	}, [current]);

	return (
		<ExerciseContainer classes='prev-post-container'>
			<p className='instruction'>{exercise.instructions[0]}</p>
			<div className='numbers'>
				<div className='number-input'>
					<div className='number'>
						<input
							ref={prevInput}
							autoComplete='off'
							type='number'
							name='prev'
							id='prev'
							onChange={e => setAnswer(value => ({ ...value, previous: +e.target.value }))}
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
							ref={postInput}
							autoComplete='off'
							type='number'
							name='post'
							id='post'
							onChange={e => setAnswer(value => ({ ...value, posterior: +e.target.value }))}
						/>
					</div>
					<label htmlFor='post' className='label'>
						Posterior
					</label>
				</div>
			</div>
			<NextButton setUserAnswer={setUserAnswer} answered={Object.keys(answer).length === 2} />
		</ExerciseContainer>
	);
};

export default PrevPostNumber;
