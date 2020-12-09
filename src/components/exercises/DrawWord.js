import { motion } from 'framer-motion';
import React, { useState } from 'react';
/* import { SketchField, Tools } from 'react-sketch'; */
import CanvasDraw from 'react-canvas-draw';

import eraser from '../../assets/eraser.svg';

const DrawWord = props => {
	const { setCurrentAnswer } = props;
	const exercise = props.exercise.exercise;
	console.log(exercise);

	const [color, setColor] = useState('#121212');

	const defaultWidth = 3;
	const [width, setWidth] = useState(defaultWidth);

	const changeColor = color => {
		setColor(color);
		setWidth(defaultWidth);
	};
	return (
		<motion.div
			className='draw-word-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<h3 className='word-to-draw'>{exercise.word.toUpperCase()}</h3>
			<div className='sketch-container'>
				<div onClick={() => setCurrentAnswer({ ableToContinue: true })}>
					{/* <SketchField
						className='sketch'
						tool={Tools.Pencil}
						width='800px'
						height='400px'
						lineColor={color}
						lineWidth={width}
					/> */}
					<CanvasDraw
						hideInterface={true}
						brushColor={color}
						canvasWidth='800px'
						canvasHeight='400px'
						hideGrid={true}
						lazyRadius={0}
						brushRadius={width}
					/>
				</div>
				<div className='controls'>
					<div className='color black' onClick={() => changeColor('#121212')}></div>
					<div className='color red' onClick={() => changeColor('#e9545c')}></div>
					<div className='color yellow' onClick={() => changeColor('#f6bd2a')}></div>
					<div className='color green' onClick={() => changeColor('#3ca936')}></div>
					<div className='color blue' onClick={() => changeColor('#0db3d4')}></div>
					<div
						className='color eraser'
						onClick={() => {
							setColor('#fff');
							setWidth(30);
						}}
					>
						<img src={eraser} alt='' />
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default DrawWord;
