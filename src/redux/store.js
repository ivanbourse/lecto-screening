import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user'
import questions from './slices/questions'
import answers from './slices/answers'

export default configureStore({
    reducer: { user, questions, answers },
});