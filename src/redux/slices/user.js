import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../functions/axios';

export const loadUser = createAsyncThunk('user/signIn', async data => {
	/* const user = await axios.post('', data);
    console.log(user); */
	localStorage.setItem('user', JSON.stringify(data));
	return { c: data };
	//if (user.status === 200) return user;
});

const slice = createSlice({
	name: 'user',
	initialState: {
		user: {},
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
		},
		[loadUser.rejected]: (state, action) => {
			state.error = { error: true, data: action.payload };
		},
	},
});

export const { setUser } = slice.actions;

export default slice.reducer;
