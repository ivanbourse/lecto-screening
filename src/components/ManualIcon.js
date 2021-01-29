import React from 'react';

import icon from '../assets/manual-icon.png';

const ManualIcon = ({ classes }) => {
	return (
		<div className={`manual-icon-container ${classes}`}>
			<div className='icon'>
				<img src={icon} alt='Manual Icon - LectO Screening' />
			</div>
			<div className='tooltip'>
				Para poder continuar, debes presionar la flecha izquierda en caso de que la respuesta haya sido incorrecta, o la
				flecha derecha en caso de que haya sido correcta
			</div>
		</div>
	);
};

export default ManualIcon;
