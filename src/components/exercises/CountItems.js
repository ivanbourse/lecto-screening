import React from 'react';
import { useSelector } from 'react-redux';
import ExerciseContainer from '../ExerciseContainer';
import useSetAnswer from '../../functions/setAnswer';

const CountItems = () => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [answer, setAnswer] = useSetAnswer();

	return (
		<ExerciseContainer classes='count-items-container '>
			<div className='images'>
				{Array(exercise.exercise.count)
					.fill(0)
					.map((item, i) => (
						<img className='count-image' src='https://picsum.photos/500' alt='' />
					))}
			</div>
			<p className='instruction'>{exercise.instructions[0]}</p>
			<div className='numbers'>
				{Array(9)
					.fill(0)
					.map((item, i) => (
						<div key={i} className={`number ${answer === i ? 'selected' : ''}`} onClick={() => setAnswer(i)}>
							{i + 1}
						</div>
					))}
			</div>
		</ExerciseContainer>
	);
};

export default CountItems;
