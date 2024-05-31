import React from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";

function Summary({userAnswers}) {

  //calculate share of skipped, wrong and right answers.
const skippedAnswers= userAnswers.filter(a=>a===null);
const correctAnswers=userAnswers.filter(
  (a,index)=> a === QUESTIONS[index].answers[0]
);
const skippedAnswersShare=Math.round(
  (skippedAnswers.length/userAnswers.length)*100
)
const correctAnswersShare=Math.round(
  (correctAnswers.length/userAnswers.length)*100
)
const wronganswerShare=100-(correctAnswersShare+skippedAnswersShare);

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number"> {wronganswerShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
      {/* userAnswers= options selected by user. Getting it from Quiz.jsx */}
        {userAnswers.map((answerByUser, index) => {
          {/* Dynamically deriving css class to highlight if answer was correct or wrong or skipped. SEE this html element 👇
          <p className={cssClass}>{answerByUser ?? "Skipped"}</p>
           */}
          let cssClass = "user-answer";

          if (answerByUser === null) {
            cssClass += " skipped"; //className="user-answer skipped"
          } else if (answerByUser === QUESTIONS[index].answers[0]) { //if ans correct-give green color
            cssClass += " correct";
          } else {//ans wrong-give red
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answerByUser ?? "Skipped"}</p>
              {/* if answeByUser is truthy => print answerByUser else falback text-print 'skipped' */}
            </li>
          );
        })}
      </ol>{" "}
    </div>
  );
}

export default Summary;
