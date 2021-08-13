import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { getToken } from '../functions/userManager';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/slices/user';
import { buyTests, getInformation } from '../redux/slices/dashboard';
import { startTest } from '../redux/slices/questions';

import buyIcon from '../assets/buy-icon.png';
import person from '../assets/person.svg';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';
import { VscError } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	const data = useSelector(state => state.dashboard);
	const status = useSelector(state => state.dashboard.status);
	const userState = useSelector(state => state.user);
	const history = useHistory();
	const dispatch = useDispatch();
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		dispatch(getInformation());
	}, []);
	useEffect(() => setFiltered(data.students), [data]);

	const btnTestClick = id => {
		if (data?.user?.paidTests < 0) return;
		dispatch(startTest(id));
		history.push('/test');
	};

	const btnBuyTests = () => dispatch(buyTests());
	const btnAddStudent = () => history.push('/dashboard/add-student');

	const onSearchBarChange = e => {
		const searchTerm = e.target.value;
		setFiltered(
			data.students.filter(student => {
				return student.alias.toLowerCase().includes(searchTerm.toLowerCase());
			})
		);
	};

	const logOut = () => {
		dispatch(signOut());
		history.push('/');
	};

	if (userState.loggedIn === false) return <Redirect to='/login' />;

	const formatDate = date => {
		try {
			const string = new Date(Date.parse(date)).toISOString().split('-');
			return `${string[2].split('T')[0]}/${string[1]}/${string[0]}`;
		} catch (err) {
			return '';
		}
	};

	return (
		<>
			<LoadingScreen loading={status === 'loading'} />
			<header className='dashboard-header'>
				<h1 className='title'>¡Hola {data?.user?.name}!</h1>
				<ul>
					{/* <li>Editar perfil</li> */}
					<li onClick={logOut}>Cerrar sesión</li>
				</ul>
			</header>
			<div className='dashboard-container'>
				{!data?.user?.verified && (
					<div className='warning'>
						<VscError />
						Por favor, verifique su correo electrónico para poder empezar a usar todos los servicios de LectO Screening
					</div>
				)}
				<div className='top-section'>
					<h2 className='available-tests'>
						Tests tomados: <br /> <span className='number'>{data?.user?.paidTests}</span>
					</h2>
					<div className='buttons'>
						<div className='button' onClick={() => btnAddStudent()}>
							<img src={person} alt='Ícono Persona' />
							<p className='label'>Agregar estudiante</p>
						</div>
					</div>
				</div>
				<div className='all-students'>
					<h2 className='title'>Todos tus estudiantes</h2>
					<div className='search-bar'>
						<input type='text' name='search' placeholder='Buscar' onChange={onSearchBarChange} />
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
						{filtered &&
							filtered.map(student => (
								<div className='student' key={student._id}>
									<div className='info'>
										<p className='name'>{student.alias}</p>
										{/* <span className='date'>{formatDate(student?.birthdate)}</span> */}
									</div>
									<div className='student-buttons'>
										<Link to={`/dashboard/student/${student._id}`} className='button view'>
											Ver más
										</Link>
										<div className='button start' onClick={e => btnTestClick(student._id)}>
											Comenzar test
										</div>
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
