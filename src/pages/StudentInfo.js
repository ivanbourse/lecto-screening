import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { testTypesComponentsMap } from 'utils/testMaps';
import LoadingScreen from '../components/LoadingScreen';
import { history } from '../components/Router';
import { stateToWords, textForTypeOfExercise } from '../functions/answerResults';
import { getStudentInfo } from '../redux/slices/student';
import { signOut } from '../redux/slices/user';

import incorrectIcon from 'assets/icons/incorrect.svg';
import correctIcon from 'assets/icons/correct.svg';

import { addExerciseToResults, setExercise, setExerciseResults, setPopupOpen } from 'redux/slices/dashboard';
import Accordion from 'components/global/Accordion';

const getAverageAnswerTime = exercises => {
	const allAnswerTimes = exercises.map(item => item.time || item.answer.time);

	const average = allAnswerTimes.reduce(function (avg, value, _, { length }) {
		return avg + value / length;
	}, 0);

	const averageInSeconds = average / 1000;

	return averageInSeconds.toFixed(2);
};

const ExerciseResultsComponent = ({ type, exercises }) => {
	const typeExercises = exercises[type];

	const exercisesAmounts = {
		total: typeExercises.answer.length,
		correct: typeExercises.answer.filter(item => item?.answer?.correct?.isCorrect).length,
		incorrect: typeExercises.answer.filter(item => !item?.answer?.correct?.isCorrect).length,
	};

	useEffect(() => {
		typeExercises.answer.forEach(item => {
			console.log(item);
		});
	}, []);

	return (
		<div className='exercise-result-container'>
			<div className='labels'>
				<p className='total-label'>
					Puntaje: <span>{typeExercises.score}</span>
				</p>
				{/* <p className='correct-label'>
					Correctas:{' '}
					<span>
						<b>{exercisesAmounts.correct}</b> ({percentages.correct})
					</span>
				</p>
				<p className='incorrect-label'>
					Incorrectas:{' '}
					<span>
						<b>{exercisesAmounts.incorrect}</b> ({percentages.incorrect})
					</span>
				</p>
				<p className='average-time-label'>
					Tiempo de respuesta promedio: <span>{averageAnswerTime}s</span>
				</p> */}
			</div>
			<div className='result-icons-container'>{JSON.stringify(typeExercises, null, 2)}</div>
		</div>
	);
};

const exercisesToShowPerType = {
	Dislexia: exercises => [
		{
			title: 'Conocimiento alfabético - Nombre',
			component: () => <ExerciseResultsComponent type='letters-question-name' exercises={exercises} />,
		},
		{
			title: 'Conocimiento alfabético - Sonido',
			component: () => <ExerciseResultsComponent type='letters-question-sound' exercises={exercises} />,
		},
		{
			title: 'Conciencia fonética: discriminación del sonido',
			component: () => <ExerciseResultsComponent type='matching' exercises={exercises} />,
		},
		{
			title: 'Conciencia fonética: discriminación de fonema',
			component: () => <ExerciseResultsComponent type='contains-letter' exercises={exercises} />,
		},
		{
			title: 'Conciencia silábica: separar en sílabas',
			component: () => <ExerciseResultsComponent type='syllables' exercises={exercises} />,
		},
		{
			title: 'Vocabulario: adivinanzas',
			component: () => <ExerciseResultsComponent type='multiple-choice' exercises={exercises} />,
		},
		{
			title: 'Fluidez verbal: acceso al léxico',
			component: () => <ExerciseResultsComponent type='say-items' exercises={exercises} />,
		},
		{
			title: 'Lectura de palabras',
			component: () => <ExerciseResultsComponent type='match-words' exercises={exercises} />,
		},
		{
			title: 'Lectura de pseudopalabras',
			component: () => <ExerciseResultsComponent type='nonexisting-words' exercises={exercises} />,
		},
	],
	Discalculia: exercises => [],
};

const Exercise = () => {
	const { exercise, testType } = useSelector(state => state.questions);

	return <div className='exercise-screen'>{exercise && testTypesComponentsMap[testType][exercise.type](true)}</div>;
};

const StudentInfo = props => {
	const { student, loading } = useSelector(state => state.student);
	const urlId = props.match.params.studentId;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStudentInfo(urlId));
	}, []);

	const logOut = () => {
		dispatch(signOut());
		history.push('/');
	};

	return (
		<>
			<LoadingScreen loading={loading} />
			{student && !loading && (
				<div className='student-info-container'>
					<header className='dashboard-header'>
						<div></div>
						<ul>
							{/* <li>Editar perfil</li> */}
							<li onClick={logOut}>Cerrar sesión</li>
						</ul>
					</header>
					<div className='dashboard-container'>
						<div className='container'>
							<h2 className='subtitle'>Información de {student.alias}:</h2>
							<div className='info-container'>
								<div className='col'>
									<div className='item'>
										<span className='label'>Año de nacimiento</span>:{' '}
										<span className='info'>{new Date(student.birth).getFullYear()}</span>
									</div>
									<div className='item'>
										<span className='label'>Mes de nacimiento</span>:{' '}
										<span className='info'>{new Date(student.birth).getMonth()}</span>
									</div>
									<div className='item'>
										<span className='label'>Género</span>: <span className='info'>{student.genre}</span>
									</div>
								</div>
								<div className='divider'></div>
								<div className='col'>
									<div className='item'>
										<span className='label'>Provincia</span>: <span className='info'>{student.province}</span>
									</div>
									<div className='item'>
										<span className='label'>Localidad</span>: <span className='info'>{student.locality}</span>
									</div>
									<div className='item'>
										<span className='label'>Gestión de escuela</span>:{' '}
										<span className='info'>{student.schoolType}</span>
									</div>
								</div>
								<div className='divider'></div>
								<div className='col'>
									<div className='item'>
										<span className='label'>Nivel educativo de los padres</span>:{' '}
										<span className='info'>{student.parentsLevel || 'No especificado'}</span>
									</div>
									<div className='item'>
										<span className='label'>Mano hábil</span>:{' '}
										<span className='info'>{student.hand || 'No especificado'}</span>
									</div>
									<div className='item'>
										<span className='label'>Cantidad de tests realizados</span>:{' '}
										<span className='info'>{(student.results && student.results.length) || 0}</span>
									</div>
								</div>
							</div>
						</div>
						{/* <div className='container'>
							<h2 className='subtitle'>Resultados de {student.alias}:</h2>
							<div className='info-container'>
								<div className='col'>
									{student.results &&
										student.results.length > 0 &&
										student.results
											.filter(r => r.finished && r.answers)
											.map(result => (
												<div className='result-container' key={result._id}>
													{result.testType} {result._id}
													<Accordion items={exercisesToShowPerType[result.testType](result.answers)} />
												</div>
											))}
								</div>
							</div>
						</div> */}
					</div>
				</div>
			)}
		</>
	);
};

export default StudentInfo;
