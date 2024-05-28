// part 2:see main.jsx
import React, { useState,useEffect} from 'react'

//every question has a timer for say 15 seconds and once the timer is up,
//move to next question and save the skiped question's answer as null.
//setTimeout is used to set ans to null by using prop function <onTimeOut>

//WE have to inform parent comp that the timer for current question has expired.
//Therefore, we will accept a function prop(onTimeOut) INSIDE setTimeOut which will fire once the timer expires.

//We want the component to be re-created for each and every question.For this we have used <key> prop in Quiz.jsx.
//mode prop is for styling purpose
function QuestionTimer({timeout,onTimeout,mode}) {
  

const [remainingTime,setRemainingTime]=useState(timeout);

 

useEffect(()=>{
  console.log('SETTING TIMEOUT');
  const timer=setTimeout(onTimeout,timeout)
//re-set this as well for new questions and  for when it is unmouted( when we have "Quiz comlete screen")
return ()=>clearTimeout(timer);
},[timeout,onTimeout])





useEffect(()=>{
  console.log('SETTING INTERVAL');
  const interval=setInterval(()=>{
    setRemainingTime(prev=>prev-100) 
    // ----------- PART 10--------------------------------------
    //still using prev value of old timer. Therefore, need to use Key prop to re-create it for new timers.
    //setTimeOut gets re-set without key prop as well as max={timeOut} in progress html element.
  },100)

  return ()=>clearInterval(interval);
  //Now before starting new interval for new question,old interval will be cleared and interval will be re-set.
  //Note->clean up fun is actomatically run by react before effect runs again 
  //or before the comp is unmouted from DOM so if it disappers from the screen.
},[]);
//every 100 miliseconds setInterval will run which in turn re-create setTimeOut as comp will re-render
//and quickly, we will have multiple setTimeOuts running together.
//Hence setTimeOut needs to be wrapped in useEffect.

return (
    <progress  id="question-time" max={timeout} value={remainingTime} className={mode}/>
  )
}

export default QuestionTimer;


