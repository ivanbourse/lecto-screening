import React, { useEffect } from 'react';
import { loadQuestions, nextQuestion } from '../redux/slices/questions';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import CountItems from '../components/exercises/CountItems';
import PrevPostNumber from '../components/exercises/PrevPostNumber';
import JoinWithArrows from '../components/exercises/JoinWithArrows';
import SplitSyllables from '../components/exercises/SplitSyllables';
import MultipleChoice from '../components/exercises/MultipleChoice';
import SayTheLetters from '../components/exercises/SayTheLetters';
import GapQuestion from '../components/exercises/GapQuestion';

const exercises = {
	counting: <CountItems />,
	'gap-question': <GapQuestion />,
	'multiple-choice': <MultipleChoice />,
	'prev-next': <PrevPostNumber />,
	'letters-question': <SayTheLetters />,
	matching: <JoinWithArrows />,
	syllables: <SplitSyllables />,
	'read-alloud': <SayTheLetters />,
};

const Test = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const questions = useSelector(state => state.questions.questions);
	const current = useSelector(state => state.questions.current);
	const finished = useSelector(state => state.questions.finished);
	const status = useSelector(state => state.questions.status);

	useEffect(() => {
		dispatch(loadQuestions());

		console.log(questions);

		window.onbeforeunload = confirmExit;
		function confirmExit() {
			return 'show warning';
		}
	}, []);

	return (
		<div className='test-container'>
			<>
				<header className='test-header'>
					<h2 className='title'>
						{/*exercisesInfo[questionId].title || testQuestions[currentQuestion].exercise.title*/}
					</h2>
				</header>

				{status === 'succeeded' && exercises[questions[current].type]}

				{/*pressed && !currentAnswer.ableToContinue && (
					<p className='warning'>¡Tenés que completar el ejercicio para poder continuar!</p>
				)*/}

				<button className='next-button' onClick={() => dispatch(nextQuestion())}>
					¡Siguiente!
				</button>
			</>
		</div>
	);
};

export default Test;
