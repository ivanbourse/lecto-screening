import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../functions/axios';
import Cookies from 'universal-cookie';
import { getToken } from '../../functions/userManager';

export const getStudentInfo = createAsyncThunk('student/getStudentInfo', async (props, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const { data } = await axios.post('http://localhost:7071/api/getStudent', { token, id: props });
	console.log(data);

	return data;
});

const slice = createSlice({
	name: 'user',
	initialState: {
		student: {},
		results: [],
		loading: false,
		error: { error: false },
	},
	reducers: {
		clearStudent: (state, action) => {
			state.student = {};
			state.results = {};
			state.loading = false;
			state.error = { error: false };
		},
	},
	extraReducers: {
		[getStudentInfo.fulfilled]: (state, action) => {
			state.student = action.payload.student;
			state.results = action.payload.results;
			state.loading = false;
		},
		[getStudentInfo.pending]: (state, action) => {
			state.loading = true;
		},
		[getStudentInfo.rejected]: (state, action) => {
			state.error = { error: true, data: action.error.message };
			state.loading = false;
		},
	},
});

export const { setStudent } = slice.actions;

export default slice.reducer;
