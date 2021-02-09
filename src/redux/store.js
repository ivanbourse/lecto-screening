import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import questions from './slices/questions';
import dashboard from './slices/dashboard';


export default configureStore({
	reducer: { user, questions, dashboard },
});
