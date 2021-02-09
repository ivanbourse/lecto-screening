import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import axios from '../functions/axios';
import { getToken } from '../functions/userManager';
import { addStudent } from '../redux/slices/dashboard';

const AddStudent = () => {
	const dispatch = useDispatch();

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = async data => {
		const dataToSend = { ...data, birthdate: Date.parse(data.date) };
		dispatch(addStudent(dataToSend));
		/* const res = await axios.post(
			'https://lectoscreening.azurewebsites.net/api/modifyStudent?code=mkuDShfl/lWoUNAVVb/MgKGD6EGx1spRKlkBjD6ZMRyQKvp3rjbIYQ==',
			{
				token: getToken,
				action: 'create',
				student: data,
			}
		);
		if (res.status === 200) history.replace('/dashboard'); */
	};

	return (
		<div className='add-student-container'>
			<header className='test-header'>
				<h1 className='title'>Agregar un estudiante</h1>
			</header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='input-group'>
					<label className='label' htmlFor='name'>
						Nombre(s)
					</label>
					<input className='input' name='name' id='name' type='text' ref={register({ required: true })} />
					{errors.name && <span className='error'>Ingrese su(s) nombre(s)</span>}
				</div>
				<div className='input-group'>
					<label className='label' htmlFor='surname'>
						Apellido(s)
					</label>
					<input className='input' name='surname' id='surname' type='text' ref={register({ required: true })} />
					{errors.surname && <span className='error'>Ingrese su(s) apellido(s)</span>}
				</div>
				<div className='input-group'>
					<label className='label' htmlFor='date'>
						Fecha de nacimiento
					</label>
					<input className='input' name='date' id='date' type='date' ref={register({ required: true })} />
					{errors.date && <span className='error'>Ingrese su fecha de nacimiento</span>}
				</div>
				<button className='button' type='submit'>
					Agregar
				</button>
			</form>
		</div>
	);
};

export default AddStudent;
