import React from 'react';
import { useRef } from 'react';
//Output list of shuffled answers.
//Move shuffling logic here=> useRef.
// answers prop-array of options (or just import Questions file.)
//onSelect is handleSelectedAnswer function
//selectedAnswers is last element of the array <userAnswers[userAnswers.length-1]>
function Answers({answers,selectedAnswer,answerState,onSelect}) {
    const shuffledAnswers=useRef(); //PARt 5 
//move shuffling logic here from Quiz.jsx
    if(!shuffledAnswers.current){ //if it is undefined,then execute the code.
        shuffledAnswers.current = [...answers]; //spread the array from PROP-Part 6
          shuffledAnswers.current.sort(() => Math.random() - 0.5);
        }
  return (
    <ul id="answers">
    {/* PART5 */}
      {shuffledAnswers.current.map((element) => {
          //last element of the array is the selected button <userAnswers[userAnswers.length-1]>
          const selectedButton=(selectedAnswer=== element); //selectedAnswer PROP
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
          <button onClick={() =>onSelect(element)} className={cssClasses} 
           disabled={answerState !== ''} //If answerState is not an empty stric it means the answer has been marked and we dont want the user to switch b/w answers.
          >
            {element}
          </button>
          {/* <button onClick={handleSelectedAnswer}>{element}</button> */}
          {/* Not enough to point at handleSecetedAnswer fun. */}
        </li>
      )})}
    </ul>
  )
}

export default Answers