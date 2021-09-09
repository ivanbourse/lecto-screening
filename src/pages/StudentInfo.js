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

const ExerciseResultsComponent = ({ type }) => {
	const dispatch = useDispatch();

	const { questions, testType } = useSelector(state => state.questions);

	const { exerciseResults } = useSelector(state => state.dashboard);

	console.log({ testType, exerciseResults });
	const exercises = exerciseResults[testType][type];

	const exercisesAmounts = {
		total: exercises.length,
		correct: exercises.filter(item => item.correct.isCorrect).length,
		incorrect: exercises.filter(item => !item.correct.isCorrect).length,
	};

	const percentages = {
		correct: (exercisesAmounts.correct / exercisesAmounts.total) * 100 + '%',
		incorrect: (exercisesAmounts.incorrect / exercisesAmounts.total) * 100 + '%',
	};

	const averageAnswerTime = getAverageAnswerTime(exercises);

	const openPopup = index => {
		const exercise = questions.filter(item => item.type === type && item.screenType === 'exercise')[index];
		dispatch(setPopupOpen(true));
		dispatch(setExercise(exercise));
	};

	return (
		<div className='exercise-result-container'>
			<div className='labels'>
				<p className='total-label'>
					Total: <span>{exercisesAmounts.total}</span>
				</p>
				<p className='correct-label'>
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
				</p>
			</div>
			<div className='result-icons-container'>
				{exercises.map((item, i) => {
					return (
						<div className='result-icon' onClick={() => openPopup(i)} key={item.type + ' ' + i}>
							<img
								src={item.correct.isCorrect ? correctIcon : incorrectIcon}
								data-tip
								data-for={`${type} ${Date.now} ${i}`}
								alt='icon'
							/>
							<ReactTooltip id={`${type} ${Date.now} ${i}`} type='dark' effect='solid' className='tooltip'>
								{type === 'match-points-number' ? (
									<>
										<p>Respuesta ingresada: {item.answer === true ? 'verdadero' : 'falso'}</p>
										<p>Respuesta correcta: {item.correct.value === true ? 'verdadero' : 'falso'}</p>
									</>
								) : (
									<>
										{type !== 'reaction-time' && (
											<>
												<p>Respuesta ingresada: {item.answer}</p>
												<p>Respuesta correcta: {item.correct.value}</p>
											</>
										)}
									</>
								)}
								<p>Tiempo tardado: {item.time / 1000} segundos</p>
							</ReactTooltip>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Exercise = () => {
	const { exercise, testType } = useSelector(state => state.questions);

	return <div className='exercise-screen'>{exercise && testTypesComponentsMap[testType][exercise.type](true)}</div>;
};

const StudentInfo = props => {
	const { user } = useSelector(state => state.dashboard);
	const { student, results, loading } = useSelector(state => state.student);
	const urlId = props.match.params.studentId;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStudentInfo(urlId));
	}, []);

	const logOut = () => {
		dispatch(signOut());
		history.push('/');
	};

	const { answers, testType } = useSelector(state => state.questions);

	const { popupOpen, exerciseResults } = useSelector(state => state.dashboard);

	const updateResults = () => {
		const allAnswers = answers && answers.filter(answer => answer.saveValue === true);
		const temp = { ...exerciseResults };

		console.log({ temp, answers });

		for (let i = 0; i < allAnswers.length; i++) {
			const exercise = allAnswers[i];
			/* temp[exercise.exerciseType] = [...temp[exercise.exerciseType], exercise.answer]; */
			dispatch(
				addExerciseToResults({ type: exercise?.exerciseType || exercise?.type, result: exercise.answer, testType })
			);
		}
	};

	useEffect(() => {
		updateResults();
	}, [answers]);

	const closePopup = () => {
		dispatch(setPopupOpen(false));
		dispatch(setExercise({}));
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
										<span className='info'>{student.birth?.year}</span>
									</div>
									<div className='item'>
										<span className='label'>Mes de nacimiento</span>:{' '}
										<span className='info'>{student.birth?.month}</span>
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
										<span className='info'>{results.length}</span>
									</div>
								</div>
							</div>
						</div>
						<div className='container'>
							<h2 className='subtitle'>Resultados de {student.alias}:</h2>
							<div className='info-container'>
								<Accordion
									items={[
										{
											title: 'Conocimiento alfabético',
											component: () => <ExerciseResultsComponent type='letters-question' />,
										},
										{
											title: 'Conciencia fonética: discriminación del sonido',
											component: () => <ExerciseResultsComponent type='matching' />,
										},
										{
											title: 'Conciencia fonética: discriminación de fonema',
											component: () => <ExerciseResultsComponent type='contains-letter' />,
										},
										{
											title: 'Conciencia silábica: separar en sílabas',
											component: () => <ExerciseResultsComponent type='syllables' />,
										},
										{
											title: 'Vocabulario: adivinanzas',
											component: () => <ExerciseResultsComponent type='multiple-choice' />,
										},
										{
											title: 'Fluidez verbal: acceso al léxico',
											component: () => <ExerciseResultsComponent type='say-items' />,
										},
										{
											title: 'Lectura de palabras',
											component: () => <ExerciseResultsComponent type='match-words' />,
										},
										{
											title: 'Lectura de pseudopalabras',
											component: () => <ExerciseResultsComponent type='nonexisting-words' />,
										},
									]}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default StudentInfo;
