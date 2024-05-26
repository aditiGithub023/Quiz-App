import React from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
function Question({questionText, answers,onSelectAnswer,selectedAnswer,answerState,onSkip}) {
  return (
    <div id="question">
      <QuestionTimer
       
        onTimeout={onSkip}
        timeout={10000}
      />
      <h2>{questionText}</h2>
     
      <Answers
        onSelect={onSelectAnswer} //element argument will automatically be passed to handleSelectedAnswer.So it is enough to simply point to it.
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
      />
    </div>
  );
}

export default Question;
