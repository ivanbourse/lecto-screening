import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing';
import Test from '../pages/Test';
import FinishedTest from '../pages/FinishedTest';
import Tutorial from '../pages/Tutorial';
import VerifyEmail from '../pages/VerifyEmail';
import Login from '../pages/Login';
import Register from '../pages/Register';

const RouterComponent = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Landing} />
				{/* <Route exact path='/get-started' component={GetStarted} />
				<Route path='/get-started/:type' component={GetStartedForm} /> */}
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/dashboard' />
				<Route exact path='/dashboard/add-student' />
				<Route exact path='/dashboard/all-students' />
				<Route exact path='/dashboard/student/:id' />
				<Route path='/tutorial' component={Tutorial} />
				<Route path='/test' component={Test} />
				<Route path='/finished-test' component={FinishedTest} />
				<Route path='/verify/:token' component={VerifyEmail} />
			</Switch>
		</Router>
	);
};

export default RouterComponent;
