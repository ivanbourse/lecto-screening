import { Link } from 'react-router-dom';

const VerifyEmail = props => {
	return (
		<div className='verify-email-container'>
			<h1 className='title'>¡Tu cuenta fue verificada correctamente!</h1>
			<h2 className='subtitle'>Ya podés iniciar sesión para ver y agregar estudiantes o solicitar tests</h2>
			<Link to='/dashboard' className='button'>
				Ir al panel
			</Link>
		</div>
	);
};

export default VerifyEmail;
