import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import questions from './slices/questions';
import dashboard from './slices/dashboard';
import student from './slices/student';

export default configureStore({
	reducer: { user, questions, dashboard, student },
});
