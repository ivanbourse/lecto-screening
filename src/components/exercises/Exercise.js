import { useSelector } from 'react-redux';
import { testTypesComponentsMap } from 'utils/testMaps';

const Exercise = ({ isResult }) => {
	const { current, questions, testType } = useSelector(state => state.questions);
	const currentQuestion = questions[current];

	return <div className='exercise-container'>{testTypesComponentsMap[testType][currentQuestion.type](false)}</div>;
};

export default Exercise;
