import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing';
import GetStarted from '../pages/GetStarted';
import GetStartedForm from '../pages/GetStartedForm';
import Test from '../pages/Test';
import FinishedTest from '../pages/FinishedTest';

const RouterComponent = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/get-started' component={GetStarted} />
				<Route path='/get-started/:type' component={GetStartedForm} />
				<Route path='/test' component={Test} />
				<Route path='/finished-test' component={FinishedTest} />
			</Switch>
		</Router>
	);
};

export default RouterComponent;
