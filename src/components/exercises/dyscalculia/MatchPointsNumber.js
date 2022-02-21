import useSetAnswer from 'functions/setAnswer';
import CorrectButtons from './components/CorrectButtons';
import DotsPanel from './components/DotsPanel';

const MatchPointsNumber = ({ isResult }) => {
	const { exercise, submitAnswer } = useSetAnswer({ isResult });
	const { number1, number2 } = exercise.value;

	return (
		<div className='exercise match-points-number-container'>
			<div className='panel-container'>
				<DotsPanel dots={number1} />
				<div className='panel panel-number'>
					<span className='number'>{number2}</span>
				</div>
			</div>
			<CorrectButtons
				onCorrect={() => submitAnswer({ answer: true, number1, number2 })}
				onIncorrect={() => submitAnswer({ answer: false, number1, number2 })}
			/>
		</div>
	);
};

export default MatchPointsNumber;
