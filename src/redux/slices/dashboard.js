import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInformation = createAsyncThunk('questions/getInformation', async (student, thunkAPI) => {
    const token = thunkAPI.getState().user.user.token;
    console.log(token)
    const user = await axios.post(
        'https://lectoscreening.azurewebsites.net/api/getProfile?code=ZcpRRm50vj2oZ/9/JWbfUgQh8gtn/DHpkm65XojQY8xNx959B145YQ==',
        { token }
    );
    const students = await axios.post(
        'https://lectoscreening.azurewebsites.net/api/getStudents?code=2/GZhBAtIoCCVg/bi4dOxuhyhbW3WNiEo5qSr3KY1wjmsrXz/3OGXw==',
        { token }
    );
    return {user: user.data, students: students.data}
});

export const buyTests = createAsyncThunk('questions/buyTests', async (props, thunkAPI) => {
    const token = thunkAPI.getState().user.user.token;
    console.log(token)
    const request = await axios.post(
        'https://lectoscreening.azurewebsites.net/api/buyTests?code=88lz0dux/0Z2qq6zaKaV6pMSzoMsiAriPToGK7Ktwa9ptu6zHxSimA==',
        { token, amount: 10 }
    );
    return request.data.paidTests;
})


const slice = createSlice({
	name: 'dashboard',
	initialState: {
        status: 'idle',
        user: {},
        students: [],
    },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getInformation.fulfilled,
			(state, action) => {
				state.user = action.payload.user;
				state.students = action.payload.students;
                state.status = 'succeeded';
			})
        .addCase(
            buyTests.fulfilled,
            (state, action) => {
                state.user.paidTests = action.payload;
            }
        )
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

// export const { } = slice.actions;

export default slice.reducer;