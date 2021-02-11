import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VerifyEmail = props => {
	const { token } = useParams();
	const [loading, setLoading] = useState();

	useEffect(() => {
		const verify = async () => {
			const res = await axios.get(`https://lectoscreening.azurewebsites.net/api/verifyEmail/${token}`);
		};
		verify();
	}, []);

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
