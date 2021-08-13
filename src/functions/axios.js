import axiosDefault from 'axios';
import { baseUrl } from '../variables'

const axios = axiosDefault.create({
	baseURL: baseUrl,
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
