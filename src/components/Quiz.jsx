//want to use this component to show the currently active question to the user.
//and when the user clicks on a question, I want to switch to a different question.
//so this comp is responsible for switching questions and for registering answers.
import React, { useCallback } from 'react'
import {useState} from 'react'
import QUSETIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from './QuestionTimer';
function Quiz() {
//STORE index of current question
// const [activeQuestionIndex,setActiveQuestionIndex]=useState(0); -but this is a redundant way . You can find the indexof questopn by using userAnswers Array
//---------------------
//store option selected by users in an array
const [userAnswers,setUserAnswers]=useState([]);

const activeQuestionIndex=userAnswers.length;
// If we have stored two answers for question 1 and 2 at index 0,1  
//then length of userAnswers is userAnswer.length=2
// and  we have to show the third question(question at index 2).
//Hence, activeQuestionIndex=2=userAnswer.length


const handleSelectedAnswer=useCallback(function handleSelectedAnswer(selectedOption)
{
    //when state is updated,entire state gets overrwitten.
    //Therefore, always copy the previous data and then add new data point.
    setUserAnswers((prev)=>
    {return [...prev,selectedOption]});

},[]);

const handleSkipAnswer=useCallback(()=>{handleSelectedAnswer(null)},[handleSelectedAnswer])
//Now whenever comp re-render, handleSelectedAnswer will be re-created and handleSkip would be re-created  bcoz dependency of useCallback changed/handleselected changed=>
    // that would make useEffect in QuestionTimer to run again.
//To stop that, wrap handleSelectedAnswer in useCallback as well
//------------------------------------------------------------------------
//These two codes should only be executed if there is more questions left.
//bcoz once <activeQuestionIndex> reaches the last index.Beyound that it will become undefined.
//TypeError: Cannot read properties of undefined 
//Therefore, moving them  below <if(quizIsComplete)>

//Going to use "sort method" which updates the actual array.Therefore, first copy it using spread operator

// const shuffledAnswers=[...QUSETIONS[activeQuestionIndex].answers];

//this will shuffle the array
// shuffledAnswers.sort(()=>Math.random()-0.5);

//THe user has answered all the questions if activeQuestionIndex=== QUESTIONS.length 
const quizIsComplete=activeQuestionIndex === QUSETIONS.length;

//Show different content once all quiz questions are over.
if(quizIsComplete)
    {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy Icon" />
                <h2>Quiz Complete !</h2>
            </div>
        )
    }

    const shuffledAnswers=[...QUSETIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(()=>Math.random()-0.5);

  return (
    <><div id="quiz">
        <div id="question">
        <QuestionTimer  timeout={10000} 
        // onTimeout={()=>{handleSelectedAnswer(null)}}
//whenever the jsx code is re-evaluated bcoz useState value changed, the anonymous function <()=>{handleSelectedAnswer(null)>
//gets re-created again.Therefore, to stop it form being re-created again, wrap it inside useCallback.
onTimeout={handleSkipAnswer}
        />
            <h2>{QUSETIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {
                 shuffledAnswers.map(element=>
                    //  QUSETIONS[activeQuestionIndex].answers.map(...) => changed to shuffledAnswers.map(...)
                        <li key={element} className='answer'>
                        <button onClick={()=>handleSelectedAnswer(element)}>{element}</button>
                            {/* <button onClick={handleSelectedAnswer}>{element}</button> */}
                            {/* Not enough to point at handleSecetedAnswer fun. */}
                        </li>
                    )
                }
            </ul>
        </div>
        </div>
    </>
  )
}

export default Quiz