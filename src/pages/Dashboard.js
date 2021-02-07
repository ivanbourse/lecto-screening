import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { getToken } from '../functions/userManager';

import buyIcon from '../assets/buy-icon.png';
import person from '../assets/person.svg';

const Dashboard = () => {
	const [data, setData] = useState({});
	useEffect(() => {
		const fetch = async () => {
			const user = await axios.post(
				'https://lectoscreening.azurewebsites.net/api/getProfile?code=ZcpRRm50vj2oZ/9/JWbfUgQh8gtn/DHpkm65XojQY8xNx959B145YQ==',
				{ token: getToken }
			);
			const students = await axios.post(
				'https://lectoscreening.azurewebsites.net/api/getStudents?code=2/GZhBAtIoCCVg/bi4dOxuhyhbW3WNiEo5qSr3KY1wjmsrXz/3OGXw==',
				{ token: getToken }
			);
			setData({ user: user.data, students: students.data });
		};
		fetch();
	}, []);

	if (!getToken) return <Redirect to='/login' />;

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
						<div className='button'>
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
										<div className='button start'>Comenzar test</div>
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
