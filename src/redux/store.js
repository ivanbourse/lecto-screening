import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import questions from './slices/questions';

export default configureStore({
	reducer: { user, questions },
});
