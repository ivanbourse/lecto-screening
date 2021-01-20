import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSpeechRecognition } from 'react-speech-kit';

import microphone from '../../assets/microphone.svg';

const NumberOnScreen = props => {

	const { info, setCurrentAnswer } = props;
	const [color, setColor ] = React.useState("orange");
	const exercise = props.exercise.exercise;

	useEffect(() => { return () => speechRecogniser.stop() }, [])

	const speechRecogniser = useSpeechRecognition({
		onResult: (result) => {
			if (!result.includes(exercise.randomNumber)) return;
			setCurrentAnswer({ableToContinue: true, answer: result, correct: true});
			setColor("green");
		}
	});

	const btnMicrofonoClicked = (e) => {
		setCurrentAnswer({ableToContinue: true, answer: 1, correct: false});
		if (speechRecogniser.listening) {
			speechRecogniser.stop();
			setColor("orange");
		}
		else {
			speechRecogniser.listen({interimResults: true, lang: "es"});
			setColor("blue");
		};
	}

	return (
		<motion.div
			className='number-on-screen-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<div className='number'>{exercise.randomNumber}</div>
			<p className='instruction'>{info.instructions[0]}</p>
			<div
				className='icon'
				onClick={btnMicrofonoClicked}
				style={{backgroundColor: color}} >
				<img src={microphone} alt='Icono LectO Screening' />
			</div>
		</motion.div>
	);
};

export default NumberOnScreen;
