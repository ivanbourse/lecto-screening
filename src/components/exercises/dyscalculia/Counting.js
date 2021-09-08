import useTest from 'utils/hooks/useTest';
import Keyboard from './components/Keyboard';

const Counting = ({ isResult }) => {
	const { exercise, submitAnswer } = useTest({ isResult });
	const { values } = exercise;

	return (
		<>
			<div className='panel-container counting-container'>
				<div className='panel'>
					<span className='number'>{values[0]}</span>
				</div>
				<div className='panel'>
					<span className='number'>{values[1]}</span>
				</div>
				<div className='panel'>
					<span className='number'>?</span>
				</div>
			</div>
			<Keyboard onClick={submitAnswer} />
		</>
	);
};

export default Counting;
