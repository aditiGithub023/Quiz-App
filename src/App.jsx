import Header from "./components/Header";
import Quiz from "./components/Quiz";
function App() {
  return (
    <>
      <Header />
      <main>
        {" "}
        <Quiz />
      </main>
    </>
  );
}

export default App;


//PART5:
// But now you will notice as your selected button changes color=>it jumps around.
//This is because we are using a state to help change color.Hence as state 
//makes comp re-render.The options gets shuffled at every re-rendeR BCOZ OF THIS CODE👇

// const shuffledAnswers = [...QUSETIONS[activeQuestionIndex].answers];
// shuffledAnswers.sort(() => Math.random() - 0.5);

//Hence your chosen option jumps around as it changes color.
//Therefore, time to split the Quiz code to solve this problem.

//Going to use "useRef" to manage a value (and not to connect to an html element)
//which will not change if the component function is executed again.
//You can use ref for managing values that are stored and managed independently 
// from the component function lifecycle to which they belong.
//Therefore store shuffled options array in useRef so that it remains same even if the comp. re-renders. Quiz.jsx
//undefined is interpreted as falsy.
//PART 5-> stored in a ref.
// const shuffledAnswers=useRef(); //PARt 5 
//initial value of shuffledAnswer is undefined.
//---------------------------------------------------------------------
// if(!shuffledAnswers.current){ //if it is undefined,then execute the code.
//   shuffledAnswers.current = [...QUSETIONS[activeQuestionIndex].answers];
//     shuffledAnswers.current.sort(() => Math.random() - 0.5);
//   }

//BUT how do I re-set ShuffledAnswers when new Question arrives(QUIZ.JSX)=> part66(199-watch from 5.45)
//Quiz.jsx and Answers.jsx()

//PART 77- more splitting. Max's solution for making key prop unique.(Question.jsx and Quiz.jsx)
//Look at Question.jsx component and its prop in Quiz.jsx(lots of prop passing)

//PART8- Section 200- Moving Logic to Components that actually Need it.
//We can move these two useStates to Question component and turn them into single object and make brand new hanldeSelectAnswer.
//We are trying to avoid prop drilling/decrease the amount of prop passing.
//Quiz and Question.jsx component.(see how the number of props was decreased and see the jsx code.)
//we have added disabled button in Answers.jsx
//and we have removed all setTimeOut code in Quiz.jsx and moved that setTimeOut code into Question.jsx
//and all the css color code is in Answers.jsx and not in Quiz.jsx.
//Part 9 me I am removing all the comments or old code for better readability.
//some issues- if we pick an answer a bit too late, the progress bar timer will expire 
//& we will switch to next question without displaying if the answer was right or wrong.
// and we have mutiple timers going on at the same time. bcoz of 2000 sec nested timer- it will move to the next question 
//an also the setUSERAnswers wil move you to the next question 
//PART 9- no changes same as PART 8.
//Go to part 10: video 201
//Explainig this line- and we have mutiple timers going on at the same time.
// one way of moving to next question and storing an answer is if an ans was skipped bcoz the timer expired.
//2nd way is that we recieved an answer from the user bcoz ans was selected
//now both things happen if we select an answer too late
//Question.jsx and QuestionTimer.jsx
//GO to PART 11- video 202.

