import user from './slices/user'
import questions from './slices/questions'
import answers from './slices/answers'
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: { user, questions, answers },
});  