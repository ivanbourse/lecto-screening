import { Check, X } from 'react-feather';

const CorrectButtons = ({ onCorrect, onIncorrect }) => {
	return (
		<div className='correct-buttons'>
			<div className='btn-incorrect' onClick={onIncorrect}>
				<X size={50} color='#fff' />
			</div>
			<div className='btn-correct' onClick={onCorrect}>
				<Check size={50} color='#fff' />
			</div>
		</div>
	);
};

export default CorrectButtons;
