import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: "answers",
    initialState: {},
    reducers: {
        setAnswer: (state, action) => {
            state = action.payload;
        }
    }
})

export const actions = slice.actions;

export default slice.reducer;