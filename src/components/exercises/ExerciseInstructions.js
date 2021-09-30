import Button from 'components/global/Button';
import useSetAnswer from 'functions/setAnswer';
import { Play } from 'react-feather';
import { useDispatch } from 'react-redux';
import { setAnswer } from 'redux/slices/questions';

const ExerciseInstructions = ({ practiceFinish }) => {
	const { exercise } = useSetAnswer();

	const dispatch = useDispatch();

	const startPractice = () => {
		dispatch(setAnswer());
	};

	const read = isPracticeFinish => {
		const synth = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance();

		let text = '';

		if (isPracticeFinish) text = '¡Ya terminaron los ítems de prueba! ¿Estás listo para arrancar?';
		else {
			text += exercise.title;
			exercise.instructions.forEach(i => (text += '\n' + i));
		}

		utterance.text = text;
		utterance.rate = 1.2;
		synth.speak(utterance);
	};

	return (
		<div className={`exercise-instructions-container ${practiceFinish ? 'practice-finish-container' : ''}`}>
			<div onClick={() => read(practiceFinish)} className='play-icon'>
				<Play size={24} color='#fff' />
			</div>
			<h1 className='title'>
				{practiceFinish ? '¡Ya terminaron los ítems de prueba! ¿Estás listo para arrancar?' : exercise.title}
			</h1>
			{!practiceFinish && <div className='line'></div>}
			{!practiceFinish && (
				<div className='texts'>
					{exercise.instructions.map(instruction => (
						<p className='text' key={instruction}>
							{instruction}
						</p>
					))}
				</div>
			)}
			<Button className='btn btn-primary' onClick={startPractice}>
				Comenzar
			</Button>
		</div>
	);
};

export default ExerciseInstructions;
