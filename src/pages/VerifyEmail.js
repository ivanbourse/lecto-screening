import { Link } from 'react-router-dom';

const VerifyEmail = props => {
	return (
		<div className='verify-email-container'>
			<h1>¡Tu cuenta fue verificada correctamente!</h1>
			<p>Ya podés iniciar sesión para ver y agregar estudiantes o solicitar tests</p>
			<Link to='/login' className='button'>
				Iniciar sesión
			</Link>
		</div>
	);
};

export default VerifyEmail;
