import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import axios from '../functions/axios';
import { getToken } from '../functions/userManager';
import { addStudent } from '../redux/slices/dashboard';

const RadioButton = React.forwardRef(({ label, ...props }, ref) => {
	return (
		<label className='radio-container'>
			{label}
			<input type='radio' ref={ref} {...props} />
			<span className='radio'></span>
		</label>
	);
});

const AddStudent = () => {
	const dispatch = useDispatch();

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = async data => {
		const [year, month] = data.date.split('-');
		const { date, ...dataToSend } = { ...data, birth: { year, month } };
		dispatch(addStudent(dataToSend));
	};

	return (
		<div className='add-student-container'>
			<header className='test-header'>
				<h1 className='title'>Agregar un estudiante</h1>
			</header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='input-group'>
					<label className='label' htmlFor='alias'>
						Alias (para identificarlo/a)
					</label>
					<input className='input' name='alias' id='alias' type='text' ref={register({ required: true })} />
					{errors.alias && <span className='error'>Ingrese un alias</span>}
				</div>

				<div className='input-group'>
					<label className='label' htmlFor='date'>
						Mes y año de nacimiento
					</label>
					<input className='input' name='date' id='date' type='month' ref={register({ required: true })} />
					{errors.date && <span className='error'>Ingrese el mes y año de nacimiento</span>}
				</div>

				<div className='input-group'>
					<label className='label'>Tipo de gestión de la escuela</label>

					<RadioButton label='Pública' value='public' name='schoolType' id='school-type-public' ref={register} />
					<RadioButton label='Privada' value='private' name='schoolType' id='school-type-private' ref={register} />

					{errors.schoolType && <span className='error'>Ingrese el tipo de gestión del colegio</span>}
				</div>

				<div className='input-group'>
					<label className='label'>Género de el/la estudiante</label>

					<RadioButton label='Mujer' value='female' name='genre' id='genre-female' ref={register} />
					<RadioButton label='Hombre' value='male' name='genre' id='genre-male' ref={register} />
					<RadioButton label='Otro' value='other' name='genre' id='genre-other' ref={register} />

					{errors.genre && <span className='error'>Ingrese el género de el/la estudiante</span>}
				</div>

				<div className='input-group'>
					<label className='label' htmlFor='province'>
						Provincia
					</label>
					<input className='input' name='province' id='province' type='text' ref={register({ required: true })} />
					{errors.province && <span className='error'>Ingrese la provincia del estudiante</span>}
				</div>

				<div className='input-group'>
					<label className='label' htmlFor='locality'>
						Localidad
					</label>
					<input className='input' name='locality' id='locality' type='text' ref={register({ required: true })} />
					{errors.locality && <span className='error'>Ingrese la localidad del estudiante</span>}
				</div>

				<div className='input-group'>
					<label className='label'>Mano hábil de el/la estudiante</label>
					<RadioButton label='Derecha' value='right' name='hand' id='hand-left' ref={register} />
					<RadioButton label='Izquierda' value='left' name='hand' id='hand-right' ref={register} />
				</div>

				<div className='input-group'>
					<label className='label'>Nivel educativo de los padres</label>
					<RadioButton label='Primaria' value='primary' name='parentsLevel' id='parents-level-primary' ref={register} />
					<RadioButton
						label='Secundaria'
						value='secondary'
						name='parentsLevel'
						id='parents-level-secondary'
						ref={register}
					/>
					<RadioButton
						label='Universidad sin terminar'
						value='university-not-finished'
						name='parentsLevel'
						id='parents-level-university-not-finished'
						ref={register}
					/>
					<RadioButton
						label='Universidad terminada'
						value='university-finished'
						name='parentsLevel'
						id='parents-level-university-finished'
						ref={register}
					/>
				</div>

				<button className='button' type='submit'>
					Agregar
				</button>
			</form>
		</div>
	);
};

export default AddStudent;
