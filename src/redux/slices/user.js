import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'functions/axios';
import Cookies from 'universal-cookie';
import { isLoggedIn, logOut, setToken } from 'functions/userManager';
import { baseUrl } from '../../variables';

export const signIn = createAsyncThunk('user/signIn', async data => {
	const user = await axios.post(baseUrl + 'users/signIn', data);
	//if (user.status === 400) throw new Error(user.data.status);
	setToken(user.data.token);
	return { ...user.data, loggedIn: true };
});

export const keepAlive = createAsyncThunk('user/keepAlive', async (token, thunkApi) => {
	thunkApi.dispatch(slice.actions.setUser({ token, loggedIn: true }));
	const user = await axios.post(baseUrl + 'users/validateToken', { token });
	setToken(user.data.token);
	return { ...user.data, loggedIn: true };
});

export const signUp = createAsyncThunk('user/signUp', async data => {
	const user = await axios.post(baseUrl + 'users/signUp', data, {
		validateStatus: status => status === 400 || status === 200,
	});

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
		login: {
			loading: false,
			error: { error: false },
		},
		register: {
			loading: false,
			error: { error: false },
		},
		loggedIn: isLoggedIn,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state, action) => {
			state.user = { token: '' };
			state.loggedIn = false;

			state.login.loading = false;
			state.register.loading = false;
			state.login.error = { error: false };
			state.register.error = { error: false };
		},
	},
	extraReducers: {
		[signIn.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loggedIn = true;
			state.login.loading = false;
		},
		[signIn.pending]: (state, action) => {
			state.login.loading = true;
		},
		[signIn.rejected]: (state, action) => {
			state.login.error = { error: true, data: action.error.message };
			state.login.loading = false;
		},
		[signUp.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loggedIn = true;
			state.register.loading = false;
			state.register.error = { error: false };
		},
		[signUp.pending]: (state, action) => {
			state.register.loading = true;
		},
		[signUp.rejected]: (state, action) => {
			state.register.error = { error: true, data: action.error.message };
			state.register.loading = false;
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

export const { setUser, clearUser } = slice.actions;

export default slice.reducer;
