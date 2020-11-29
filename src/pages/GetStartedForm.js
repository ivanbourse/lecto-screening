import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import PersonForm from '../components/get-started/PersonForm';
import SchoolForm from '../components/get-started/SchoolForm';
import logo from '../assets/logo-lecto.png';

const GetStartedForm = props => {
	const { match } = props;
	return (
		<>
			<header className='get-started-header'>
				<Link to='/' className='link'>
					<img src={logo} alt='Logo LectO' className='logo' />
				</Link>
			</header>
			<motion.div
				className='get-started-container'
				exit={{ transform: 'translateY(100vw)' }}
				animate={{ transform: 'translateY(0vw)' }}
				initial={{ transform: 'translateY(100vw)' }}
				transition={{ easing: 'linear' }}
			>
				<p className='instructions'>Completá los datos para empezar el test</p>
				{match.params.type === 'person' ? <PersonForm /> : <SchoolForm />}
			</motion.div>
		</>
	);
};

export default GetStartedForm;
