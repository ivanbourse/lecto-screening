import React from 'react';
import { motion } from 'framer-motion';

const styles = {
	none: { backgroundColor: "white" },
	selected: { backgroundColor: "green" },
	used: { visibility: "hidden", backgroundColor: "green"}
}

let selected = -1, cantCorrectos = 0;

const JoinWithArrows = props => {
	const { info, setCurrentAnswer } = props;
	const exercise = props.exercise.exercise;

	const [imageState, setImageState] = React.useState(() => {
		let list = [];
		exercise.pair.forEach((item, ind) => {
			item.forEach((item) => {
				list.push({
					pair: ind,
					url: item.url,
					selectionState: "none", // none, selected, used
				});
			});
		});
		return list;
	});

	const imageClicked = (e, num) => {
		let modify = [...imageState];

		if (modify[num].selectionState === "selected") {

			modify[num].selectionState = "none";
			selected = -1;

		} else if (modify[num].selectionState === "none") {

			if (selected !== -1) {

				if (modify[selected].pair === modify[num].pair) {
					modify[selected].selectionState = "used";
					modify[num].selectionState = "used";
					cantCorrectos += 2;
				} else {
					modify[selected].selectionState = "none";
				}
				selected = -1;

			} else {
				modify[num].selectionState = "selected";
				selected = num;
			}
		}

		if (cantCorrectos === imageState.length) setCurrentAnswer({ ableToContinue: true, answer: [true, true], correct: true });
		setImageState(modify);
	}

	return (
		<motion.div
			className='join-with-arrows-container test-exercise-container'
			exit={{ transform: 'translateX(-100vw)' }}
			animate={{ transform: 'translateX(0vw)' }}
			initial={{ transform: 'translateX(100vw)' }}
			transition={{ easing: 'linear' }}
		>
			<p className='instruction'>{info.instructions[0]}</p>
			<div className='images'>
				{imageState.map((item, ind) =>
					<img
						src={item.url}
						alt='Ilustración LectO Screening'
						className='image'
						style={styles[item.selectionState]}
						onClick={(e) => imageClicked(e, ind)}
					/>
				)}
			</div>
		</motion.div>
	);
};

export default JoinWithArrows;
