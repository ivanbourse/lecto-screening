import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from 'functions/setAnswer';
import ExerciseContainer from 'components/ExerciseContainer';

import NextButton from 'components/NextButton';
import PictogramWithSound from './components/PictogramWithSound';
import { Volume2 } from 'react-feather';

const MultipleChoice = props => {
	const { exercise, userAnswer, setUserAnswer, submitAnswer } = useSetAnswer();

	const read = text => {
		const synth = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance();

		utterance.text = text;
		utterance.rate = 1;
		synth.speak(utterance);
	};

	return (
		<>
			{exercise && (
				<ExerciseContainer classes='multiple-choice-container'>
					<div className='instruction-with-sound'>
						<div onClick={() => read(exercise.question)} className='play-icon'>
							<Volume2 size={32} color='#fff' />
						</div>
						<p className='instruction'>{exercise.question}</p>
					</div>
					<div className='options'>
						{exercise.answers.map((item, i) => (
							<div
								key={item.answer}
								className={`option ${userAnswer.i === i ? 'selected' : ''}`}
								onClick={() => setUserAnswer({ i, item })}
							>
								<div
									onClick={e => {
										e.stopPropagation();
										read(item.answer);
									}}
									className='play-icon'
								>
									<Volume2 size={32} color='#fff' />
								</div>
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
