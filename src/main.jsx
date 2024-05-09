import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
//class 197:
//React.strictmode => during development, strict mode executes every component twice
// It helps you  to catch certain errors in your app.
//Bcoz in theory, your app should work exactly the same way no matter how many times its executed.
//React.strictmode =>It helps in catching bugs. 
//React.strictmode  helped us catch bug in setInterval code in QuestionTimer.jsx=> we will fix the bug using clean up function.
//The bug in QuestionTimer.jsx is=> React.strictmode is running the comp 2 times.Due to this we got two intervals running at the same time.
//Hence, the progress bar depletes faster than it should.
//----------------------------------------
//-------------Clean up function ----------
//Clean up existing function if the effect runs again.
//Or we can say, clean up old interval and we will have only one interval up and running at the a time.
//Even if we did not have this bug of running two intervals at the same time.We would have to add clean up function 
//as when user moves to next question
//the interval will not be reset. To reset the interval for new question, we would need to add clean up function.