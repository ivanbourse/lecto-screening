import React from 'react';
import { useSelector } from 'react-redux';
import { getImage } from '../../functions/getImage';
import useSetAnswer from '../../functions/setAnswer';
import '../../styles/matching.scss';
import ExerciseContainer from '../ExerciseContainer';
import NextButton from '../NextButton';

let selected = -1,
	cantPairs = 0;

const JoinWithArrows = () => {
	const exercise = useSelector(state => state.questions.questions[state.questions.current]);

	const [answer, setAnswer, setUserAnswer] = useSetAnswer();
	// Creación del estado
	const [imageState, setImageState] = React.useState(() => {
		let list = [];
		exercise.exercise.words.forEach((item, ind) => {
			list.push({
				word: item.word,
				matchNumber: item.matchNumber,
				url: 'https://picsum.photos/200',
				selectionState: 'none', // none, wnone, selected, used
			});
		});
		return list;
	});

	const onImageClick = (e, index) => {
		let modify = [...imageState];

		if (modify[index].selectionState === 'selected') {
			modify[index].selectionState = 'none';
			selected = -1;
		} else if (modify[index].selectionState === 'none' || modify[index].selectionState === 'wnone') {
			if (selected !== -1) {
				const isCorrect = modify[selected].matchNumber === modify[index].matchNumber;
				const selectedPair = [modify[selected], modify[index]];

				setAnswer(prev => [
					...(Array.isArray(prev) ? prev : [prev]),
					{
						correct: isCorrect,
						selected: selectedPair,
					},
				]);
				cantPairs += 1;
				modify[selected].selectionState = `used-${cantPairs}`;
				modify[index].selectionState = `used-${cantPairs}`;

				selected = -1;
			} else {
				modify[index].selectionState = 'selected';
				selected = index;
			}
		}

		setImageState(modify);
	};

	const onAnimationEnd = (e, ind) => {
		if (e.animationName === 'wrongAnswer') {
			let modify = [...imageState];
			modify[ind].selectionState = 'none';
			setImageState(modify);
		}
	};

	return (
		<ExerciseContainer classes='join-with-arrows-container'>
			<p className='instruction'>{exercise.instructions[0]}</p>
			<div className='images'>
				{imageState.map((item, ind) => (
					<img
						src={getImage(item.word)}
						alt={`Pictograma de ${item.word}`}
						className={'image ' + item.selectionState}
						onClick={e => onImageClick(e, ind)}
						/* onClick={e => imageClicked(e, ind)}*/
						onAnimationEnd={e => onAnimationEnd(e, ind)}
					/>
				))}
			</div>

			<NextButton setUserAnswer={setUserAnswer} answered={cantPairs === 5} />
		</ExerciseContainer>
	);
};

export default JoinWithArrows;
