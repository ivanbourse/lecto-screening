import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const PersonForm = props => {
	const { register, handleSubmit, errors } = useForm();

	const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

	const history = useHistory();
	const handleSubmitForm = () => {
		history.push('/tutorial');
	};

	return (
		<form className='inputs' onSubmit={handleSubmit(handleSubmitForm)}>
			<div className='input-group'>
				<label className='label' htmlFor='email'>
					Correo electrónico para enviar los resultados
				</label>
				<input
					ref={register({ required: true, pattern: emailRegex })}
					className='input'
					name='email'
					id='email'
					type='email'
				/>
				{errors.email && <span className='error'>Ingrese un correo electrónico válido</span>}
			</div>
			<div className='group'>
				<div className='input-group'>
					<label className='label' htmlFor='name'>
						Nombre completo del participante
					</label>
					<input ref={register({ required: true })} className='input' name='name' id='name' type='text' />

					{errors.name && <span className='error'>Ingrese su nombre completo</span>}
				</div>
				<div className='input-group tiny'>
					<label className='label' htmlFor='age'>
						Edad del participante
					</label>
					<input ref={register({ required: true })} className='input' name='age' id='age' type='number' min='0' />
					{errors.age && <span className='error'>Ingrese una edad</span>}
				</div>
			</div>
			<div className='checkbox'>
				<input ref={register} type='checkbox' name='personal-check' id='personal-check' className='check' />
				<label htmlFor='personal-check' className='label'>
					Corroboración en persona
				</label>
				<div className='info'>
					<div className='icon'>?</div>
					<div className='tooltip'>Esto es una explicación de la corroboración</div>
				</div>
			</div>
			<button type='submit' className='button'>
				Continuar
			</button>
		</form>
	);
};

export default PersonForm;
