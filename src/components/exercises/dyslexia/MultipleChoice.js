import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from 'functions/setAnswer';
import ExerciseContainer from 'components/ExerciseContainer';

import NextButton from 'components/NextButton';
import PictogramWithSound from './components/PictogramWithSound';

const MultipleChoice = props => {
	const { exercise, userAnswer, setUserAnswer, submitAnswer } = useSetAnswer();

	return (
		<>
			{exercise && (
				<ExerciseContainer classes='multiple-choice-container'>
					<p className='instruction'>{exercise.question}</p>
					<div className='options'>
						{exercise.answers.map((item, i) => (
							<div
								key={item.answer}
								className={`option ${userAnswer.i === i ? 'selected' : ''}`}
								onClick={() => setUserAnswer({ i, item })}
							>
								<p>{item.answer}</p>
							</div>
						))}
					</div>

					<NextButton setUserAnswer={submitAnswer} answered={Object.keys(userAnswer).length !== 0} />
				</ExerciseContainer>
			)}
		</>
	);
};

export default MultipleChoice;
