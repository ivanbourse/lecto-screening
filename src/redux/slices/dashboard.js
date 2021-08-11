import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { history } from '../../components/Router';
import { getToken } from '../../functions/userManager';

export const getInformation = createAsyncThunk('dashboard/getInformation', async (student, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const user = await axios.post(
		'https://screeninglecto.azurewebsites.net/api/getProfile?code=o0y5IreYmcmafdaU111wKKEHevBoZqt2MwFOVFCvfwxU/yF6LnkwlA==',
		{ token }
	);
	const students = await axios.post(
		'https://screeninglecto.azurewebsites.net/api/getStudents?code=L4IAbrbsuwNUkh768symXUZI2HUks1RryK3jgcRnAD/Jabm4Q2xQyQ==',
		{ token }
	);
	return { user: user.data, students: students.data };
});

export const buyTests = createAsyncThunk('dashboard/buyTests', async (props, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const request = await axios.post(
		'https://screeninglecto.azurewebsites.net/api/buyTests?code=1gvBnv0Y5fCC0RpCO5pxXkAzVsPzyGYkgq1Akg4P45Cqb3dOYNI9Hw==',
		{ token, amount: 10 }
	);
	return request.data.paidTests;
});

export const addStudent = createAsyncThunk('dashboard/addStudent', async (student, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;

	const request = await axios.post(
		//'https://screeninglecto.azurewebsites.net/api/modifyStudent?code=NAehyIjiG4mXnfywzerMJYpTbcL1sU0gX6DhMxOTOnqOEaOKPzDAjA==',
		'http://localhost:7071/api/modifyStudent',
		{ token, action: 'create', student }
	);
	history.replace('/dashboard');
	return request.data;
});

export const getStudent = createAsyncThunk('dashboard/getStudent', async (id, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const { data: students } = await axios.post(
		'https://screeninglecto.azurewebsites.net/api/getStudents?code=L4IAbrbsuwNUkh768symXUZI2HUks1RryK3jgcRnAD/Jabm4Q2xQyQ==',
		{ token }
	);

	const [currentStudent] = students.filter(student => student._id === id);
	return currentStudent;
});

const slice = createSlice({
	name: 'dashboard',
	initialState: {
		status: 'idle',
		user: {},
		students: [],
		currentStudent: {},
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getInformation.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.students = action.payload.students;
				state.status = 'succeeded';
			})
			.addCase(buyTests.fulfilled, (state, action) => {
				state.user.paidTests = action.payload;
				state.status = 'succeeded';
			})
			.addCase(getStudent.fulfilled, (state, action) => {
				state.currentStudent = action.payload;
				state.status = 'succeeded';
			})
			.addMatcher(
				action => action.type.endsWith('rejected'),
				(state, action) => {
					state.status = 'failed';
					state.error = action.error.message;
				}
			)
			.addMatcher(
				action => action.type.endsWith('pending'),
				(state, action) => {
					state.status = 'loading';
				}
			);
	},
});

// export const { } = slice.actions;

export default slice.reducer;
