import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    questions: [],
    status: 'idle', // status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null, // error: string | null
}

// Aquí comienzan los Thunks

export const loadQuestions = createAsyncThunk("questions/loadQuestions", async () => {
    const result = await axios.get("https://run.mocky.io/v3/43953c57-0798-438e-87fb-ee0b9ae120e6");
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
            state.status = 'loading';
        },
        [loadQuestions.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.questions = action.payload;
        },
        [loadQuestions.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    }
});

export const { setQuestions } = slice.actions;

export default slice.reducer;