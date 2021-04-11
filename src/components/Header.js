import React from 'react';

import screeningLogo from '../assets/logo-lecto.png';

const Header = () => {
	return (
		<header>
			<img src={screeningLogo} alt='Logo LectO Screening' className='logo' />
			<p className='donate'>¡Apóyanos!</p>
		</header>
	);
};

export default Header;
