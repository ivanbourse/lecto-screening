import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'functions/axios';
import Cookies from 'universal-cookie';
import { getToken } from 'functions/userManager';
import { baseUrl } from '../../variables';

export const getStudentInfo = createAsyncThunk('student/getStudentInfo', async (props, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const { data } = await axios.post(baseUrl + 'students/getById', { token, studentId: props });

	const results = [];

	for (const result of data.student.results) {
		// if the result is not finished, go to next iteration in for
		if (!result.finished) continue;
		const { data: resultInfo } = await axios.post('/results/getResult', { token, resultId: result._id });
		const { data: resultStats } = await axios.post('/results/getStatistics', { token, resultId: result._id });
		results.push({ ...resultInfo, ...resultStats });
	}

	return { ...data.student, results };
});

const slice = createSlice({
	name: 'user',
	initialState: {
		student: {},
		loading: false,
		error: { error: false },
	},
	reducers: {
		clearStudent: (state, action) => {
			state.student = {};
			state.loading = false;
			state.error = { error: false };
		},
	},
	extraReducers: {
		[getStudentInfo.fulfilled]: (state, action) => {
			state.student = action.payload;
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
