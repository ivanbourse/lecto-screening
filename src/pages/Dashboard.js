import { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';
import { getToken } from '../functions/userManager';

import { useDispatch, useSelector } from 'react-redux';
import { buyTests, getInformation } from '../redux/slices/dashboard'
import { startTest } from '../redux/slices/questions'


import buyIcon from '../assets/buy-icon.png';
import person from '../assets/person.svg';
import axios from 'axios';

const Dashboard = () => {
	
	const data = useSelector((state) => state.dashboard);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => dispatch(getInformation()), []);

	if (!getToken) return <Redirect to='/login' />;

	const btnTestClick = (id) => {
		if (data?.user?.paidTests <= 0) return;
		dispatch(startTest(id));
		history.push('/test');
	}

	const btnBuyTests = () => dispatch(buyTests());

	return (
		<>
			<header className='dashboard-header'>
				<h1 className='title'>¡Hola {data?.user?.name}!</h1>
				<ul>
					{/* <li>Editar perfil</li> */}
					<li>Cerrar sesión</li>
				</ul>
			</header>
			<div className='dashboard-container'>
				<div className='top-section'>
					<h2 className='available-tests'>
						Tests disponibles: <br /> <span className='number'>{data?.user?.paidTests}</span>
					</h2>
					<div className='buttons'>
						<div className='button' onClick={() => btnBuyTests()}>
							<img src={buyIcon} alt='Ícono Comprar Tests' />
							<p className='label'>Comprar tests</p>
						</div>
						<div className='button'>
							<img src={person} alt='Ícono Persona' />
							<p className='label'>Agregar estudiante</p>
						</div>
					</div>
				</div>
				<div className='all-students'>
					<h2 className='title'>Todos tus estudiantes</h2>
					<div className='search-bar'>
						<input type='text' name='search' placeholder='Buscar' />
					</div>
					<div className='students'>
						{/* <div className='student'>
							<div className='info'>
								<p className='name'>Díaz de Vivar, Gonzalo</p>
								<span className='date'>13/03/2004</span>
							</div>
							<div className='student-buttons'>
								<div className='button view'>Ver más</div>
								<div className='button start'>Comenzar test</div>
							</div>
						</div> */}
						{data.students &&
							data.students.map(student => (
								<div className='student' key={student._id}>
									<div className='info'>
										<p className='name'>
											{student.surname}, {student.name}
										</p>
										<span className='date'>13/03/2004</span>
									</div>
									<div className='student-buttons'>
										<div className='button view'>Ver más</div>
										<div className='button start' onClick={(e) => btnTestClick(student._id)}>Comenzar test</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
