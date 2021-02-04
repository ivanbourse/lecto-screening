import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
	const [data, setData] = useState({});
	useEffect(() => {
		const fetch = async () => {
			const res = await axios.post(
				'https://lectoscreening.azurewebsites.net/api/getProfile?code=ZcpRRm50vj2oZ/9/JWbfUgQh8gtn/DHpkm65XojQY8xNx959B145YQ==',
				{ token: JSON.parse(localStorage.getItem('token')) }
			);
			console.log(res);
			setData(res.data);
		};
		fetch();
	}, []);

	return (
		<>
			<header className='test-header'>
				<h1 className='title'>¡Hola {data?.name}!</h1>
			</header>
			<div className='dashboard-container'>
				<div className='buttons'>
					<div className='button'>
						<img src='https://picsum.photos/200' alt='' srcset='' />
						<p className='label'>Comprar tests</p>
					</div>
					<div className='button'>
						<img src='https://picsum.photos/200' alt='' srcset='' />
						<p className='label'>Comprar tests</p>
					</div>
					<div className='button'>
						<img src='https://picsum.photos/200' alt='' srcset='' />
						<p className='label'>Comprar tests</p>
					</div>
					<div className='button'>
						<img src='https://picsum.photos/200' alt='' srcset='' />
						<p className='label'>Comprar tests</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
