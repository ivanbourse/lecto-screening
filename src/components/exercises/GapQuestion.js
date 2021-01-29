import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import ExerciseContainer from '../ExerciseContainer';

import images from '../../functions/imagesObject';
import NextButton from '../NextButton';

const GapQuestion = () => {
	const current = useSelector(state => state.questions.current);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);
	const [answer, setAnswer, setUserAnswer] = useSetAnswer();

	const [remainingTime, setRemainingTime] = useState(60);

	const input = useRef(null);

	useEffect(() => {
		const timeout = setInterval(() => setRemainingTime(prev => (prev > 0 ? --prev : 0)), 1000);
		return () => clearInterval(timeout);
	}, []);

	useEffect(() => {
		input.current.value = '';
	}, [current]);

	return (
		<ExerciseContainer classes='gap-question-container'>
			{exercise.exercise.image && <img src={images[exercise.exercise.image]} alt='' />}
			{exercise.exercise.seconds && (
				<div className='timer'>
					<p className='instruction'>Segundos restantes</p>
					<div className='number'>{remainingTime}</div>
				</div>
			)}
			<p className='instruction'>Ingresá el número de elementos que contó</p>
			<div className='number-input'>
				<div className='number'>
					<input
						ref={input}
						autoComplete='off'
						type='number'
						name='post'
						id='post'
						onChange={e => setAnswer(+e.target.value)}
					/>
				</div>
			</div>

			<NextButton setUserAnswer={setUserAnswer} answered={input?.current?.value !== ''} />
		</ExerciseContainer>
	);
};

export default GapQuestion;
