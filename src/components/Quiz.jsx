//use useState to highlight the color  and the state will have values =>"answered","correct"."wrong"
//and then use the state value to update the styling of the answer.
//after 1 second I will show if the ans was correct or wrong =>setTimeOut
import React, { useCallback } from "react";
import { useState } from "react";
import QUSETIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
function Quiz() {
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

  const shuffledAnswers = [...QUSETIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <>
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            //to start brand new progress bar for each question, we will add <key> prop. key is a built-in prop.
            //Key prop can be added to any element and any component.
            //PURPOSE ONE:key is used in element in cases like when you have to output list data using map bcoz there this key helps react
            //identify those list different list items
            // ---------------------------
            //PURPOSE TWO: Whenever the key prop changes on a component
            //react will destroy old component instance
            //and create a new one.It will unmount and remount the component.
            //So, by using <key> prop here, we are re-creating <QuestionTimer> comp whenEver the questionIndex changes.
            key={activeQuestionIndex}
            //---------------------
            // onTimeout={()=>{handleSelectedAnswer(null)}}
            //whenever the jsx code is re-evaluated bcoz useState value changed, the anonymous function <()=>{handleSelectedAnswer(null)>
            //gets re-created again.Therefore, to stop it form being re-created again, wrap it inside useCallback.
            onTimeout={handleSkipAnswer}
            timeout={10000}
          />
          <h2>{QUSETIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((element) => {
                //last element of the array is the selected button <userAnswers[userAnswers.length-1]>
                const selectedButton=(userAnswers[userAnswers.length-1] === element);
                let cssClasses='';
//These are the styling classes in index.css
//the styling classes also have <.answer button.selected>,<.answer button.correct>,<.answer button.wrong>
                if(answerState === 'answered' && selectedButton)
                {
                    //apply this class  <.answer button.selected>
                    cssClasses='selected'
                }

                if((answerState === 'correct' || answerState === 'wrong') && selectedButton)
                {
                    cssClasses=answerState;
                }
                
                
                return (
              //  QUSETIONS[activeQuestionIndex].answers.map(...) => changed to shuffledAnswers.map(...)
              <li key={element} className="answer">
                <button onClick={() => handleSelectedAnswer(element)} className={cssClasses}>
                  {element}
                </button>
                {/* <button onClick={handleSelectedAnswer}>{element}</button> */}
                {/* Not enough to point at handleSecetedAnswer fun. */}
              </li>
            )})}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Quiz;


// But now you will notice as your selected button changes color=>it jumps around.
//This is because we are using a state to help change color.Hence as state makes comp re-render.The options gets shuffled at every re-render.
//Hence your chosen option jumps around as it changes color.
//Therefore, time to split the Quiz code to solve this problem.
//do <git checkout part4>