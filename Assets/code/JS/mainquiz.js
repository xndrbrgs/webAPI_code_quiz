// Variables List

var startButton = document.getElementById("start-button");
var welcomeMessage = document.getElementById("welcome-page");
var nextButton = document.getElementById("next-question");
var homeButton = document.getElementById("home-button");
var questionContainerEle = document.getElementById("question-container");
var randomQuestions, currentQuesIndex;
let questionElements = document.getElementById("questions");
var answerButtonsElements = document.getElementById("buttons");
var initialsEl = document.querySelector("#initials");
var timerEl = document.querySelector("#time");
var submitButton = document.getElementById("submit-btn");
var finalScoreEl = document.getElementById("finalscore");
var endSection = document.getElementById("end-section")

// Event Listener List
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuesIndex++;
  nextQuestion();
});

// Questions List

var questionsList = [
  {
    question: "Inside which HTML element do we put the JS?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<javascript>", correct: false },
      { text: "<scripting>", correct: false },
    ],
  },

  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      { text: "the <body> section", correct: false },
      { text: "the <head> section", correct: true },
      { text: "both the <head> + <body> section", correct: false },
      { text: "the <footer> section", correct: false },
    ],
  },

  {
    question:
      'What is the correct JS syntax to write "Hello World" in the console?',
    answers: [
      { text: '("Hello World);', correct: false },
      { text: 'echo "Hello World";', correct: false },
      { text: 'document.write("Hello World");', correct: false },
      { text: 'console.log("Hello World");', correct: true },
    ],
  },

  {
    question: 'How do you write "Stop!" in an alert box?',
    answers: [
      { text: 'alertBox("Stop!")', correct: false },
      { text: 'msg("Stop!")', correct: false },
      { text: 'alert("Stop!)', correct: true },
      { text: 'modal("Stop!)', correct: false },
    ],
  },

  {
    question: "What data type is NOT supported by JS?",
    answers: [
      { text: "Array", correct: true },
      { text: "Undefined", correct: false },
      { text: "Symbol", correct: false },
      { text: "Boolean", correct: false },
    ],
  },
];

// Quiz Variables

var time = questionsList.length * 15;
var timerId;

// Functions List

welcomeMessage.classList.remove("hide");

function startGame() {
  console.log("Start Quiz");
  welcomeMessage.classList.add("hide");
  startButton.classList.add("hide");
  randomQuestions = questionsList.sort(() => Math.random() - 0.5);
  currentQuesIndex = 0;
  questionContainerEle.classList.remove("hide");
  nextQuestion();
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
}

function nextQuestion() {
  resetButtons();
  newQuestion(randomQuestions[currentQuesIndex]);
}

function newQuestion(question) {
  questionElements.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("buttons");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", answerSelected);
    answerButtonsElements.appendChild(button);
  });
}

function resetButtons() {
  while (answerButtonsElements.firstChild) {
    answerButtonsElements.removeChild(answerButtonsElements.firstChild);
  }
}

function answerSelected(i) {
  var tickedButton = i.target;
  var ifCorrect = tickedButton.dataset.correct;
  if (ifCorrect === randomQuestions[currentQuesIndex].correct) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;
  };

  setStatusClass(document.body, ifCorrect);
  Array.from(answerButtonsElements.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (randomQuestions.length > currentQuesIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    homeButton.classList.add("hide");
    nextButton.classList.add("hide");
    quizEnds();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// Timer

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    nextButton.classList.add("hide");
    questionContainerEle.classList.add("hide");
    homeButton.classList.add("hide");
    quizEnds();
  }
}

function quizEnds() {
  clearInterval(timerId);
  questionContainerEle.classList.add("hide");
  endSection.classList.remove("hide");
  console.log(time);
  finalScoreEl.textContent = time;
}

// Scores

function savedhighScores() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScores = {
      score: time,
      initials: initials,
    };

    highscores.push(newScores);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "scores.html";
  }
}

function enterCheck (event) {
    if (event.key === "Enter") {
        savedhighScores();
    }
};

submitButton.addEventListener("click", savedhighScores); 
initialsEl.onkeyup = enterCheck;