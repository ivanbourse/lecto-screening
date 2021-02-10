import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const getToken = cookies.get('token');

export const setToken = token => {
	const expireDate = new Date();
	expireDate.setTime(expireDate.getTime() + 3 * 3600 * 1000);
	cookies.set('token', token, { expires: expireDate });
};

export const isLoggedIn = !!cookies.get('token');

export const logOut = () => cookies.remove('token');
