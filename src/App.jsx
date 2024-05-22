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


//PART4:
// But now you will notice as your selected button changes color=>it jumps around.
//This is because we are using a state to help change color.Hence as state 
//makes comp re-render.The options gets shuffled at every re-rendeR BCOZ OF THIS CODE👇

// const shuffledAnswers = [...QUSETIONS[activeQuestionIndex].answers];
// shuffledAnswers.sort(() => Math.random() - 0.5);

//Hence your chosen option jumps around as it changes color.
//Therefore, time to split the Quiz code to solve this problem.
