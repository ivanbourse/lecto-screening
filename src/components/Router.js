import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Landing from '../pages/Landing';
import Test from '../pages/Test';
import FinishedTest from '../pages/FinishedTest';
import Tutorial from '../pages/Tutorial';
import VerifyEmail from '../pages/VerifyEmail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AddStudent from '../pages/AddStudent';

export const history = createBrowserHistory();

const RouterComponent = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path='/' component={Landing} />
				{/* <Route exact path='/get-started' component={GetStarted} />
				<Route path='/get-started/:type' component={GetStartedForm} /> */}
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/dashboard/add-student' component={AddStudent} />
				<Route path='/tutorial' component={Tutorial} />
				<Route path='/test' component={Test} />
				<Route path='/finished-test' component={FinishedTest} />
				<Route path='/verify/:token' component={VerifyEmail} />
			</Switch>
		</Router>
	);
};

export default RouterComponent;
