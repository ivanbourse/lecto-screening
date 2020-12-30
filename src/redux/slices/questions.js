import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    questions: [],
    status: 'idle', // status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null, // error: string | null
}

// Aquí comienzan los Thunks

export const loadQuestions = createAsyncThunk("questions/loadQuestions", async () => {
    const result = await axios.get("https://opentdb.com/api.php?amount=10&category=18");
    return result;
});

// Create Async Thunk puede ser usado para hacer get o post a una API.

const slice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state = action.payload;
        },
    },
    extraReducers: {
        [loadQuestions.pending]: (state, action) => {
            state.status = 'loading'
        },
        [loadQuestions.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts = state.questions.push(action.payload)
        },
        [loadQuestions.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    }
});

export const { setQuestions } = slice.actions;

export default slice.reducer;