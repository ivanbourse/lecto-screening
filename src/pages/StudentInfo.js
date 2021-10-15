import React, { useEffect, useState } from 'react';
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

import HighchartsReact from 'highcharts-react-official';
import bellcurve from 'highcharts/modules/histogram-bellcurve';
import Highcharts from 'highcharts';
import NormalDistribution from 'normal-distribution';

bellcurve(Highcharts);
// https://benmccormick.org/2017/05/11/building-normal-curves-highcharts/ https://www.highcharts.com/docs/chart-and-series-types/bell-curve-series https://codepen.io/pen/?editors=1010 https://api.highcharts.com/highcharts/plotOptions.bellcurve https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bellcurve/

const generatePoints = (mean, stdDev) => {
	let min = mean - (5 * stdDev);
	let max = mean + (5 * stdDev);
	let unit = (max - min) / 100;

	if (unit === 0) return [mean];

	var ans = [];
	for (let i = min; i <= max; i += unit)
		ans.push(i);
	return ans;
}

const pointsInInterval = 5;

const getAverageAnswerTime = exercises => {
	const allAnswerTimes = exercises.map(item => item.time || item.answer.time);

	const average = allAnswerTimes.reduce(function (avg, value, _, { length }) {
		return avg + value / length;
	}, 0);

	const averageInSeconds = average / 1000;

	return averageInSeconds.toFixed(2);
};

const data = [1.3, 2.1];

function normalDensity(x, mean, standardDeviation) {
	var translation = x - mean;
	return (
		Math.exp(-(translation * translation) / (2 * standardDeviation * standardDeviation)) /
		(standardDeviation * Math.sqrt(2 * Math.PI))
	);
}

const ExerciseResultsComponentDyslexia = ({ type, exercises }) => {

	const typeExercises = exercises.answers[type];
	const stats = Object.values(exercises).find(val => val._id === type);
	const points = generatePoints(stats.mediana, stats.desvioEstandar)
	const seriesData = points.map(x => normalDensity(x, stats.mediana, stats.desvioEstandar));

	const [config, setConfig] = useState({
		title: {
			text: 'Bell curve',
		},

		legend: {
			enabled: false,
		},

		chart: {
			events: {
				load: function () {
					Highcharts.each(this.series[0].data, function (point, i) {
						var labels = ['4σ', '3σ', '2σ', 'σ', 'μ', 'σ', '2σ', '3σ', '4σ'];
						if (i % pointsInInterval === 0) {
							point.update({
								color: 'black',
								dataLabels: {
									enabled: true,
									format: labels[Math.floor(i / pointsInInterval)],
									overflow: 'none',
									crop: false,
									y: -2,
									style: {
										fontSize: '13px'
									}
								}
							});
						}
					});
				}
			},
		},


		xAxis: [{
			title: {
				text: 'Data'
			},
			alignTicks: false
		}, {
			title: {
				text: 'Bell curve'
			},
			alignTicks: false,
			opposite: true
		}],

		yAxis: [{
			title: { text: 'Data' }
		}, {
			title: { text: 'Bell curve' },
			opposite: true
		}],

		series: [
			{
				name: 'Bell curve',
				type: 'bellcurve',
				xAxis: 1,
				yAxis: 1,
				baseSeries: 1,
				intervals: 4,
				pointsInInterval: pointsInInterval,
				zIndex: -1,
				marker: {
					enabled: false,
				},
			},
			{
				name: 'Data',
				type: 'scatter',
				data: seriesData,
				visible: false,
				accessibility: {
					exposeAsGroupOnly: true,
				},
				marker: {
					radius: 1.5,
				},
			},
		],
	});

	const exercisesAmounts = {
		total: typeExercises.answer.length,
		correct: typeExercises.answer.filter(item => item?.answer?.correct?.isCorrect).length,
		incorrect: typeExercises.answer.filter(item => !item?.answer?.correct?.isCorrect).length,
	};

	return (
		<div className='exercise-result-container'>
			<div className='labels'>
				<p className='total-label'>
					Puntaje: <span>{typeExercises.score}</span>
				</p>
			</div>
			<div className='result-icons-container'>{JSON.stringify(typeExercises, null, 2)}</div>
			<HighchartsReact highcharts={Highcharts} options={config} />
		</div>
	);
};

const ExerciseResultsComponentDyscalculia = ({ type, exercises }) => {
	const typeExercises = exercises.answers[type];

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

			<div className='result-icons-container'>
				{typeExercises.answer.map((item, i) => {
					return (
						<div className='result-icon' key={type + ' ' + i}>
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
										<p>Respuesta correcta: {item.correct.answer === true ? 'verdadero' : 'falso'}</p>
									</>
								) : (
									<>
										{type !== 'reaction-time' ? (
											<>
												<p>
													Respuesta ingresada:{' '}
													{typeof item.answer === 'object' ? JSON.stringify(item.answer) : item.answer}
												</p>
												<p>Respuesta correcta: {item.correct.answer}</p>
											</>
										) : null}
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

const exercisesToShowPerType = {
	Dislexia: exercises => [
		{
			title: 'Conocimiento alfabético - Nombre',
			component: () => <ExerciseResultsComponentDyslexia type='letters-question-name' exercises={exercises} />,
		},
		{
			title: 'Conocimiento alfabético - Sonido',
			component: () => <ExerciseResultsComponentDyslexia type='letters-question-sound' exercises={exercises} />,
		},
		{
			title: 'Conciencia fonética: discriminación del sonido',
			component: () => <ExerciseResultsComponentDyslexia type='matching' exercises={exercises} />,
		},
		{
			title: 'Conciencia fonética: discriminación de fonema',
			component: () => <ExerciseResultsComponentDyslexia type='contains-letter' exercises={exercises} />,
		},
		{
			title: 'Conciencia silábica: separar en sílabas',
			component: () => <ExerciseResultsComponentDyslexia type='syllables' exercises={exercises} />,
		},
		{
			title: 'Vocabulario: adivinanzas',
			component: () => <ExerciseResultsComponentDyslexia type='multiple-choice' exercises={exercises} />,
		},
		{
			title: 'Fluidez verbal: acceso al léxico',
			component: () => <ExerciseResultsComponentDyslexia type='say-items' exercises={exercises} />,
		},
		{
			title: 'Lectura de palabras',
			component: () => <ExerciseResultsComponentDyslexia type='match-words' exercises={exercises} />,
		},
		{
			title: 'Lectura de pseudopalabras',
			component: () => <ExerciseResultsComponentDyslexia type='nonexisting-words' exercises={exercises} />,
		},
	],
	Discalculia: exercises => [
		{
			title: 'Matchear ejemplo',
			component: () => <ExerciseResultsComponentDyscalculia type='match-sample' exercises={exercises} />,
		},
		{
			title: 'Tiempo de reacción',
			component: () => <ExerciseResultsComponentDyscalculia type='reaction-time' exercises={exercises} />,
		},
		{
			title: 'Comparación de puntos',
			component: () => <ExerciseResultsComponentDyscalculia type='dots-comparison' exercises={exercises} />,
		},
		{
			title: 'Matchear Patron de puntos - números simbolicos',
			component: () => <ExerciseResultsComponentDyscalculia type='match-points-number' exercises={exercises} />,
		},
		{
			title: 'Magnitud simbolica',
			component: () => <ExerciseResultsComponentDyscalculia type='symbolic-magnitude' exercises={exercises} />,
		},
		{
			title: 'Recta numérica',
			component: () => <ExerciseResultsComponentDyscalculia type='numeric-line' exercises={exercises} />,
		},
		{
			title: 'Aritmética - suma',
			component: () => <ExerciseResultsComponentDyscalculia type='simple-arithmetic-plus' exercises={exercises} />,
		},
		{
			title: 'Aritmética - resta',
			component: () => <ExerciseResultsComponentDyscalculia type='simple-arithmetic-minus' exercises={exercises} />,
		},
		{
			title: 'Conteo directo',
			component: () => <ExerciseResultsComponentDyscalculia type='counting' exercises={exercises} />,
		},
		{
			title: 'Conteo inverso',
			component: () => <ExerciseResultsComponentDyscalculia type='counting-true' exercises={exercises} />,
		},
	],
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
						<div className='container'>
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
													<Accordion items={exercisesToShowPerType[result.testType](result)} />
												</div>
											))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default StudentInfo;
