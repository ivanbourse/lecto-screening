import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../functions/axios';

export const loadUser = createAsyncThunk('user/signIn', async data => {
	const user = await axios.post(
		'https://lectoscreening.azurewebsites.net/api/signIn?code=moDZJeW5hJ82kxHBsCW525y1yeyjl9LWHqhDDqumMukTUe5BPLM0JA==',
		data
	);
	if (user.status === 200) {
		localStorage.setItem('token', JSON.stringify(user.data.token));
		return { ...user.data, loggedIn: true };
	}
});

const slice = createSlice({
	name: 'user',
	initialState: {
		user: {},
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
			state.error = { error: true, data: action.payload };
			state.loading = false;
		},
	},
});

export const { setUser } = slice.actions;

export default slice.reducer;
