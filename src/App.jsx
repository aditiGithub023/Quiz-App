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
//Part 2: 
//Task 1:Adding cleanup function and what is React.strictMode : see QuestionTimer.jsx and main.jsx.
//Task 2: Key prop for QuestionTimer component passed in Quiz.jsx
//Part3: do <git checkout part3>
//: so right now, what is happening is that the moment student chooses an answer, we instantly go to next question
//But Now: I want to hightlight the ans chosen by the user.
//and then after 1 sec=>
//Highlight the ans red->if wrong
//Highlight the ans green-> if correct
//and fter 2 seconds, next question should be loaded.