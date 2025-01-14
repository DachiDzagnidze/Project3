let currentQuestionIndex = 0;
let answers = [];
let timeRemaining = 2 * 60; 
let timerInterval;
let hasSubmittedAnswer = false; 
const questions = [
    {
        image: "/1Q/1-question quize img/Q1.png", 
        options: [
            "/1Q/1-question quize img/Q1-01.png", 
            "/1Q/1-question quize img/Q1-02.png", 
            "/1Q/1-question quize img/Q1-03t.png", 
            "/1Q/1-question quize img/Q1-04.png", 
            "/1Q/1-question quize img/Q1-05.png", 
            "/1Q/1-question quize img/Q1-06.png"
        ],
        correctAnswerIndex: 2
    },
    // Add more questions here
];

document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    displayQuestion();
    document.querySelector(".submitButton").addEventListener("click", submitAnswer);
    document.querySelector(".nextButton").addEventListener("click", nextQuestion);
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            if (!hasSubmittedAnswer) {
                alert("Time's up! You didn't submit an answer.");
                window.location.href = "/homepage/index.html"; // Redirect to quizzesFinish folder's index.html
            }
            document.querySelector(".nextButton").disabled = true; // Disable Next button
            endQuiz();
        }
    }, 1000);
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        // Set the question image dynamically
        document.querySelector("#questionImage").src = question.image;
        
        const answerImages = document.querySelectorAll(".answer img");
        
        answerImages.forEach((img, index) => {
            img.src = question.options[index]; // Set option images dynamically
            img.setAttribute("data-index", index); // Set data-index for easier reference
            img.parentElement.classList.remove("selected"); // Remove previous selection class
            img.style.border = ""; // Reset border color
        });

        // Reset the "Next" button to be disabled initially
        document.querySelector(".nextButton").style.display = "none";
        document.querySelector(".submitButton").style.display = "block"; // Show submit button
    }
}

// Add event listener to image elements for selecting answer
document.querySelectorAll(".answer img").forEach(img => {
    img.addEventListener("click", () => {
        // Deselect any previously selected image
        document.querySelectorAll(".answer").forEach(el => el.classList.remove("selected"));
        
        // Add selected class to clicked image
        img.parentElement.classList.add("selected");
    });
});

function submitAnswer() {
    const selectedAnswer = document.querySelector(".answers .selected");
    
    if (selectedAnswer) {
        hasSubmittedAnswer = true; // Mark that an answer has been submitted
        const selectedAnswerIndex = parseInt(selectedAnswer.querySelector("img").getAttribute("data-index"));
        const correctAnswerIndex = questions[currentQuestionIndex].correctAnswerIndex;
        
        // Mark the selected answer (correct/incorrect) with animations
        const answerElements = document.querySelectorAll(".answer");
        answerElements.forEach((el, index) => {
            const img = el.querySelector("img");
            if (index === correctAnswerIndex) {
                el.classList.add("correct"); // Add class for correct answer animation
            } else if (index === selectedAnswerIndex) {
                el.classList.add("incorrect"); // Add class for incorrect answer animation
            }
        });

        // Store the selected answer (correct/incorrect)
        answers.push(selectedAnswerIndex === correctAnswerIndex);
        localStorage.setItem('quizAnswers1Q', JSON.stringify(answers)); 
        
        
        document.querySelector(".submitButton").style.display = "none";
        document.querySelector(".nextButton").style.display = "block";
    } else {
        alert("Please select an answer before submitting.");
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
        // Redirect to the next quiz page (2Q folder)
        window.location.href = "/2Q/index.html"; // Redirects to 2Q folder index.html
    }
}

function endQuiz() {
    // Disable interactions after quiz completion
    document.querySelector(".nextButton").disabled = true;
    document.querySelector(".submitButton").disabled = true;
}