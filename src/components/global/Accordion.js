import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const Accordion = ({ items }) => {
	const [opened, setOpened] = useState(null);

	const accordionRef = useRef(null);

	const openItem = item => {
		const isAlreadyOpened = item === opened;
		setOpened(prev => (isAlreadyOpened ? null : item));

		const accordionItems = accordionRef.current.children;
		for (let index = 0; index < accordionItems.length; index++) {
			const element = accordionItems[index];
			const panel = element.children[1];

			const shouldOpen = index === item && !isAlreadyOpened;

			if (shouldOpen) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
			} else {
				panel.style.maxHeight = null;
			}
		}
	};

	const isSelected = index => opened === index;

	return (
		<div className='accordion-container' ref={accordionRef}>
			{items.map((item, index) => (
				<div className='accordion-item-container' key={item.title}>
					<div className={`accordion ${isSelected(index) ? 'active' : ''}`} onClick={() => openItem(index)}>
						<span>{item.title}</span>
					</div>
					<div className='panel'>{item.component()}</div>
					{index !== items.length - 1 && <div className='line' />}
				</div>
			))}
		</div>
	);
};

Accordion.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			component: PropTypes.func.isRequired,
		})
	).isRequired,
};

export default Accordion;
