import React from 'react';

const ExerciseContainer = props => {
	return <div className={`test-exercise-container ${props.classes}`}>{props.children}</div>;
};

export default ExerciseContainer;
