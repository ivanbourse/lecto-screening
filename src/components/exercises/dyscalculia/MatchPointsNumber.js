import useTest from 'utils/hooks/useTest';
import CorrectButtons from './components/CorrectButtons';
import DotsPanel from './components/DotsPanel';

const MatchPointsNumber = ({ isResult }) => {
	const { exercise, submitAnswer } = useTest({ isResult });
	const { number1, number2 } = exercise.value;

	return (
		<div className='exercise match-points-number-container'>
			<div className='panel-container'>
				<DotsPanel dots={number1} />
				<div className='panel panel-number'>
					<span className='number'>{number2}</span>
				</div>
			</div>
			<CorrectButtons onCorrect={() => submitAnswer(true)} onIncorrect={() => submitAnswer(false)} />
		</div>
	);
};

export default MatchPointsNumber;
