import React, { useState,useEffect} from 'react'

function QuestionTimer({timeout,onTimeout}) {
  

const [remainingTime,setRemainingTime]=useState(timeout);
// setTimeout(onTimeout,timeout)
//Not an effect that would require useEffect as 1. we are not facing danger of infinite loop.
//2. no ref involved 
//3.and I am not updating component state here.
 
//** 
//we have wrapped setTimeout in useEffect bcoz of setInterval's useEffect. See the reason below.
useEffect(()=>{
  console.log('SETTING TIMEOUT');
  setTimeout(onTimeout,timeout)
},[timeout,onTimeout])
//in dependency,need to add any prop or state value used inside effect function 
//note=> onTimeout prop is a function=> Therefore we should need useCallback in parent component
//to stop onTimeOut from changing we have wrapped anonymous function <onTimeout={()=>{handleSelectedAnswer(null)}}> and <handleSelectedAnswers> in useCallback 
//For detailed explanation, see Quiz.jsx
//Ontimeout is poiniting to this anonymous function <()=>{handleSelectedAnswer(null)}>.
//Therefore wrap this function in useCallback.
//Since, this anonymous function is also using handleSelectedAnswers, wrap handleSelectedAnswers in a useCallback as well.




// setInterval(()=>{
//   setRemainingTime(prev=>prev-100)
// },100)

//Now this would create infinite loop as we are updating state=> that would re-execute the component=>new setInterval will be created and we will set the state again=>we will quickly have multiple intervals running
  
useEffect(()=>{
  console.log('SETTING INTERVAL');
  setInterval(()=>{
    setRemainingTime(prev=>prev-100)
  },100)
},[]);
//every 100 miliseconds setInterval will run which in turn re-create setTimeOut as comp will re-render
//and quickly, we will have multiple setTimeOuts. 
//Hence setTimeOut needs to be wrapped in useEffect. **

return (
    <progress  id="question-time" max={timeout} value={remainingTime}/>
  )
}

export default QuestionTimer;


//every question has a timer for say 15 seconds and once the timer is up,
//move to next question and save the skiped question's answer as null.

//WE have to inform parent comp that the timer for current question has expired.
//Therefore, we will accept a function prop which will fire once the timer expires.
