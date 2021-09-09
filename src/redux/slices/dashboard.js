import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { history } from '../../components/Router';
import { getToken } from 'functions/userManager';
import { baseUrl } from '../../variables';

export const getInformation = createAsyncThunk('dashboard/getInformation', async (student, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const user = await axios.post(baseUrl + 'users/get', { token });
	const students = await axios.post(baseUrl + 'students/get', { token });
	return { user: user.data, students: students.data };
});

export const buyTests = createAsyncThunk('dashboard/buyTests', async (props, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const request = await axios.post(baseUrl + 'users/buyTests', { token, amount: 10 });
	return request.data.paidTests;
});

export const addStudent = createAsyncThunk('dashboard/addStudent', async (student, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;

	const request = await axios.post(baseUrl + 'students/create', { token, student });

	history.replace('/dashboard');
	return request.data;
});

export const getStudent = createAsyncThunk('dashboard/getStudent', async (id, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const { data: students } = await axios.post(baseUrl + 'students/get', { token });

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
		exerciseResults: {
			dyscalculia: {
				'reaction-time': [],
				'dots-comparison': [],
				'match-points-number': [],
				'symbolic-magnitude': [],
				'numeric-line': [],
				'simple-arithmetic': [],
				counting: [],
				'match-sample': [],
			},
			dyslexia: {
				'multiple-choice': [],
				'letters-question': [],
				matching: [],
				syllables: [],
				'contains-letter': [],
				'say-items': [],
				'match-words': [],
				'nonexisting-words': [],
			},
		},
		popupOpen: false,
		exercise: {},
	},
	reducers: {
		setPopupOpen: (state, action) => {
			state.popupOpen = action.payload;
		},
		setExercise: (state, action) => {
			state.exercise = action.payload;
		},
		setExerciseResults: (state, action) => {
			state.exerciseResults = action.payload;
		},
		addExerciseToResults: (state, action) => {
			state.exerciseResults[action.payload.testType][action.payload.type].push(action.payload.result);
		},
	},
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

export const { setPopupOpen, setExercise, setExerciseResults, addExerciseToResults } = slice.actions;

export default slice.reducer;
