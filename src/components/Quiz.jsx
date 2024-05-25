//use useState to highlight the color  and the state will have values =>"answered","correct"."wrong"
//and then use the state value to update the styling of the answer.
//after 1 second I will show if the ans was correct or wrong =>setTimeOut
import React, { useCallback} from "react";
import { useState } from "react";
import QUSETIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
function Quiz() {

  //initial value of shuffledAnswer is undefined.
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

//   const activeQuestionIndex = userAnswers.length;
const activeQuestionIndex=(answerState==='' ? userAnswers.length:userAnswers.length-1);

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedOption) {
      setAnswerState("answered");
      //now after 1sec, hightlight it red or green
      setUserAnswers((prev) => {
        return [...prev, selectedOption];
      });
      //But now we have a problem.we are updating the state 👆 in <setUserAnswers> 
      //which would make the component re-render again and 
      //and grow the length of array by 1 and we would instantly go to next question.
      //Therefore, make <const activeQuestionIndex = userAnswers.length> conditional.
      //-------------
      //now after 1sec, hightlight it red or green
      setTimeout(() => {
        if (selectedOption === QUSETIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        //after  additional 2sec,go to the next question
        setTimeout(()=>{
            setAnswerState("");
            // now activeQuestionIndex= userAnswers.length
        },2000)
      }, 1000);
    },

    [activeQuestionIndex]
  );
  //Now we will need to add <activeQuestionIndex> as we need handleSelectedAnswer to be re-created for each and every question.

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
//undefined is interpreted as falsy.
//PART 5-> stored in a ref.

//now also use shuffledAnswers.current in jsx code as well.

  return (
    <>
      <div id="quiz">
        <div id="question"   key={activeQuestionIndex}>
          <QuestionTimer
            //So, by using <key> prop here, we are re-creating <QuestionTimer> comp whenEver the questionIndex changes.
            // key={activeQuestionIndex}
            //---------------------
            onTimeout={handleSkipAnswer}
            timeout={10000}
          />
          <h2>{QUSETIONS[activeQuestionIndex].text}</h2>
          {/* Reshuffle as the question changes, Create a new component instance when a new question arrives.Key prop useCase */}
       <Answers 
      //  key={activeQuestionIndex+1}
       onSelect={handleSelectedAnswer} //element argumen will automatically be passed to handleSelectedAnswer.So it is enough to simply point to it.
       answers={QUSETIONS[activeQuestionIndex].answers} 
       selectedAnswer={userAnswers[userAnswers.length-1]} 
       answerState={answerState}/>
        </div>
      </div>
    </>
  );
}

export default Quiz;


// But now you will notice => the application is behaving weirdly. The=is is because you have used same key on both component. 
//Key should be unique.
// Also   <Answers> and <QuestionTimer> are sibling. They have same parent.Another reason for them to not have same key.
//Solution 1-
// <Answers  key={activeQuestionIndex+1} .../>
//<QuestionTimer key={activeQuestionIndex} .../>
// solution 2-
//   only parent div willl have key prop and not answers or QuestionTimer component  <div id="question"  key={activeQuestionIndex}>
//Solution 3- Max's solution 
//Make another component that will have  <Answers> and <QuestionTimer> component and it will have key prop.
//I think this is preferd bcoz in react we should make as many component as much as possible.
