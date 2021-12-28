// Variables List

var startButton = document.getElementById('start-button');
var questionContainerEle = document.getElementById('question-container');
var randomQuestions, currentQuesIndex;
var questionElements = document.getElementById('questions');
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

function newQuestion(question) {

}

function nextQuestion() {
    newQuestion(randomQuestions[currentQuesIndex]);
}

function answerSelected() {

}