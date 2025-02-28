const questions=[
    {
        question: "Which of the following is NOT a feature of Java?",
        answers:[
            { text:  "Platform independence",correct:false},
            { text:  "Object-oriented",correct:false},
            { text:  "Manual memory management",correct:true},
            { text:  "Multithreading",correct:false},
        ]
},
{
    question: "Which statement about Java interfaces is TRUE?",
    answers:[
        { text:  "An interface can have instance variables.",correct:false},
        { text:  "An interface can extend multiple interfaces.",correct:true},
        { text:  "An interface can be instantiated directly.",correct:false},
        { text:  "An interface can have a constructor.",correct:false},
    ] 
},
{
    question: "Which of the following is NOT a valid Java access modifier?",
    answers:[
        { text:  "public",correct:false},
        { text:  "private",correct:false},
        { text:  "external",correct:true},
        { text:  "protected",correct:false},
    ] 
},
{
    question: "Which keyword is used to prevent a method from being overridden?",
    answers:[
        { text:  "abstract",correct:false},
        { text:  " final",correct:true},
        { text:  "static",correct:false},
        { text:  "private",correct:false},
    ] 
},
{
    question: "What will happen if a Java program does not handle an exception?",
    answers:[
        { text:  "The program will run normally.",correct:false},
        { text:  "The program will terminate immediately.",correct:true},
        { text:  "The program will enter an infinite loop.",correct:false},
        { text:  " The compiler will automatically fix the error.",correct:false},
    ] 
},
{
    question: "Which Java collection maintains insertion order?",
    answers:[
        { text:  "HashSet",correct:false},
        { text:  "TreeSet",correct:false},
        { text:  "LinkedHashSet",correct:true},
        { text:  "HashMap",correct:false},
    ] 
},
{
question: "What is the purpose of the super keyword in Java?",
answers:[
    { text:  "It calls the parent class constructor.",correct:true},
    { text:  "It refers to the current instance of a class.",correct:false},
    { text:  "It creates a new instance of the subclass.",correct:false},
    { text:  "It prevents method overriding.",correct:false},

] 
},
{
    question: "Which Java feature allows a subclass to provide a specific implementation of a method already defined in its superclass?",
    answers:[
        { text:  "Method overloading",correct:false},
        { text:  "Method overriding",correct:true},
        { text:  "Polymorphism",correct:false},
        { text:  "Encapsulation",correct:false},
    ] 
},
{

    question: "Which statement about Java constructors is FALSE?",
    answers:[
        { text:  "A constructor must have the same name as the class.",correct:false},
        { text:  "A constructor can return a value.",correct:true},
        { text:  "A class can have multiple constructors.",correct:false},
        { text:  " A constructor is called when an object is created.",correct:false},
    ] 
},
{
question: "What will happen if a Java class does not explicitly define a constructor?",
answers:[
    { text:  "The program will not compile.",correct:false},
    { text:  "A default constructor will be provided by Java.",correct:true},
    { text:  "The class cannot be instantiated.",correct:false},
    { text:  " A runtime error will occur.",correct:false},
] 
}
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }


}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();