import Keyboard from 'components/exercises/dyscalculia/components/Keyboard';
import useSetAnswer from 'functions/setAnswer';

const SimpleArithmetic = ({ isResult }) => {
	const { exercise, submitAnswer } = useSetAnswer({ isResult });
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
