import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	questions: [],
	answers: [],
	status: 'idle', // status: 'idle' | 'loading' | 'succeeded' | 'failed',
	error: null, // error: string | null
	current: 20,
	animate: false,
	finished: false,
};

// Aquí comienzan los Thunks

export const loadQuestions = createAsyncThunk('questions/loadQuestions', async () => {
	const result = await axios.get(
		'https://lectoscreening.azurewebsites.net/api/getTest?code=wi8yWCGCTkSurHTarF0VpyXDCxBeQd6XnSU/zRb3aejjoI8c5Q0aHQ=='
	);
	return result;
});

// Create Async Thunk puede ser usado para hacer get o post a una API.

const slice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		setQuestions: (state, action) => {
			state = action.payload;
		},
		nextQuestion: (state, action) => {
			state.animate = true;
		},
		setAnswer: (state, action) => {
			state.answers[state.current].answered = true;
			state.answers[state.current].answer = action.payload;
		},
		resetTest: (state, action) => {
			state.current = 20;
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
	extraReducers: {
		[loadQuestions.pending]: (state, action) => {
			state.status = 'loading';
		},
		[loadQuestions.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.questions = action.payload.data.questions;
			state.answers = Array(action.payload.data.questions.length).fill({ answered: false, answer: {} });
		},
		[loadQuestions.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
	},
});

export const { setQuestions, nextQuestion, setAnswer, resetTest, afterAnimation } = slice.actions;

export default slice.reducer;
