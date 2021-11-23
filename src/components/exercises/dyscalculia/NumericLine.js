import { useEffect } from 'react';
import Button from 'components/global/Button';
import useSetAnswer from 'functions/setAnswer';

const NumericLine = ({ isResult }) => {
	const { exercise, userAnswer, setUserAnswer, submitAnswer } = useSetAnswer({ isResult });

	useEffect(() => {
		setUserAnswer(0);
	}, [exercise]);

	return (
		<div className='exercise numeric-line-container'>
			<div className='number-container'>
				<span className='number'>{exercise.value}</span>
			</div>
			<div className='line-container'>
				<input
					type='range'
					name='line'
					id='line'
					className='line'
					min={0}
					max={10}
					step={0.00001}
					defaultValue={0}
					value={userAnswer ?? 0}
					onChange={e => {
						setUserAnswer(+e.target.value);
						console.log(e.target.value);
					}}
				/>
			</div>
			<Button className='btn btn-primary' onClick={() => submitAnswer()}>
				Aceptar
			</Button>
		</div>
	);
};

export default NumericLine;
