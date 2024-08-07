const questions = [
    {
    question: "Which is large animal in the world",
        answers:[
            {text: "shark" , correct: "false"},
            {text: "blueWhale" , correct: "true"},
            {text: "elephant" , correct: "false"},
            {text: "giraffe" , correct: "false"}, 
        ]
    },
    {
    question: "Which is large country in the world",
        answers:[
            {text: "kalahari" , correct: "false"},
            {text: "gobi" , correct: "false"},
            {text: "sahara" , correct: "false"},
            {text: "antarctica" , correct: "true"}, 
        ]
    },
    {
        question: "Which is smallest conutry in the world",
            answers:[
                {text: "vactican city" , correct: "true"},
                {text: "bhutan" , correct: "false"},
                {text: "nepal" , correct: "false"},
                {text: "shri lanka" , correct: "false"}, 
        ]
    },
        {
            question: "Which is smallest continent in the world",
                answers:[
                    {text: "asia" , correct: "false"},
                    {text: "australia" , correct: "true"},
                    {text: "arctic" , correct: "false"},
                    {text: "africa" , correct: "false"}, 
            ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState() ;
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
             button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
     const selectedBtn = e.target;
     const inCorrect = selectedBtn.dataset.correct === "true";
     if(inCorrect){
        selectedBtn.classList.add("correct"); 
        score++;
     }else{
        selectedBtn.classList.add("incorrect");
     }
     Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
     }); 
     nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();