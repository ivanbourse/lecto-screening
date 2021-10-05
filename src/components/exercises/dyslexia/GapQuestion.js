import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from 'functions/setAnswer';
import ExerciseContainer from 'components/ExerciseContainer';

import NextButton from 'components/NextButton';

const GapQuestion = () => {
	const { exercise, userAnswer, setUserAnswer, submitAnswer } = useSetAnswer();

	const [timerStarted, setTimerStarted] = useState(false);
	const [remainingTime, setRemainingTime] = useState(60);

	const input = useRef(null);

	useEffect(() => {
		let timeout;
		if (!!timerStarted) {
			timeout = setInterval(() => setRemainingTime(prev => (prev > 0 ? --prev : 0)), 1000);
		}
		return () => clearInterval(timeout);
	}, [timerStarted]);

	useEffect(() => {
		if (input.current) input.current.value = '';
		setTimerStarted(false);
		setRemainingTime(60);
	}, [exercise]);

	return (
		<ExerciseContainer classes='gap-question-container'>
			<div className='timer'>
				<p className='instruction'>Segundos restantes</p>
				<div className='number'>{remainingTime}</div>
			</div>
			<p className='instruction'>Ingresá el número de elementos que contó</p>

			{timerStarted ? (
				<div className='number-input'>
					<div className='number'>
						<input
							ref={input}
							autoComplete='off'
							type='number'
							name='post'
							id='post'
							onChange={e => setUserAnswer(+e.target.value)}
						/>
					</div>
				</div>
			) : (
				<div className='btn' onClick={() => setTimerStarted(true)}>
					Empezar timer
				</div>
			)}
			<NextButton setUserAnswer={submitAnswer} answered={input?.current?.value !== ''} />
		</ExerciseContainer>
	);
};

export default GapQuestion;
