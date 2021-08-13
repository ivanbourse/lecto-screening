import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';
import { history } from '../components/Router';
import { stateToWords, textForTypeOfExercise } from '../functions/answerResults';
import { getStudentInfo } from '../redux/slices/student';
import { signOut } from '../redux/slices/user';

const StudentInfo = props => {
	const { user } = useSelector(state => state.dashboard);
	const { student, results, loading } = useSelector(state => state.student);
	const urlId = props.match.params.studentId;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStudentInfo(urlId));
	}, []);

	const logOut = () => {
		dispatch(signOut());
		history.push('/');
	};

	return (
		<>
			<LoadingScreen loading={loading} />
			{student && !loading && (
				<div className='student-info-container'>
					<header className='dashboard-header'>
						<div></div>
						<ul>
							{/* <li>Editar perfil</li> */}
							<li onClick={logOut}>Cerrar sesión</li>
						</ul>
					</header>
					<div className='dashboard-container'>
						<div className='container'>
							<h2 className='subtitle'>Información de {student.alias}:</h2>
							<div className='info-container'>
								<div className='col'>
									<div className='item'>
										<span className='label'>Año de nacimiento</span>:{' '}
										<span className='info'>{student.birth?.year}</span>
									</div>
									<div className='item'>
										<span className='label'>Mes de nacimiento</span>:{' '}
										<span className='info'>{student.birth?.month}</span>
									</div>
									<div className='item'>
										<span className='label'>Género</span>: <span className='info'>{student.genre}</span>
									</div>
								</div>
								<div className='divider'></div>
								<div className='col'>
									<div className='item'>
										<span className='label'>Provincia</span>: <span className='info'>{student.province}</span>
									</div>
									<div className='item'>
										<span className='label'>Localidad</span>: <span className='info'>{student.locality}</span>
									</div>
									<div className='item'>
										<span className='label'>Gestión de escuela</span>:{' '}
										<span className='info'>{student.schoolType}</span>
									</div>
								</div>
								<div className='divider'></div>
								<div className='col'>
									<div className='item'>
										<span className='label'>Nivel educativo de los padres</span>:{' '}
										<span className='info'>{student.parentsLevel || 'No especificado'}</span>
									</div>
									<div className='item'>
										<span className='label'>Mano hábil</span>:{' '}
										<span className='info'>{student.hand || 'No especificado'}</span>
									</div>
									<div className='item'>
										<span className='label'>Cantidad de tests realizados</span>:{' '}
										<span className='info'>{results.length}</span>
									</div>
								</div>
							</div>
						</div>
						<div className='container'>
							<h2 className='subtitle'>Resultados de {student.alias}:</h2>
							<div className='info-container'>
								{results.map(item => (
									<div className='result-container'>
										<h2>Ver resultado del {new Date(item.result.date).toLocaleDateString()}:</h2>
										{/* <div className='item'>
											<h3>Gráfico de las pruebas: Inicio de año</h3>
											<div style={{ height: 300, width: 650, backgroundColor: '#ccc' }}></div>
										</div> */}
										<div className='result-paragraph'>
											<h3>Rendimiento general:</h3>
											<p className='text'>
												Los resultados obtenidos del screening de precursores de dificultades específicas en el
												aprendizaje indican que {student.alias} presenta un desarrollo de habilidades para la
												adquisición de la lectoescritura dentro de los parámetros <b>{item.performance.literacy.state}</b> en
												comparación con chicos de su edad cronológica. Asimismo, en el desarrollo de habilidades
												esenciales del área de matemática presenta un rendimiento dentro de los parámetros{' '}
												<b>{item.performance.math.state}</b> en comparación con la media.
											</p>
										</div>
										{/* <div className='item'>
											<h3>Gráfico comparativo de las pruebas a lo largo del año</h3>
											<div style={{ height: 300, width: 650, backgroundColor: '#ccc' }}></div>
										</div> */}
										{/* <div className='item'>
											<h3>Gráfico comparativo con los alumnos del usuario XXX</h3>
											<div className='chart'>
												<h5 className='label'>Lecto-escritura</h5>
												<div style={{ height: 300, width: 500, backgroundColor: '#ccc' }}></div>
											</div>
											<div className='chart'>
												<h5 className='label'>Matemática</h5>
												<div style={{ height: 300, width: 500, backgroundColor: '#ccc' }}></div>
											</div>
										</div> */}
										<div className='result-paragraph'>
											<h3>Informe de desempeño en las pruebas</h3>
											<ul>
												{Object.entries(item.answersResults).map(([key, value]) =>
													textForTypeOfExercise[key].text({ name: student.alias, answerResult: value })
												)}
											</ul>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default StudentInfo;
