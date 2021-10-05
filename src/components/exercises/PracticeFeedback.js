import Button from 'components/global/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from 'redux/slices/questions';

import happyFace from 'assets/emojis/happy-face.png';
import sadFace from 'assets/emojis/sad-face.png';

const PracticeFeedback = () => {
	const { current, answers } = useSelector(state => state.questions);
	const dispatch = useDispatch();
	const isCorrect = !!answers[current - 1]?.answer?.correct?.isCorrect;

	return (
		<div className='exercise-instructions-container'>
			<h1 className='title'>{isCorrect ? '¡Bien hecho!' : 'Respuesta incorrecta'}</h1>
			{isCorrect ? (
				<img className='emoji' src={happyFace} alt='¡Bien hecho!' />
			) : (
				<img className='emoji' src={sadFace} alt='Respuesta incorrecta' />
			)}
			<Button className='btn btn-primary' onClick={() => dispatch(setAnswer({ sendAnswers: false }))}>
				Comenzar
			</Button>
		</div>
	);
};

export default PracticeFeedback;
