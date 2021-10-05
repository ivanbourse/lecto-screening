import React, { useEffect } from 'react';
import { finishTest, resetTest } from '../redux/slices/questions';
import { useDispatch, useSelector } from 'react-redux';

import MotionAnimation from '../components/MotionAnimation';

import { useHistory } from 'react-router';
import { screenTypesComponentsMap, testTypesComponentsMap } from 'utils/testMaps';

const Test = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const questions = useSelector(state => state.questions.questions);
	const testType = useSelector(state => state.questions.type);
	const current = useSelector(state => state.questions.current);
	const finished = useSelector(state => state.questions.finished);
	const started = useSelector(state => state.questions.started);

	useEffect(() => {
		dispatch(resetTest());

		window.onbeforeunload = confirmExit;
		function confirmExit() {
			return 'show warning';
		}

		return () => {
			window.onbeforeunload = null;
		};
	}, []);

	useEffect(() => {
		async function finishTestRedux() {
			await dispatch(finishTest());
			history.push('/finished-test');
		}

		if (finished === true) {
			window.onbeforeunload = null;
			finishTestRedux();
		}
	}, [finished]);

	return (
		<div className='test-container'>
			<>
				<MotionAnimation />
				{/* <header className='test-header'>
					<h2 className='title'>{finished !== true && started && questions[current].instructions[0]}</h2>
				</header>
				{started && (
					<>
						{exercises[questions[current].type]}
						{!questions[current].autocorrect && <ManualIcon classes='absolute' />}
					</>
				)} */}
			</>
			{questions[current] && screenTypesComponentsMap[questions[current].screenType]()}
		</div>
	);
};

export default Test;
