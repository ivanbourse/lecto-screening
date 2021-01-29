import React, { useEffect } from 'react';
import { loadQuestions, resetTest } from '../redux/slices/questions';
import { useDispatch, useSelector } from 'react-redux';

import CountItems from '../components/exercises/CountItems';
import PrevPostNumber from '../components/exercises/PrevPostNumber';
import JoinWithArrows from '../components/exercises/JoinWithArrows';
import SplitSyllables from '../components/exercises/SplitSyllables';
import MultipleChoice from '../components/exercises/MultipleChoice';
import SayTheLetters from '../components/exercises/SayTheLetters';
import GapQuestion from '../components/exercises/GapQuestion';

import MotionAnimation from '../components/MotionAnimation';

import { useHistory } from 'react-router';
import ManualIcon from '../components/ManualIcon';

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
		dispatch(resetTest());
		dispatch(loadQuestions());

		window.onbeforeunload = confirmExit;
		function confirmExit() {
			return 'show warning';
		}
	}, []);

	useEffect(() => {
		if (finished === true) {
			window.onbeforeunload = null;
			history.push('/finished-test');
		}
	}, [finished]);

	return (
		<div className='test-container'>
			<>
				<MotionAnimation />
				<header className='test-header'>
					<h2 className='title'>{finished !== true && status === 'succeeded' && questions[current].instructions[0]}</h2>
				</header>
				{status === 'succeeded' && (
					<>
						{exercises[questions[current].type]}
						<ManualIcon classes='absolute' />
					</>
				)}
			</>
		</div>
	);
};

export default Test;
