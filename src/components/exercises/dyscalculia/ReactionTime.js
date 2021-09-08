import { useState } from 'react';
import { useEffect } from 'react';
import useTest from 'utils/hooks/useTest';

const ReactionTime = ({ isResult }) => {
	const { exercise, submitAnswer } = useTest({ customTime: true, isResult });

	const { value } = exercise;

	const [visible, setVisible] = useState(false);
	const [date, setDate] = useState(Date.now());

	useEffect(() => {
		const onKeyDown = e => {
			window.removeEventListener('keydown', onKeyDown);
			const time = Date.now() - date - value.randomDelay;
			submitAnswer({ time });
			setVisible(false);
		};

		const timeoutFn = () => {
			setVisible(true);
			window.addEventListener('keydown', onKeyDown);
			setDate(Date.now());
		};

		const timeout = setTimeout(timeoutFn, value.randomDelay);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			clearTimeout(timeout);
		};
	}, [exercise]);

	return (
		<div className='exercise reaction-time-container'>
			<div className='dot-container'>
				{visible && <div className='dot' style={{ top: value.position[0], left: value.position[1] }}></div>}
			</div>
		</div>
	);
};

export default ReactionTime;
