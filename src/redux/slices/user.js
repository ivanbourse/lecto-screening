import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../functions/axios';
import Cookies from 'universal-cookie';
import { setToken } from '../../functions/userManager';

const cookies = new Cookies();

export const loadUser = createAsyncThunk('user/signIn', async data => {
	const user = await axios.post(
		'https://lectoscreening.azurewebsites.net/api/signIn?code=moDZJeW5hJ82kxHBsCW525y1yeyjl9LWHqhDDqumMukTUe5BPLM0JA==',
		data
	);

	if (user.status !== 200) return;
	//localStorage.setItem('token', JSON.stringify(user.data.token));
	setToken(user.data.token);

	return { ...user.data, loggedIn: true };
});

export const signUp = createAsyncThunk('user/signUp', async data => {
	console.log(data);
	const user = await axios.post(
		'https://lectoscreening.azurewebsites.net/api/signUp?code=TOwMm5Fpckye1GeglPi6RHy6k51l3PHAJ2rwhK5aujAYaK9UDZXYpA==',
		data,
		{ validateStatus: status => status === 400 || status === 200 }
	);

	if (user.status === 400) throw new Error(user.data.status);
	//localStorage.setItem('token', user.data.token);
	setToken(user.data.token);
	return { ...user.data, loggedIn: true };
});

const slice = createSlice({
	name: 'user',
	initialState: {
		user: {
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVsaWxvcGV6cGFjaG9AZ21haWwuY29tIiwiaWF0IjoxNjEyNjM0MDQ0LCJleHAiOjE2MTI2NDQ4NDR9.-TXJsUJrymNcCf9RZIyBfZNCT-DPZQ8p-tVxOBkw1xM',
		},
		loading: false,
		loggedIn: false,
		error: {
			error: false,
		},
	},
	reducers: {
		setUser: (state, action) => {
			state = action.payload;
		},
	},
	extraReducers: {
		[loadUser.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loggedIn = true;
			state.loading = false;
		},
		[loadUser.pending]: (state, action) => {
			state.loading = true;
		},
		[loadUser.rejected]: (state, action) => {
			state.error = { error: true, data: action.error.message };
			state.loading = false;
		},
		[signUp.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loggedIn = true;
			state.loading = false;
		},
		[signUp.pending]: (state, action) => {
			state.loading = true;
		},
		[signUp.rejected]: (state, action) => {
			state.error = { error: true, data: action.error.message };
			state.loading = false;
		},
	},
});

export const { setUser } = slice.actions;

export default slice.reducer;
