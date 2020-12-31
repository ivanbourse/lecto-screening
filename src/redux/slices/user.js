import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            state = action.payload;
        }
    }
});

export const {setUser} = slice.actions;

export default slice.reducer;