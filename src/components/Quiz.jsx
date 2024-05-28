//use useState to highlight the color  and the state will have values =>"answered","correct"."wrong"
//and then use the state value to update the styling of the answer.
//after 1 second I will show if the ans was correct or wrong =>setTimeOut
import React, { useCallback} from "react";
import { useState } from "react";
import QUSETIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";
function Quiz() {

  //------------------------------------***---------------------------------------
//But we still need this one state to find out when the quiz is over.👇
const [userAnswers, setUserAnswers] = useState([]);
// const activeQuestionIndex=(answerState==='' ? userAnswers.length:userAnswers.length-1);
const activeQuestionIndex=userAnswers.length //wil now be updated from inside the Question Compoent.
//See Question Component fro more explanantion.
  //------------------------------------***---------------------------------------

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedOption) {
      // setAnswerState("answered");
      setUserAnswers((prev) => {
        return [...prev, selectedOption];
      });
      
    },
[]
   
  );


  const handleSkipAnswer = useCallback(() => {
    handleSelectedAnswer(null);
  }, [handleSelectedAnswer]);

  const quizIsComplete = activeQuestionIndex === QUSETIONS.length;

  //Show different content once all quiz questions are over.
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Complete !</h2>
      </div>
    );
  }

  return (
    <>
      <div id="quiz">
      {/* PART 77 */}
      <Question 
      //----------Use one single key prop to re-create the Question Component and 
      QuestionIndex={activeQuestionIndex}
      key={activeQuestionIndex}
      //--------------------------------------for Answer component-------
      onSelectAnswer={handleSelectedAnswer}
//-------------------------------------------for QuestionTimer component----------
onSkip={handleSkipAnswer}
      />
      </div>
    </>
  );
}

export default Quiz;
