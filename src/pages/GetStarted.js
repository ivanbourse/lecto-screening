import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import logo from '../assets/logo-lecto.png';
import person from '../assets/person.svg';
import school from '../assets/school.svg';

const GetStarted = () => {
	return (
		<>
			<header className='get-started-header'>
				<Link to='/' className='link'>
					<img src={logo} alt='Logo LectO' className='logo' />
				</Link>
			</header>
			<motion.div
				section
				className='get-started-container'
				exit={{ transform: 'translateY(-100vw)' }}
				animate={{ transform: 'translateY(0vw)' }}
				initial={{ transform: 'translateY(100vw)' }}
				transition={{ easing: 'linear' }}
			>
				<p className='instructions'>Antes de empezar, selecciona la opción que te corresponda</p>
				<div className='options'>
					<div className='option person'>
						<Link className='hover' to='/get-started/person'>
							<img src={person} alt='Ilustración Persona - LectO Screening' className='image' />
							<p className='label'>Soy individual</p>
						</Link>
					</div>
					<div className='divider'></div>
					<div className='option school'>
						<Link className='hover' to='/get-started/school'>
							<img src={school} alt='Ilustración Escuela - LectO Screening' className='image' />
							<p className='label'>Soy de una escuela</p>
						</Link>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default GetStarted;
