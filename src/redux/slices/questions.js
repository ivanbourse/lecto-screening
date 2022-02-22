import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateTest } from 'functions/generateTest';
import { getToken } from 'functions/userManager';
import { correctCountMap } from 'utils/getCorrectCount';

import discalculiaJSON from 'functions/test-discalculia.json';
import dislexiaJSON from 'functions/test-dislexia.json';
import { getAnswerInfo } from 'utils/checkCorrect';
import axios from 'functions/axios';

const initialState = {
	questions: [],
	testType: '',
	answers: [],
	status: 'idle', // status: 'idle' | 'loading' | 'succeeded' | 'failed',
	error: null, // error: string | null
	current: 0,
	started: false,
	animate: false,
	finished: false,
	resultId: '',
};

const getAnswersAndScore = async (questions, type) => {
	const allExercises = questions.filter(question => question.screenType === 'exercise' && question.type === type);
	const score = 0;

	console.log({ allExercises, score });
};

export const startTest = createAsyncThunk('questions/startTest', async ({ student, type }, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token || getToken;
	const typesMap = {
		dyscalculia: 'Discalculia',
		dyslexia: 'Dislexia',
	};
	const { data: resultData } = await axios.post('/test/start', { token, student, testType: typesMap[type] });

	const test = await generateTest(type === 'dyslexia' ? dislexiaJSON : discalculiaJSON);

	return { data: test, testType: type, student, resultId: resultData.resultId };
});

export const nextQuestion = createAsyncThunk('questions/nextQuestion', async (answer, thunkAPI) => {
	try {
		thunkAPI.dispatch(slice.actions.startAnimation());
		const state = await thunkAPI.getState();

		const { questions, current, testType, resultId } = state.questions;
		const { user } = state.user;

		const { screenType, ...currentQuestion } = questions[current];
		const isExercise = screenType === 'exercise';
		const isPractice = screenType === 'practice';

		const tempAnswer = {};

		/* if (isExercise) {
			const result = await axios.post('/test/answerQuestion', {
				token: state.user.user.token || getToken,
				student: student,
				resultId: resultId,
				questionName: currentQuestion.title || currentQuestion.type || 'no-name',
				score: 0,
				answer,
			});
		} */

		if (isExercise || isPractice) {
			const answerInfo = getAnswerInfo(testType, currentQuestion, answer);
			tempAnswer.type = currentQuestion.type;
			tempAnswer.answerInfo = { ...answerInfo, time: answer.time };

			tempAnswer.answered = isExercise;
			tempAnswer.saveValue = isExercise;

			return tempAnswer;
		}

		return {};
	} catch (err) {
		console.log(err);
	}
});

export const finishTest = createAsyncThunk('questions/finishTest', async (payload, thunkAPI) => {
	const state = thunkAPI.getState();

	const { data: resultData } = await axios.post('/test/finishTest', {
		token: state.user.user.token || getToken,
		student: state.questions.student,
		resultId: state.questions.resultId,
	});

	return true;
});

export const sendAnswers = createAsyncThunk('questions/sendAnswers', async ({ type, uid }, thunkAPI) => {
	const state = thunkAPI.getState();
	const { answers, resultId, student } = state.questions;
	const { user } = state.user;

	const allTypeAnswers = answers.filter(item => {
		if (uid) return item.uid === uid && item.saveValue === true;

		return item.type === type && item.saveValue === true;
	});

	/* const allTypeAnswers = answers.filter(item => item.type === type && item.saveValue === true); */

	console.log(allTypeAnswers);

	const correctCount = correctCountMap[type](allTypeAnswers) || 0;

	const result = await axios.post('/test/answerQuestion', {
		token: user.token || getToken,
		student,
		resultId,
		questionName: uid ? `${type}-${uid}` : type,
		score: correctCount,
		answer: allTypeAnswers,
	});

	return true;
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
			state.animate = true;
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
	extraReducers: builder => {
		builder
			.addCase(startTest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.student = action.payload.student;
				state.questions = action.payload.data;
				state.testType = action.payload.testType;
				state.answers = Array(action.payload.data.length).fill({ answered: false, answer: {} });
				state.testId = action.payload.data.testId;
				state.resultId = action.payload.resultId;
				state.started = true;
			})
			.addCase(nextQuestion.fulfilled, (state, action) => {
				state.answers[state.current] = action.payload;
			})
			.addCase(sendAnswers.fulfilled, (state, action) => {
				state.animate = true;
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

export const { setQuestions, setAnswer, resetTest, afterAnimation } = slice.actions;

export default slice.reducer;
