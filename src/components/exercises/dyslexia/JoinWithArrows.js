import React, { useState, useEffect } from 'react';
import { getImage } from 'functions/getImage';
import useSetAnswer from 'functions/setAnswer';
import 'styles/matching.scss';
import ExerciseContainer from 'components/ExerciseContainer';
import NextButton from 'components/NextButton';

let selected = -1;

const JoinWithArrows = () => {
	const { exercise, setUserAnswer, submitAnswer } = useSetAnswer();
	// Creación del estado
	const [imageState, setImageState] = useState([]);

	const [cantPairs, setCantPairs] = useState(0);

	useEffect(() => {
		setCantPairs(0);
		selected = -1;
		setImageState(() => {
			let list = [];
			exercise.words.forEach((item, ind) => {
				list.push({
					word: item.word,
					matchNumber: item.matchNumber,
					url: 'https://picsum.photos/200',
					selectionState: 'none', // none, wnone, selected, used
				});
			});

			if (exercise.words.length === 10) {
				const leftArr = list.slice(0, 5);
				const rightArr = list.slice(5, 10);

				// shuffle the array inline
				const shuffledLeft = leftArr.sort((a, b) => 0.5 - Math.random());
				const shuffledRight = rightArr.sort((a, b) => 0.5 - Math.random());

				console.log({ list, shuffledLeft, shuffledRight });

				return [...shuffledLeft, ...shuffledRight];
			}

			return list.sort((a, b) => 0.5 - Math.random());
		});
	}, [exercise]);

	const onImageClick = async (e, i, start) => {
		let index = i + start;
		let modify = [...imageState];

		if (modify[index].selectionState === 'selected') {
			modify[index].selectionState = 'none';
			selected = -1;
		} else if (modify[index].selectionState === 'none' || modify[index].selectionState === 'wnone') {
			if (selected !== -1) {
				const isCorrect = modify[selected].matchNumber === modify[index].matchNumber;
				const selectedPair = [modify[selected], modify[index]];

				setUserAnswer(prev => [
					...(Array.isArray(prev) ? prev : [prev]),
					{
						correct: isCorrect,
						selected: selectedPair,
					},
				]);
				setCantPairs(prev => prev + 1);
				modify[selected].selectionState = `used-${cantPairs + 1}`;
				modify[index].selectionState = `used-${cantPairs + 1}`;

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
			<div className='row'>
				<div className='images-col'>
					{imageState.slice(0, 5).map((item, ind) => (
						<img
							src={getImage(item.word)}
							alt={`Pictograma de ${item.word}`}
							className={'image ' + item.selectionState}
							onClick={e => onImageClick(e, ind, 0)}
							/* onClick={e => imageClicked(e, ind)}*/
							onAnimationEnd={e => onAnimationEnd(e, ind)}
						/>
					))}
				</div>
				<div className='images-col'>
					{imageState.slice(5, 10).map((item, ind) => (
						<img
							src={getImage(item.word)}
							alt={`Pictograma de ${item.word}`}
							className={'image ' + item.selectionState}
							onClick={e => onImageClick(e, ind, 5)}
							/* onClick={e => imageClicked(e, ind)}*/
							onAnimationEnd={e => onAnimationEnd(e, ind)}
						/>
					))}
				</div>
			</div>

			<NextButton setUserAnswer={submitAnswer} answered={cantPairs >= Math.floor(exercise.words.length / 2)} />
		</ExerciseContainer>
	);
};

export default JoinWithArrows;
