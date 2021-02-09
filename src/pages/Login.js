import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getToken } from '../functions/userManager';
import { signIn, keepAlive } from '../redux/slices/user';

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [error, setError] = useState(false);
	const { register, handleSubmit, errors } = useForm();

	const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	const onSubmit = async data => dispatch(signIn(data));
	const userState = useSelector(state => state.user);

	// Esta es la función que tiene que correrse una vez al empezar la aplicación en cualquier punto.
	useEffect(() => {
		if (getToken) {
			dispatch(keepAlive(getToken));
			history.replace('/dashboard');
		}
	}, []);

	useEffect(() => {
		if (userState.loggedIn === true) {
			history.push('/dashboard');
		}
		setError(userState.error.error === true);
	}, [userState]);

	return (
		<div className='login-container'>
			<h1 className='title'>Iniciar sesión</h1>
			<form className='inputs' onSubmit={handleSubmit(onSubmit)}>
				{error && <div className='error-message'>El correo electrónico y la contraseña no coinciden</div>}
				<div className='input-group'>
					<label className='label' htmlFor='email'>
						Correo electrónico
					</label>
					<input
						ref={register({ required: true, pattern: emailRegex })}
						className='input'
						name='email'
						id='email'
						type='text'
					/>
					{errors.email && <span className='error'>Ingrese un correo electrónico válido</span>}
				</div>
				<div className='input-group'>
					<label className='label' htmlFor='password'>
						Contraseña
					</label>
					<input
						ref={register({ required: true, minLength: 8, regex: /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/ })}
						className='input'
						name='password'
						id='password'
						type='password'
					/>

					{errors.password && (
						<span className='error'>Ingrese una contraseña con al menos 8 caracteres, una mayúscula y un número.</span>
					)}
				</div>
				<button className='button' type='submit'>
					Iniciar sesión
				</button>
			</form>
			<Link to='/register' className='switch'>
				¿No tienes una cuenta? Regístrate
			</Link>
		</div>
	);
};

export default Login;
