import Button from 'components/global/Button';
import { useDispatch } from 'react-redux';
import { setAnswer } from 'redux/slices/questions';
import useTest from 'utils/hooks/useTest';

const ExerciseInstructions = ({ practiceFinish }) => {
	const { exercise } = useTest();

	const dispatch = useDispatch();

	const startPractice = () => {
		dispatch(setAnswer());
	};

	return (
		<div className={`exercise-instructions-container ${practiceFinish ? 'practice-finish-container' : ''}`}>
			<h1 className='title'>
				{practiceFinish ? '¡Ya terminaron los ítems de prueba! ¿Estás listo para arrancar?' : exercise.title}
			</h1>
			{!practiceFinish && <div className='line'></div>}
			{!practiceFinish && (
				<div className='texts'>
					{exercise.instructions.map(question => (
						<p className='text' key={question}>
							{question}
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
