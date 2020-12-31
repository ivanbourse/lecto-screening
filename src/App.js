import React from 'react';
import RouterComponent from './components/Router';

import {loadQuestions} from './redux/slices/questions'
import {useSelector, useDispatch} from 'react-redux';

function App() {
	const dispatch = useDispatch();
	const posts = useSelector(state => state.questions);

	React.useEffect (() => {
		dispatch(loadQuestions());
		console.log(posts);
	}, []);

	return (
		<div className='App'>
			<RouterComponent />
		</div>
	);
}

export default App;
