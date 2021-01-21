import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useSetAnswer from '../../functions/setAnswer';
import '../../styles/matching.scss';
import ExerciseContainer from '../ExerciseContainer';

let selected = -1,
	cantCorrectos = 0;

const JoinWithArrows = () => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	/* // Creación del estado
	 const [imageState, setImageState] = React.useState(() => {
		let list = [];
		exercise.pair.forEach((item, ind) => {
			item.forEach(item => {
				list.push({
					pair: ind,
					url: item.url,
					selectionState: 'none', // none, wnone, selected, used
				});
			});
		});
		return list;
	}); 

	// Lógica de la aplicación
	const imageClicked = (e, num) => {
		let modify = [...imageState];

		if (modify[num].selectionState === 'selected') {
			modify[num].selectionState = 'none';
			selected = -1;
		} else if (modify[num].selectionState === 'none' || modify[num].selectionState === 'wnone') {
			if (selected !== -1) {
				if (modify[selected].pair === modify[num].pair) {
					modify[selected].selectionState = 'used';
					modify[num].selectionState = 'used';
					cantCorrectos += 2;
				} else {
					modify[selected].selectionState = 'wnone';
					modify[num].selectionState = 'wnone';
				}
				selected = -1;
			} else {
				modify[num].selectionState = 'selected';
				selected = num;
			}
		}

		if (cantCorrectos === imageState.length) setImageState(modify);
	};

	// Control de animaciones
	const onAnimationEnd = (e, ind) => {
		console.log(e);
		if (e.animationName === 'wrongAnswer') {
			let modify = [...imageState];
			modify[ind].selectionState = 'none';
			setImageState(modify);
		}
	}; */

	return (
		<ExerciseContainer classes='join-with-arrows-container'>
			<p className='instruction'>{exercise.instructions[0]}</p>
			<div className='images'>
				{/* {imageState.map((item, ind) => (
					<img
						src={item.url}
						alt='Ilustración LectO Screening'
						className={'image ' + item.selectionState}
						onClick={e => imageClicked(e, ind)}
						onAnimationEnd={e => onAnimationEnd(e, ind)}
					/>
				))} */}
			</div>
		</ExerciseContainer>
	);
};

export default JoinWithArrows;
