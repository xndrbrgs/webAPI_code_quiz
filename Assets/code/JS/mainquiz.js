// Variables List

var startButton = document.getElementById('start-button');
var welcomeMessage = document.getElementById('welcome-page');
var nextButton = document.getElementById('next-question');
var homeButton = document.getElementById('home-button');
var questionContainerEle = document.getElementById('question-container');
var randomQuestions, currentQuesIndex;
let questionElements = document.getElementById('questions');
var answerButtonsElements = document.getElementById('buttons');
var initialsEl = document.querySelector("#initials");

// Event Listener List
startButton.addEventListener("click", startGame);
nextButton.addEventListener('click', () => {
    currentQuesIndex++;
    nextQuestion();
})

// Questions List

var questionsList = [
    {
        question: 'Inside which HTML element do we put the JS?',
        answers: [
            { text: '<js>', correct: false},
            { text: '<script>', correct: true},
            { text: '<javascript>', correct: false},
            { text: 'scripting>', correct: false},
        ]
    },

    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: [
            { text: 'the <body> section', correct: false},
            { text: 'the <head> section', correct: true},
            { text: 'both the <head> + <body> section', correct: false},
            { text: 'the <footer> section', correct: false},
        ]
    },

    {
        question: 'What is the correct JS syntax to write "Hello World" in the console?',
        answers: [
            { text: '("Hello World);', correct: false},
            { text: 'echo "Hello World";', correct: false},
            { text: 'document.write("Hello World");', correct: false},
            { text: 'console.log("Hello World");', correct: true},
        ]
    },

    {
        question: 'How do you write "Stop!" in an alert box?',
        answers: [
            { text: 'alertBox("Stop!")', correct: false},
            { text: 'msg("Stop!")', correct: false},
            { text: 'alert("Stop!)', correct: true},
            { text: 'modal("Stop!)', correct: false},
        ]
    },

    {
        question: 'What data type is NOT supported by JS?',
        answers: [
            { text: 'Array', correct: true},
            { text: 'Undefined', correct: false},
            { text: 'Symbol', correct: false},
            { text: 'Boolean', correct: false},
        ]
    },

]

// Quiz Variables

var time = questionsList.length * 10;
var timerId;

// Functions List

welcomeMessage.classList.remove("hide");

function startGame() {
    console.log("Start Quiz");
    welcomeMessage.classList.add("hide");
    startButton.classList.add("hide");
    randomQuestions = questionsList.sort(() => Math.random() - .5);
    currentQuesIndex = 0;
    questionContainerEle.classList.remove("hide");
    nextQuestion();
    timerId = setInterval(clockTick, 1000);
    timerId.textContent = time;
}

function nextQuestion() {
    resetButtons();
    newQuestion(randomQuestions[currentQuesIndex]);
}

function newQuestion(question) {
    questionElements.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('buttons');
        
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', answerSelected);
        answerButtonsElements.appendChild(button);
    });
}

function resetButtons() {
    while (answerButtonsElements.firstChild) {
        answerButtonsElements.removeChild
            (answerButtonsElements.firstChild);
    }  
}


function answerSelected(i) {
    var tickedButton = i.target;
    var ifCorrect = tickedButton.dataset.correct;
    setStatusClass(document.body, ifCorrect);
    Array.from(answerButtonsElements.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    
    if (randomQuestions.length > currentQuesIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        homeButton.classList.remove('hide');
        nextButton.classList.add('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function getScore() {
    
}

// Timer

