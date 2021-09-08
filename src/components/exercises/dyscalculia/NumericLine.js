import Button from 'components/global/Button';
import useTest from 'utils/hooks/useTest';

const NumericLine = ({ isResult }) => {
	const { exercise, userAnswer, setUserAnswer, submitAnswer } = useTest({ isResult });

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
					defaultValue={5}
					value={userAnswer ?? 5}
					onChange={e => setUserAnswer(+e.target.value)}
				/>
			</div>
			<Button className='btn btn-primary' onClick={() => submitAnswer()}>
				Aceptar
			</Button>
		</div>
	);
};

export default NumericLine;
