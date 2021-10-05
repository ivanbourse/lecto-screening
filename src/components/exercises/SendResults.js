import LoadingScreen from 'components/LoadingScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendAnswers, setAnswer } from 'redux/slices/questions';

const SendResults = () => {
	const dispatch = useDispatch();
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	useEffect(() => {
		async function send() {
			await dispatch(sendAnswers({ type: exercise.type, uid: exercise.uid || null }));
			dispatch(setAnswer());
		}
		send();
	}, []);

	return <LoadingScreen loading />;
};

export default SendResults;
