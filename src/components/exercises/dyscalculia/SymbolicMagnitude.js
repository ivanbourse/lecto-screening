import useSetAnswer from 'functions/setAnswer';

const SymbolicMagnitude = ({ isResult }) => {
	const { exercise, submitAnswer } = useSetAnswer({ isResult });
	const { number1, number2 } = exercise.value;
	return (
		<div className='exercise symbolic-magnitude-container panel-container'>
			<div
				className='panel panel-number panel-hover'
				onClick={() => submitAnswer({ answer: number1, number1, number2 })}
			>
				<span className='number'>{number1}</span>
			</div>
			<div
				className='panel panel-number panel-hover'
				onClick={() => submitAnswer({ answer: number2, number1, number2 })}
			>
				<span className='number'>{number2}</span>
			</div>
		</div>
	);
};

export default SymbolicMagnitude;
