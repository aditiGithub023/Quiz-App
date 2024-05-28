import React from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUSETIONS from "../questions";
import { useState } from "react";
function Question({
  QuestionIndex,//for access to activeQuestionIndex.From this we are evaluation isCorrect.

  onSelectAnswer, //to increasse the length of array by 1

  onSkip,  //Quiz.jsx->Question.jsx-> QuestionTimer.jsx.Remember, we have made Question.jsx so that we use one key prop .
  //and we want answers component and QuestionTimer Component to be re-created for each and every question 
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

//PART 10---------------------------------------------------------
let timer=10000; //default progress bar timer value

//if ans is selected, re-set pogress bar time to new timer value
if(answer.selectedAnswer)
  {
    timer=1000;
  }//I will reveal if ans was correct or wrong after 10 ms

  if(answer.selectedAnswer && answer.isCorrect !== null)
    {
      //move to next question after 2000 ms
      timer=2000;
    }

//--------------------------------------------
  function handleChoosenAnswer(answer) { //answer coming from 'onSelect' in Answers component.
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    //after 1sec, set 'isCorrect' to true or false,Hence show the user if their ans was right or wrong.
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUSETIONS[QuestionIndex].answers[0] === answer,
      });
      //AFTER ADDITIONAL 2 SEC=>MOVE TO THE NEXT QUESTION
      //we are writing this setTimeOut here so that we don't instantly move away.
      setTimeout(() => {
        onSelectAnswer(answer); //This would now increase the length  of array by 1  in Quiz.jsx.
        // this code is the only thing controlling the length of array <userAnswers>
      }, 2000);
    }, 1000);
  }

  let StateofAns = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    //we have marked our answer and we have not evaluated whether our ans in correct or not.
    StateofAns = answer.isCorrect ? "correct" : "wrong"; //'correct(green)'- 'wrong(red)' are css classNames.
  } else if (answer.selectedAnswer) {
    //we have marked the answer and isCorrect is null. WE have not yet evaluated if our answer is correct or not
    StateofAns = "answered";
  }

  return (
    <div id="question">
    {/* PART 10---------------------------------------------------------- */}
      <QuestionTimer 
      key={timer} //force the interval to be re-created.
      // onTimeout={onSkip} 
      //Now when the timer expires we register a null answer and store it in the answer storing array 
      //and increase the activeQuestionIndex by 1 and skip a question.
      //TO solve this, we only call onSkip if we have deliberately not selected answer
      //otherwise I don call any function.
      onTimeout={answer.selectedAnswer === ''?onSkip:null}
      timeout={timer}
      mode={StateofAns} />
      {/* PART 10--------------------------------------------------------------------------- */}
      {/* <h2>{questionText}</h2> */}
      <h2>{QUSETIONS[QuestionIndex].text}</h2>

      <Answers
        onSelect={handleChoosenAnswer} //element argument will automatically be passed to handleChoosenAnswer.So it is enough to simply point to it.
        answers={QUSETIONS[QuestionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={StateofAns}
      />
    </div>
  );
}

export default Question;
