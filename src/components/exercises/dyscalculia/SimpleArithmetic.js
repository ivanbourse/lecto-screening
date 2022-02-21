import Keyboard from 'components/exercises/dyscalculia/components/Keyboard';
import useSetAnswer from 'functions/setAnswer';

const SimpleArithmetic = ({ isResult }) => {
	const { exercise, submitAnswer } = useSetAnswer({ isResult });

	const onButtonClick = number => {
		const number1 = exercise.value[0];
		const number2 = exercise.value[4];

		submitAnswer({ answer: number, number1, number2 });
	};

	return (
		<div className='exercise simple-arithmetic-container'>
			<div className='panel'>
				<span className='number'>{exercise.value}</span>
			</div>
			<Keyboard onClick={onButtonClick} />
		</div>
	);
};

export default SimpleArithmetic;
