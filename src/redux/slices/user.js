import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../functions/axios';
import Cookies from 'universal-cookie';
import { isLoggedIn, logOut, setToken } from '../../functions/userManager';

export const signIn = createAsyncThunk('user/signIn', async data => {
	const user = await axios.post(
		'https://screeninglecto.azurewebsites.net/api/signIn?code=FkhKKvC7Xluhv8gFJx/svk4ATZKwAN5y1GialwXpsYWBf9opmsV7OA==',
		data
	);
	//if (user.status === 400) throw new Error(user.data.status);
	setToken(user.data.token);
	return { ...user.data, loggedIn: true };
});

export const keepAlive = createAsyncThunk('user/keepAlive', async (token, thunkApi) => {
	thunkApi.dispatch(slice.actions.setUser({ token, loggedIn: true }));
	const user = await axios.post(
		'https://screeninglecto.azurewebsites.net/api/validateToken?code=N3PoglF6AL/28aGPsSaYIOvSVpcti0BMfGGbGpZ5NJcW7X4SKAkCLA==',
		{ token }
	);
	setToken(user.data.token);
	return { ...user.data, loggedIn: true };
});

export const signUp = createAsyncThunk('user/signUp', async data => {
	const user = await axios.post(
		'https://screeninglecto.azurewebsites.net/api/signUp?code=qH6D0Qm1ncEj1X4pr/Vq3pNBdL8xqbS0u7FdmNVwLWTdXlBAhX0YVg==',
		data,
		{ validateStatus: status => status === 400 || status === 200 }
	);

	if (user.status === 400) throw new Error(user.data.status);
	setToken(user.data.token);
	return { ...user.data, loggedIn: true };
});

export const signOut = createAsyncThunk('user/signOut', (data, thunkApi) => {
	logOut();
	thunkApi.dispatch(slice.actions.clearUser());
});

const slice = createSlice({
	name: 'user',
	initialState: {
		user: { token: '' },
		loading: false,
		loggedIn: isLoggedIn,
		error: { error: false },
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state, action) => {
			state.user = { token: '' };
			state.loading = false;
			state.loggedIn = false;
			state.error = { error: false };
		},
	},
	extraReducers: {
		[signIn.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loggedIn = true;
			state.loading = false;
		},
		[signIn.pending]: (state, action) => {
			state.loading = true;
		},
		[signIn.rejected]: (state, action) => {
			state.error = { error: true, data: action.error.message };
			state.loading = false;
		},
		[signUp.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loggedIn = true;
			state.loading = false;
			state.error = { error: false };
		},
		[signUp.pending]: (state, action) => {
			state.loading = true;
		},
		[signUp.rejected]: (state, action) => {
			state.error = { error: true, data: action.error.message };
			state.loading = false;
		},
		[keepAlive.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loggedIn = true;
			state.loading = false;
		},
		[keepAlive.pending]: (state, action) => {
			state.loading = true;
		},
		[keepAlive.rejected]: (state, action) => {
			state.error = { error: true, data: action.error.message };
			state.loading = false;
		},
	},
});

export const { setUser } = slice.actions;

export default slice.reducer;
