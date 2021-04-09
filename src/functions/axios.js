import axiosDefault from 'axios';

const axios = axiosDefault.create({
	baseURL: 'https://screeninglecto.azurewebsites.net',
});

const token = localStorage.getItem('user')?.token || '';

axios.interceptors.request.use(
	function (config) {
		config.headers = {
			...config.headers,
			token,
		};

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default axios;
