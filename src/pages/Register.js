import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import user, { signUp } from '../redux/slices/user';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { VscError } from 'react-icons/vsc';

const Register = () => {
	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch();
	const history = useHistory();
	const userState = useSelector(state => state.user);

	const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

	const onSubmit = async data => {
		dispatch(signUp(data));
		if (userState.loggedIn) {
			Swal.fire({
				icon: 'success',
				title: '¡Listo!',
				text:
					'Ya puedes iniciar sesión en tu cuenta, aunque para poder empezar a usar LectO Screening deberás verificar tu cuenta mediante el correo electrónico que te enviamos.',
				confirmButtonText: 'Iniciar sesión',
				confirmButtonColor: '#0db3d4',
			}).then(() => {
				history.push('/login');
			});
		}
	};

	useEffect(() => {
		if (userState.loggedIn) {
			Swal.fire({
				icon: 'success',
				title: '¡Listo!',
				text:
					'Ya puedes ir a tu panel, aunque para poder empezar a usar LectO Screening deberás verificar tu cuenta mediante el correo electrónico que te enviamos.',
				confirmButtonText: 'Iniciar sesión',
				confirmButtonColor: '#0db3d4',
			}).then(() => {
				history.push('/dashboard');
			});
		}
	}, [userState]);

	const [password, setPassword] = useState('');

	return (
		<div className='register-container'>
			<h1 className='title'>Registrarse</h1>
			<form className='inputs' onSubmit={handleSubmit(onSubmit)}>
				{userState.error.error && (
					<motion.div
						className='error-message'
						initial={{ transform: 'scale(0)', opacity: 0 }}
						animate={{ transform: 'scale(1)', opacity: 1 }}
					>
						<VscError />
						{userState.error.data}
					</motion.div>
				)}
				<div className='input-group'>
					<label className='label' htmlFor='name'>
						Nombre completo
					</label>
					<input ref={register({ required: true })} className='input' name='name' id='name' type='text' />
					{errors.name && <span className='error'>Ingrese su nombre completo</span>}
				</div>
				<div className='input-group'>
					<label className='label' htmlFor='organization'>
						Organización (opcional)
					</label>
					<input
						ref={register({ required: false })}
						className='input'
						name='organization'
						id='organization'
						type='text'
					/>
				</div>
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
						onChange={e => setPassword(e.target.value)}
					/>

					{errors.password && (
						<span className='error'>Ingrese una contraseña con al menos 8 caracteres, una mayúscula y un número.</span>
					)}
				</div>
				<div className='input-group'>
					<label className='label' htmlFor='repeatPassword'>
						Repetir contraseña
					</label>
					<input
						ref={register({
							required: true,
							validate: value => value === password || 'Las contraseñas no coinciden.',
						})}
						className='input'
						name='repeatPassword'
						id='repeatPassword'
						type='password'
					/>
					{errors.repeatPassword && <span className='error'>Las contraseñas no coinciden</span>}
				</div>
				<button className='button' type='submit'>
					{userState.loading && (
						<div className='loading'>
							<div className='loader'></div>
						</div>
					)}
					Registrarse
				</button>
			</form>
			<Link to='/login' className='switch'>
				¿Ya tienes una cuenta? Inicia sesión
			</Link>
		</div>
	);
};

export default Register;
