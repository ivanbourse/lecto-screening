import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import illustration from '../assets/illustration.svg';
import Header from '../components/Header';

const Landing = () => {
	return (
		<div className='landing-container'>
			<Header />
			<main className='landing-page'>
				<div className='container title-container'>
					<h1 className='title'>
						Un <strong>sistema virtual</strong> para diagnosticar posible <strong>dislexia y discalculia</strong>,
						avalado por científicos.
					</h1>
					<Link to='/get-started' className='button'>
						¡Empezar test!
					</Link>
				</div>
				<div className='container illustration-container'>
					<img src={illustration} alt='Ilustración Exámenes LectO Screening' className='illustration' />
				</div>
			</main>
		</div>
	);
};

export default Landing;
