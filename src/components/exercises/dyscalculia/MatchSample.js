import { useEffect, useState } from 'react';
import useTest from 'utils/hooks/useTest';
import CorrectButtons from './components/CorrectButtons';
import DotsPanel from './components/DotsPanel';

const MatchSample = ({ isResult }) => {
	const { exercise, submitAnswer } = useTest({ customTime: true, isResult });

	const { number1, number2 } = exercise.value;

	const [firstPanelVisible, setFirstPanelVisible] = useState(true);
	const [secondPanelVisible, setSecondPanelVisible] = useState(false);

	const [time, setTime] = useState(Date.now());

	useEffect(() => {
		if (!isResult) {
			let firstTimeout;
			let secondTimeout;

			firstTimeout = setTimeout(() => {
				setFirstPanelVisible(false);
				secondTimeout = setTimeout(() => {
					setSecondPanelVisible(true);
					setTime(Date.now());
				}, 1000);
			}, 1000);
		}
		/* return () => {
			clearTimeout(firstTimeout);
			clearTimeout(secondTimeout);
		}; */
	}, [exercise]);

	const reset = () => {
		setFirstPanelVisible(true);
		setSecondPanelVisible(false);
	};

	return (
		<div className='exercise match-sample-container'>
			{(firstPanelVisible || isResult === true) && <DotsPanel dots={number1} />}
			{(secondPanelVisible || isResult === true) && (
				<>
					<DotsPanel dots={number2} />

					<CorrectButtons
						onCorrect={() => {
							submitAnswer({ time, answer: true });
							reset();
						}}
						onIncorrect={() => {
							submitAnswer({ time, answer: false });
							reset();
						}}
					/>
				</>
			)}
		</div>
	);
};

export default MatchSample;
