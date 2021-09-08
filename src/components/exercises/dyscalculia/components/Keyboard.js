const Keyboard = ({ onClick }) => {
	return (
		<div className='keyboard'>
			<div className='key' onClick={() => onClick(1)}>
				1
			</div>
			<div className='key' onClick={() => onClick(2)}>
				2
			</div>
			<div className='key' onClick={() => onClick(3)}>
				3
			</div>
			<div className='key' onClick={() => onClick(4)}>
				4
			</div>
			<div className='key' onClick={() => onClick(5)}>
				5
			</div>
			<div className='key' onClick={() => onClick(6)}>
				6
			</div>
			<div className='key' onClick={() => onClick(7)}>
				7
			</div>
			<div className='key' onClick={() => onClick(8)}>
				8
			</div>
			<div className='key' onClick={() => onClick(9)}>
				9
			</div>
			{/* hacemos una invisible para que el 0 aparezca en el medio */}
			<div className='invisible'></div>
			<div className='key' onClick={() => onClick(0)}>
				0
			</div>
		</div>
	);
};

export default Keyboard;
