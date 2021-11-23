import { getImage } from 'functions/getImage';
import { Play, Volume, Volume2 } from 'react-feather';

const PictogramWithSound = ({ classes, word, ...props }) => {
	const read = isPracticeFinish => {
		const synth = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance();

		utterance.text = word;
		utterance.rate = 1.2;
		synth.speak(utterance);
	};

	return (
		<div className={`${classes} pictogram-with-sound`} {...props}>
			<div onClick={read} className='play-icon'>
				<Volume2 size={32} color='#fff' />
			</div>
			<img src={getImage(word)} alt={`Pictograma de ${word}`} />
		</div>
	);
};

export default PictogramWithSound;
