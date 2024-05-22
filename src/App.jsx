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

//BUT how do I re-set ShuffledAnswers when new Question arrives=> Go to part6(199-watch from 5.45)