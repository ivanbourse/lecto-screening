import React from 'react';
import RouterComponent from './components/Router';

import { useSelector, useDispatch } from 'react-redux';

function App() {
	return (
		<div className='App'>
			<RouterComponent />
		</div>
	);
}

export default App;
