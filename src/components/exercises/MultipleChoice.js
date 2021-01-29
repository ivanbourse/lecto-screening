import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import ExerciseContainer from '../ExerciseContainer';

import images from '../../functions/imagesObject';
import NextButton from '../NextButton';

const MultipleChoice = props => {
	const current = useSelector(state => state.questions.current);
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [answer, setAnswer, setUserAnswer] = useSetAnswer();

	useEffect(() => {
		console.log();
	}, [current, answer]);

	return (
		<>
			{exercise && (
				<ExerciseContainer classes='multiple-choice-container' change={current}>
					<p className='instruction'>{exercise.exercise?.question}</p>
					{exercise.exercise.image && <img src={images[exercise.exercise.image]} alt='' />}
					<div className='options'>
						{exercise.exercise.answers.map((item, i) => (
							<div
								key={item.name}
								className={`option ${answer.i === i ? 'selected' : ''}`}
								onClick={() => setAnswer({ i, item })}
							>
								<p>{item.name}</p>
							</div>
						))}
					</div>
					<NextButton setUserAnswer={setUserAnswer} answered={Object.keys(answer).length !== 0} />
				</ExerciseContainer>
			)}
		</>
	);
};

export default MultipleChoice;
