import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	questions: [],
	answers: [],
	status: 'idle', // status: 'idle' | 'loading' | 'succeeded' | 'failed',
	error: null, // error: string | null
	current: 0,
	finished: false,
};

// Aquí comienzan los Thunks

export const loadQuestions = createAsyncThunk('questions/loadQuestions', async () => {
	const result = await axios.get('https://run.mocky.io/v3/25ed3f7d-f039-4e56-936e-90364bec2188');
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
			if (state.questions.length > state.current) state.current++;
			else state.finished = true;
		},
		setAnswer: (state, action) => {
			state.answers[state.current].answered = true;
			state.answers[state.current].answer = action.payload;
		},
	},
	extraReducers: {
		[loadQuestions.pending]: (state, action) => {
			state.status = 'loading';
		},
		[loadQuestions.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.questions = action.payload.data;
			state.answers = Array(action.payload.data.length).fill({ answered: false, answer: {} });
		},
		[loadQuestions.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
	},
});

export const { setQuestions, nextQuestion, setAnswer } = slice.actions;

export default slice.reducer;
