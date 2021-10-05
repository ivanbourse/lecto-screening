import Exercise from 'components/exercises/Exercise';
import ExerciseInstructions from 'components/exercises/ExerciseInstructions';

import Counting from 'components/exercises/dyscalculia/Counting';
import DotsComparison from 'components/exercises/dyscalculia/DotsComparison';
import MatchPointsNumber from 'components/exercises/dyscalculia/MatchPointsNumber';
import MatchSample from 'components/exercises/dyscalculia/MatchSample';
import NumericLine from 'components/exercises/dyscalculia/NumericLine';
import ReactionTime from 'components/exercises/dyscalculia/ReactionTime';
import SimpleArithmetic from 'components/exercises/dyscalculia/SimpleArithmetic';
import SymbolicMagnitude from 'components/exercises/dyscalculia/SymbolicMagnitude';

import GapQuestion from 'components/exercises/dyslexia/GapQuestion';
import CountItems from 'components/exercises/dyslexia/CountItems';
import JoinWithArrows from 'components/exercises/dyslexia/JoinWithArrows';
import MultipleChoice from 'components/exercises/dyslexia/MultipleChoice';
import PrevPostNumber from 'components/exercises/dyslexia/PrevPostNumber';
import SayTheLetters from 'components/exercises/dyslexia/SayTheLetters';
import SplitSyllables from 'components/exercises/dyslexia/SplitSyllables';
import ContainsLetter from 'components/exercises/dyslexia/ContainsLetter';
import MatchWordsToImage from 'components/exercises/dyslexia/MatchWordsToImage';
import PracticeFeedback from 'components/exercises/PracticeFeedback';
import SendResults from 'components/exercises/SendResults';

export const screenTypesComponentsMap = {
	instructions: () => <ExerciseInstructions />,
	practice: () => <Exercise />,
	exercise: () => <Exercise />,
	'practice-feedback': () => <PracticeFeedback />,
	'practice-finish': () => <ExerciseInstructions practiceFinish />,
	'exercise-finish': () => <SendResults practiceFinish />,
	empty: () => <></>,
};

export const dyscalculiaExercisesComponentsMap = {
	counting: (isResult = false) => <Counting isResult={isResult} />,
	'dots-comparison': (isResult = false) => <DotsComparison isResult={isResult} />,
	'match-sample': (isResult = false) => <MatchSample isResult={isResult} rotate={false} />,
	'match-sample-rotate': (isResult = false) => <MatchSample isResult={isResult} rotate />,
	'match-points-number': (isResult = false) => <MatchPointsNumber isResult={isResult} />,
	'numeric-line': (isResult = false) => <NumericLine isResult={isResult} />,
	'reaction-time': (isResult = false) => <ReactionTime isResult={isResult} />,
	'simple-arithmetic': (isResult = false) => <SimpleArithmetic isResult={isResult} />,
	'symbolic-magnitude': (isResult = false) => <SymbolicMagnitude isResult={isResult} />,
};

export const dyslexiaExercisesComponentsMap = {
	'multiple-choice': () => <MultipleChoice />,
	'letters-question': () => <SayTheLetters />,
	matching: () => <JoinWithArrows />,
	syllables: () => <SplitSyllables />,
	'contains-letter': () => <ContainsLetter />,
	'say-items': () => <GapQuestion />,
	'match-words': () => <MatchWordsToImage />,
	'nonexisting-words': () => <SayTheLetters />,
};

export const testTypesComponentsMap = {
	dyslexia: dyslexiaExercisesComponentsMap,
	dyscalculia: dyscalculiaExercisesComponentsMap,
};
