import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from 'functions/setAnswer';
import ExerciseContainer from 'components/ExerciseContainer';

import NextButton from 'components/NextButton';

const GapQuestion = () => {
	const { exercise, userAnswer, setUserAnswer, submitAnswer } = useSetAnswer();

	const [timerStarted, setTimerStarted] = useState(false);
	const [remainingTime, setRemainingTime] = useState(60);

	useEffect(() => {
		let timeout;
		if (!!timerStarted) {
			timeout = setInterval(() => setRemainingTime(prev => (prev > 0 ? --prev : 0)), 1000);
		}
		return () => clearInterval(timeout);
	}, [timerStarted]);

	useEffect(() => {
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
				<div className='counter'>
					<div
						className='number counter-button'
						onClick={() => setUserAnswer(prev => (typeof prev === 'number' ? prev - 1 : 0))}
					>
						-
					</div>

					<div className='number counter-number'>{typeof userAnswer !== 'number' ? 0 : userAnswer}</div>

					<div
						className='number counter-button'
						onClick={() => setUserAnswer(prev => (typeof prev === 'number' ? prev + 1 : 0))}
					>
						+
					</div>
				</div>
			) : (
				<div className='btn' onClick={() => setTimerStarted(true)}>
					Empezar timer
				</div>
			)}
			<NextButton setUserAnswer={submitAnswer} answered={!!userAnswer && userAnswer !== 0} />
		</ExerciseContainer>
	);
};

export default GapQuestion;
