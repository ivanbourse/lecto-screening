import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: "questions",
    initialState: {},
    reducers: {
        setQuestions: (state, action) => {
            state = action.payload;
        }
    }
})

export const actions = slice.actions;

export default slice.reducer;