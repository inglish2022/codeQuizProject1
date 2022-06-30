let highscoreDiv = document.querySelector("#highscore");
let gameTimerEl = document.querySelector("#gameTimer");
let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timers");


var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

var questionDuration = 15;
var questionSecElapsed = 0;
var questionInterval;

init();

function init() {
  clearDetails();
  reset();
  
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "This game gives you the opportunity to take a time quiz!";

 
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " You will have 15 seconds to answer each question. If you answer correctly you will score points. The quicker you answer the more points you will score. If you answer incorrectly you will lose time."; 

  //create a btn to start game
  let startQuiz = document.createElement("button");
  startQuiz.setAttribute("id", "startQuiz");
  startQuiz.setAttribute("class", "btn btn-primary");
  startQuiz.textContent= "Start Code Quiz";

 

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startQuiz);
  

  startQuiz.addEventListener("click", function () {
    quizType = "Coding";
    playQuiz(Questions);
  });

  
}

function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  quizType = "";
  score = 0;

  gameDuration = 0;
  gameSecElapsed = 0;
  gameInterval;

  questionDuration = 15;
  questionSecElapsed = 0;
  questionInterval;
}

//start game
function playQuiz(questionSet) {
  if (test) { console.log("--- playQuiz ---"); }
    
  quiz = setUpQuestions(questionSet);

  // displays timers
  timerTab.setAttribute("style", "visibility: visible;");

  // Start timers here
  gameDuration = quiz.length * 15;
  if (test) { console.log("duration g,q:",gameDuration,questionDuration); }

  startGameTimer();
  renderTime();

 
  presentQuestion();
}

function setUpQuestions(arr) {
  if (test) {console.log("--- setUpQuestions ---");}

  let ranQuest = [];

  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

function presentQuestion() {
  if (test) {console.log("--- presentQuestion ---");}
  
  
  questionSecElapsed = 0;

 
  if ( quiz.length === 0 ) {
    endOfGame();
    return;
  }

  
  curQuestion = quiz.pop();

  
  clearDetails();
   
  
  let question = document.createElement("h1");
 
  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)

  
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  mainEl.appendChild(choiceBox);

  
  for( let i=0; i<curQuestion.choices.length; i++ ) {
    
    let listChoice = document.createElement("li");
    
    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.setAttribute("id","questionNum-"+i);
    listChoice.textContent = curQuestion.choices[i];
    
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("cur", curQuestion);}

  
  choiceBox.addEventListener("click", function (){
    scoreAnswer(curQuestion);
  });
  
}

function scoreAnswer(cur) {
  if (test) { console.log("--- scoreAnswer ---");}
 // ensure that the event on the li
  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;
    
    if (test) { console.log("selectedItem quiz " + selectedItem); }
    
    if ( selectedItem === cur.answer ) {
      
      score += questionDuration - questionSecElapsed;
      
    } else {
      if (test) { console.log("wrong answer");}
      
      gameDuration -= 10;
    }
  if (test) { console.log("sselected ",selectedItem);}
    showAnswers(cur);
    
  }
}

function showAnswers(cur) {
  if (test) { console.log("--- showAnswer ---"); }
  
  if (test) { console.log("sa qanda",cur);}
  if (test) { console.log("sselected ",selectedItem);}

  for (let i=0; i<cur.choices.length; i++) {
    if (test) { console.log("sa in for ",i);}

    let questid = "#questionNum-" + i;
    
    let questrow = document.querySelector(questid);

    

    if (test) { console.log("saf selected" + selectedItem + "<");}
    if (test) { console.log("saf color test >" +  cur.choices[i] +"<");}

    if ( cur.choices[i] !== cur.answer ) {
      if (test) { console.log("color test flase");}
      questrow.setAttribute("style","background-color: pink");
    } else {
      if (test) { console.log("color test true");}
      questrow.setAttribute("style","background-color: green");
    }
  }
 
  setTimeout(presentQuestion,500);
}

function setGameTime() {
  if (test) { console.log("--- setGameTime ---"); }
  if (test) { console.log("gameDuration " + gameDuration); }
  clearInterval(gameInterval);
  gameSeconds = gameDuration;
}

function renderTime() {
 
  gameTimerEl.textContent = gameDuration - gameSecElapsed;
  quesTimerEl.textContent = questionDuration - questionSecElapsed;

  if ( (questionDuration - questionSecElapsed) < 1 ) {
    
    gameDuration -= 10;
    if (test) { console.log("too slow"); }
    presentQuestion();
  } 

  if ( (gameDuration - gameSecElapsed) < 1 ) {
   endOfGame();
  }
}

function startGameTimer () {
  if (test) { console.log("--- startGameTimer ---"); }
  setGameTime();

  gameInterval = setInterval(function() {
    gameSecElapsed++; 
    questionSecElapsed++; 
    renderTime();
  }, 1000);
}

function stopTime() {
  if (test) { console.log("--- stopTime --- ");}
  gameSeconds = 0;
  questionSeconds = 0;
  clearInterval(gameInterval);
}

function endOfGame() {
  if (test) { console.log("--- endOfGame ---"); }
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "GAME OVER - Enjoy it?  Try again and improve your score";

  
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Your score is " + score; 

  
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play again";

  
  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for","userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id","userInitials");
  initialsInput.setAttribute("name","userInitials");
  initialsInput.setAttribute("minlength","3");
  initialsInput.setAttribute("maxlength","3");
  initialsInput.setAttribute("size","3");

  let submitBtn = document.createElement("button");
  submitBtn.setAttribute("class", "btn btn-secondary");
  submitBtn.textContent = "Submit Initial";
  submitBtn.addEventListener("click", saveHighscores)

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(initialsLabel);
  mainEl.appendChild(initialsInput);
  mainEl.appendChild(submitBtn);
  mainEl.appendChild(par);
  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);

  initialsInput.addEventListener("input", function() {
    initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 3 ) { 

      
      let thisScore = [ { type: quizType, name: initialsInput.value, score: score } ]; 

      //get highscores from memory
      let storedScores = JSON.parse(localStorage.getItem("highScores")); 
      if (test) { console.log("storedScore",storedScores); }

      if (storedScores !== null) { 
        storedScores.push(thisScore[0]); 
      } else {
        storedScores = thisScore;
      }

      localStorage.setItem("highScores", JSON.stringify(storedScores));
      highScores();
    }
  });
}

function saveHighscores(){
  var userInitialEl = document.getElementById('userInitials');

  let storedScores = JSON.parse(localStorage.getItem('highScores')) || []

  let newScore = {
    score: score,
    initials: userInitialEl.value
  }

  storedScores.push(newScore)

  localStorage.setItem("highScores", JSON.stringify(storedScores));
}







function highScores() {
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  //get scores from storage
  let storedScores = JSON.parse(localStorage.getItem("highScores")); 

  
  let heading = document.createElement("h2");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "High Score Hall of Fame";

  let scoresUl = document.createElement("ul");

  mainEl.appendChild(heading);
  mainEl.appendChild(scoresUl);

  
  if ( storedScores !== null ) {
    
    storedScores.sort((a,b) => (a.score < b.score) ? 1: -1);
    storedScores.forEach(function(scoreli){
      let liel=document.createElement("li")
      liel.textContent=`initials: ${scoreli.initials}, score: ${scoreli.score}`
      scoresUl.append(liel)
    })




  }

  
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play!";

  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);
}

highscoreDiv.addEventListener("click", highScores);
