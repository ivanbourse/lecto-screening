import useTest from 'utils/hooks/useTest';
import DotsPanel from './components/DotsPanel';

const DotsComparison = ({ isResult }) => {
	const { exercise, submitAnswer } = useTest({ isResult });
	const { number1, number2 } = exercise.value;

	return (
		<div className='exercise panel-container'>
			<DotsPanel className='panel-hover' dots={number1} onClick={() => submitAnswer(number1)} />
			<DotsPanel className='panel-hover' dots={number2} onClick={() => submitAnswer(number2)} />
		</div>
	);
};

export default DotsComparison;
