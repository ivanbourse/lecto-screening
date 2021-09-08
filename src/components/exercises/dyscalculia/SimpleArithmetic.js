import Keyboard from 'components/exercises/dyscalculia/components/Keyboard';
import useTest from 'utils/hooks/useTest';

const SimpleArithmetic = ({ isResult }) => {
	const { exercise, submitAnswer } = useTest({ isResult });
	return (
		<div className='exercise simple-arithmetic-container'>
			<div className='panel'>
				<span className='number'>{exercise.value}</span>
			</div>
			<Keyboard onClick={submitAnswer} />
		</div>
	);
};

export default SimpleArithmetic;
