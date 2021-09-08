import ExerciseInstructions from 'components/test/ExerciseInstructions';
import Counting from 'components/test/exercises/Counting';
import DotsComparison from 'components/test/exercises/DotsComparison';
import MatchPointsNumber from 'components/test/exercises/MatchPointsNumber';
import NumericLine from 'components/test/exercises/NumericLine';
import ReactionTime from 'components/test/exercises/ReactionTime';
import SimpleArithmetic from 'components/test/exercises/SimpleArithmetic';
import SymbolicMagnitude from 'components/test/exercises/SymbolicMagnitude';
import Test from 'components/test/Test';
import AddStudent from 'pages/AddStudent';
import Dashboard from 'pages/Dashboard';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Result from 'pages/Result';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/test' component={Test} />
				<Route path='/result' component={Result} />

				{/* Exercise Screens */}
				<Route path='/exercise-instructions' component={ExerciseInstructions} />
				<Route path='/exercise/reaction-time' component={ReactionTime} />
				<Route path='/exercise/match-points-number' component={MatchPointsNumber} />
				<Route path='/exercise/symbolic-magnitude' component={SymbolicMagnitude} />
				<Route path='/exercise/numeric-line' component={NumericLine} />
				<Route path='/exercise/simple-arithmetic' component={SimpleArithmetic} />
				<Route path='/exercise/dots-comparison' component={DotsComparison} />
				<Route path='/exercise/counting' component={Counting} />

				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/dashboard/add-student' component={AddStudent} />
				<Route exact path='/dashboard/student/:studentId' component={Result} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
