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

//Part3: do <git checkout part3>
//So right now, what is happening is that the moment student chooses an answer, we instantly go to next question
//But Now: I want to hightlight the ans chosen by the user.
//and then after 1 sec=>
//Highlight the ans red->if wrong
//Highlight the ans green-> if correct
//and after 2 seconds, next question should be loaded.
//To implement this=>some changes are required
//in Quiz.jsx=> need to change <handleSelectAnswer>
// EXAMPLE
// userAnswers.length = 5
// answered = ""
// const activeQuestionIndex = answered ==='' // answered = "" -- TRUE
//     ? userAnswer.length // TRUTHY VALUE <=== RETURN THIS!
//     : userAnswer.length - 1;  // FALSY VALUE
// // activeQuestionIndex = 5
// User selects an answer

// setAnswered('answered');
// setUserAnswer(prevAnswers => [...prevAnswers, answer]); // ANSWERS .length GROWS BY 1
// // answered = 'answered'
// // userAnswer.length = 6

// state updates, component re-evaluates this line👇
// const activeQuestionIndex = answered === '' // answered = "answered" -- FALSE
//     ? userAnswer.length // TRUTHY VALUE
//     : userAnswer.length - 1;  // FALSY VALUE <=== RETURN THIS!
// // activeQuestionIndex = 6 - 1 = 5
// after 2 seconds

// setAnswered('');
// // answered = ''


// state updates, component re-evaluates this line👇
// const activeQuestionIndex = answered === '' // answered = "" -- TRUE
//     ? userAnswer.length // TRUTHY VALUE <=== RETURN THIS!
//     : userAnswer.length - 1;  // FALSY VALUE
// // activeQuestionIndex = 6
// New question renders!

