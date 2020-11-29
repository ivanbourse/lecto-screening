import React, { useEffect, useState } from 'react';
import { generateTest, exercisesInfo } from '../functions/exercises';

import { useHistory } from 'react-router-dom';

import CountItems from '../components/exercises/CountItems';
import NumberOnScreen from '../components/exercises/NumberOnScreen';
import PrevPostNumber from '../components/exercises/PrevPostNumber';
import JoinWithArrows from '../components/exercises/JoinWithArrows';
import SplitSyllables from '../components/exercises/SplitSyllables';
import WriteLetter from '../components/exercises/WriteLetter';
import DrawWord from '../components/exercises/DrawWord';

const Test = () => {
	const [loading, setLoading] = useState(true);
	const [testQuestions, setTestQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [results, setResults] = useState({
		count: [],
		'number-on-screen': [],
		'prev-post': [],
		'join-with-arrows': [],
		'split-syllables': [],
		'write-letter': [],
		'draw-word': [],
	});
	const [currentAnswer, setCurrentAnswer] = useState({ ableToContinue: false });
	const [pressed, setPressed] = useState(false);

	const history = useHistory();

	useEffect(() => {
		const test = generateTest(2);
		setTestQuestions(test);
		setLoading(false);

		window.onbeforeunload = confirmExit;
		function confirmExit() {
			return 'show warning';
		}
	}, []);

	const questionId = testQuestions[currentQuestion]?.exerciseId;

	const showExercise = () => {
		const info = exercisesInfo[questionId];
		const exercise = testQuestions[currentQuestion];

		// eslint-disable-next-line
		switch (questionId) {
			case 'count':
				return <CountItems setCurrentAnswer={setCurrentAnswer} info={info} exercise={exercise} />;
			case 'number-on-screen':
				return (
					<NumberOnScreen
						setCurrentAnswer={setCurrentAnswer}
						info={exercisesInfo[questionId]}
						exercise={testQuestions[currentQuestion]}
					/>
				);
			case 'prev-post':
				return (
					<PrevPostNumber
						setCurrentAnswer={setCurrentAnswer}
						info={exercisesInfo[questionId]}
						exercise={testQuestions[currentQuestion]}
					/>
				);
			case 'join-with-arrows':
				return (
					<JoinWithArrows
						setCurrentAnswer={setCurrentAnswer}
						info={exercisesInfo[questionId]}
						exercise={testQuestions[currentQuestion]}
					/>
				);
			case 'split-syllables':
				return (
					<SplitSyllables
						setCurrentAnswer={setCurrentAnswer}
						info={exercisesInfo[questionId]}
						exercise={testQuestions[currentQuestion]}
					/>
				);
			case 'write-letter':
				return (
					<WriteLetter
						setCurrentAnswer={setCurrentAnswer}
						info={exercisesInfo[questionId]}
						exercise={testQuestions[currentQuestion]}
					/>
				);
			case 'draw-word':
				return (
					<DrawWord
						setCurrentAnswer={setCurrentAnswer}
						info={exercisesInfo[questionId]}
						exercise={testQuestions[currentQuestion]}
					/>
				);
		}
	};

	const nextExercise = (correct = false) => {
		if (currentAnswer.ableToContinue === true) {
			setPressed(false);
			const newExerciseTypeArray = results[questionId];
			const { correct, answer } = currentAnswer;
			newExerciseTypeArray.push({ correct, answer });
			setResults(prev => {
				const newResults = prev;
				newResults[questionId] = newExerciseTypeArray;
				return newResults;
			});
			if (currentQuestion < testQuestions.length - 1) {
				setCurrentQuestion(prev => prev + 1);
				setCurrentAnswer({ ableToContinue: false });
			} else {
				window.onbeforeunload = null;

				history.push('/finished-test');
			}
		} else {
			setPressed(true);
		}
	};

	return (
		<div className='test-container'>
			{loading ? (
				<h1>Cargando...</h1>
			) : (
				<>
					<header className='test-header'>
						<h2 className='title'>
							{exercisesInfo[questionId].title || testQuestions[currentQuestion].exercise.title}
						</h2>
					</header>

					{showExercise()}

					{pressed && !currentAnswer.ableToContinue && (
						<p className='warning'>¡Tenés que completar el ejercicio para poder continuar!</p>
					)}

					<button className='next-button' onClick={nextExercise}>
						¡Siguiente!
					</button>
				</>
			)}
		</div>
	);
};

export default Test;
