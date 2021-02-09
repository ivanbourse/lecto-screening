import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	questions: [],
	answers: [],
	status: 'idle', // status: 'idle' | 'loading' | 'succeeded' | 'failed',
	error: null, // error: string | null
	current: 0,
	started: false,
	animate: false,
	finished: false,
};

export const startTest = createAsyncThunk('questions/startTest', async (student, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token;
	const result = await axios.post(
		'https://lectoscreening.azurewebsites.net/api/startTest?code=xIyaWjheKL6m06IQQ0qaTFvFDXnamRdAemTuaCR7s/zsNubvv50JZA==',
		{token, student },
	);
	return {data: result.data, student};
});

export const nextQuestion = createAsyncThunk('questions/nextQuestion', async (student, thunkAPI) => {
	thunkAPI.dispatch(slice.actions.startAnimation());
	const state = thunkAPI.getState();
	const currentQuestion = state.questions.current;
	const result = await axios.post(
		'https://lectoscreening.azurewebsites.net/api/answerQuestion?code=Shl9AafLPYahhsnVAwx/yX3F/a7toZSUjMaIvUC36omghB9TXLJDZw==',
		{token: state.user.user.token, student: state.questions.student, resultId: state.questions.resultId, question: currentQuestion, answer: state.questions.answers[currentQuestion].answer }
	);
});

const slice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		setQuestions: (state, action) => {
			state = action.payload;
		},
		startAnimation: (state, action) => {
			state.animate = true;
		},
		setAnswer: (state, action) => {
			state.answers[state.current].answered = true;
			state.answers[state.current].answer = action.payload;
		},
		resetTest: (state, action) => {
			state.current = 0;
			state.finished = false;

			state.answers.forEach(answer => {
				answer.answered = false;
				answer.answer = {};
			});
		},
		afterAnimation: (state, action) => {
			if (state.questions.length - 1 > state.current) state.current++;
			else state.finished = true;
			state.animate = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			startTest.fulfilled,
			(state, action) => {
				state.status = 'succeeded';
				state.student = action.payload.student;
				state.questions = action.payload.data.questions;
				state.answers = Array(action.payload.data.questions.length).fill({ answered: false, answer: {} });
				state.testId = action.payload.data.testId;
				state.resultId = action.payload.data.resultId;
				state.started = true;
			})
		.addMatcher(
			(action) => action.type.endsWith('rejected'), 
			(state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
		.addMatcher(
			(action) => action.type.endsWith('pending'),
			(state, action) => {
				state.status = 'loading';
			})
	},
});

export const { setQuestions, setAnswer, resetTest, afterAnimation } = slice.actions;

export default slice.reducer;