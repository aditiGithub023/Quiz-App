import React from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUSETIONS from "../questions";
import { useState } from "react";
function Question({
  key, //key prop used on Question component in Quiz.jsx //BUT we can not use key prop(will give error).WE have to make our own prop
  QuestionIndex,
  //we do not these props as we are importing QUESTIONS 
  // questionText, -no longer needed. NOW DO : <h2>{QUSETIONS[ QuestionIndex].text}</h2>
  // answers,-no longer needed. NOW DO : Answers component-  answers={QUSETIONS[ QuestionIndex].answers}
  onSelectAnswer,
  // selectedAnswer, -no longer needed
  //selectedAnswer was ->  selectedAnswer={userAnswers[userAnswers.length - 1]} but now we are storing selectedAns in our object useState 👇
  //Now need to update Answer Component prop to 'answer.selectedAnswer'
  // answerState, -no longer needed.
  onSkip,
}) {

 //PART8
  //Move these component to Question.jsx and make only 1 useState that is an object 
  //Example for a useState that does not need to be lifted up.
  // const [answerState, setAnswerState] = useState("");
  // const [userAnswers, setUserAnswers] = useState([]); 👇
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
    //  <const activeQuestionIndex=(answerState==='' ? userAnswers.length:userAnswers.length-1)> and can change it to JUST 
    //<const activeQuestionIndex=userAnswers.length> since this code is the only thing controlling the length of array <userAnswers>
    }, 2000);
    },1000)
  }


//Trying to remove the need of importing answerState prop.
let StateofAns='';
if(answer.selectedAnswer)
  {
    StateofAns=answer.isCorrect?'correct':'wrong'; //'correct'- 'wrong' are css classNames.
  }
  //Now remove the 'answeState prop' and pass 'StateofAns' in Answers component.

  return (
    <div id="question">
      <QuestionTimer onTimeout={onSkip} timeout={10000} />
      {/* <h2>{questionText}</h2> */}
      <h2>{QUSETIONS[QuestionIndex].text}</h2>

      <Answers
        onSelect={handleChoosenAnswer} //element argument will automatically be passed to handleChoosenAnswer.So it is enough to simply point to it.
        answers={QUSETIONS[QuestionIndex].answers}
        // selectedAnswer={selectedAnswer} -old
        selectedAnswer={answer.selectedAnswer} //new -derived from objec useState.
        answerState={StateofAns}
      />
    </div>
  );
}

export default Question;
//Now in Quiz comp. Remove all the redundant props.
//10.08