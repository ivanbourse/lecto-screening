import useSetAnswer from 'functions/setAnswer';
import { getImage } from 'functions/getImage';
import ExerciseContainer from 'components/ExerciseContainer';
import NextButton from 'components/NextButton';
import { useEffect } from 'react';

const MatchWordsToImage = () => {
	const { exercise, userAnswer, setUserAnswer, submitAnswer } = useSetAnswer();
	const [correctWord] = exercise.images.filter(({ correct }) => !!correct);

	return (
		<ExerciseContainer classes='multiple-choice-container'>
			<p className='instruction'>{correctWord.image.toUpperCase()}</p>
			<div className='options'>
				{exercise.images &&
					exercise.images.map((item, i) => (
						<div
							key={item.answer}
							className={`image-option option ${userAnswer.i === i ? 'selected' : ''}`}
							onClick={() => setUserAnswer({ i, item })}
						>
							<img src={getImage(item.image)} alt={`Pictogram for ${item.image}`} />
							<p>{item.answer}</p>
						</div>
					))}
			</div>
			<NextButton setUserAnswer={submitAnswer} answered={Object.keys(userAnswer).length !== 0} />
		</ExerciseContainer>
	);
};

export default MatchWordsToImage;
