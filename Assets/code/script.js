// Variables List

var startButton = document.getElementById('start-button');
var questionContainerEle = document.getElementById('question-container');
var randomQuestions, currentQuesIndex;
let questionElements = document.getElementById('questions');
var answerButtonsElements = document.getElementById('buttons');

// Event Listener List
startButton.addEventListener("click", startGame);


// Questions List

var questionsList = [
    {
        question: 'Inside which HTML element do we put the JS?',
        answers: [
            { text: '<js>', correct: false},
            { text: '<script>', correct: true}
        ]
    }
]

// Functions List

function startGame() {
    console.log("Start Quiz");
    startButton.classList.add("hide");
    randomQuestions = questionsList.sort(() => Math.random() - .5);
    currentQuesIndex = 0;
    questionContainerEle.classList.remove("hide");
    nextQuestion();
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
    var 
}