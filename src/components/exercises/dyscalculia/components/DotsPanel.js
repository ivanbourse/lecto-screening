import { randomValueBetweenTwoNumbers } from 'functions/generateTest';

const DotsPanel = ({ dots, onClick, className, style }) => {
	return (
		<div className={'panel panel-dots ' + className} onClick={onClick} style={style}>
			{Array(dots)
				.fill(0)
				.map((dot, index) => {
					const randomSize = randomValueBetweenTwoNumbers(20, 40);
					return (
						<div className='dot-row' style={{ flex: 1 }} key={randomSize + ' ' + index}>
							<div
								className='dot'
								style={{ left: `${randomValueBetweenTwoNumbers(10, 80)}%`, width: randomSize, height: randomSize }}
							/>
						</div>
					);
				})}
		</div>
	);
};

export default DotsPanel;
