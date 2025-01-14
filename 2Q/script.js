let currentQuestionIndex = 0;
let answers = [];
let timeRemaining = 2 * 60; 
let timerInterval;
let hasSubmittedAnswer = false; 

const questions = [
    {
        image: "/2Q/02-question quize img/Q2.png", 
        options: [
            "/2Q/02-question quize img/Q2-01.png", 
            "/2Q/02-question quize img/Q2-02.png", 
            "/2Q/02-question quize img/Q2-03.png", 
            "/2Q/02-question quize img/Q2-04.png", 
            "/2Q/02-question quize img/Q2-05.png", 
            "/2Q/02-question quize img/Q2-06t.png"
        ],
        correctAnswerIndex: 5
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
                window.location.href = "/homepage/index.html"; // Redirect to homepage if no answer was submitted
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
        hasSubmittedAnswer = true; // Mark as submitted
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
        localStorage.setItem('quizAnswers2Q', JSON.stringify(answers)); // Store answers in local storage

        // Hide submit button and show next button
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
        // Redirect to the next quiz page (3Q folder)
        window.location.href = "/3Q/index.html"; // Redirects to 3Q folder index.html
    }
}

function endQuiz() {
    // Disable interactions after quiz completion
    document.querySelector(".nextButton").disabled = true;
    document.querySelector(".submitButton").disabled = true;
}