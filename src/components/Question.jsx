import React from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUSETIONS from "../questions";
import { useState } from "react";
function Question({
  QuestionIndex,

  onSelectAnswer,
 
  onSkip,
}) {


  const [answer,setAnswer]=useState({
    selectedAnswer:'',
    isCorrect:null
  });

  function handleChoosenAnswer(answer){
    setAnswer({
    selectedAnswer:answer,
    isCorrect:null
    })

    //after 1sec, set 'isCorrect' to true or false,Hence show the user if their ans was right or wrong.
    setTimeout(()=>{
      setAnswer({
        selectedAnswer:answer,
        isCorrect:QUSETIONS[QuestionIndex].answers[0]===answer
        })
    //AFTER ADDITIONAL 2 SEC=>MOVE TO THE NEXT QUESTION
//we are writing this setTimeOut here so that we don't instantly move away.
    setTimeout(() => {
     onSelectAnswer(answer); //This would now increase the length  of array by 1  in Quiz.jsx. Hence we do not need 
// this code is the only thing controlling the length of array <userAnswers>
    }, 2000);
    },1000)
  }



let StateofAns='';
if(answer.selectedAnswer && answer.isCorrect !== null )
  {//we have marked our answer and we have not evaluated whether our ans in correct or not.
    StateofAns=answer.isCorrect?'correct':'wrong'; //'correct(green)'- 'wrong(red)' are css classNames.
  }
 else if (answer.selectedAnswer){//we have marked the answer and isCorrect is null. WE have not yet evaluated if our answer is correct or not
    StateofAns='answered';
  }

 
  return (
    <div id="question">
      <QuestionTimer onTimeout={onSkip} timeout={40000} />
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

