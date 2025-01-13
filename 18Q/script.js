let currentQuestionIndex = 0;
let answers = [];
let timeRemaining = 20 * 60; // 20 minutes in seconds
let timerInterval;
const questions = [
    {
        question: "What is 2 + 2?", 
        image: "/18Q/18-question quize img/Q18.png", 
        options: [
            "/18Q/18-question quize img/Q18-01.png", 
            "/18Q/18-question quize img/Q18-02.png", 
            "/18Q/18-question quize img/Q18-03.png", 
            "/18Q/18-question quize img/Q18-04.png", 
            "/18Q/18-question quize img/Q18-05.png", 
            "/18Q/18-question quize img/Q18-06t.png"
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
        // Redirect to the next quiz page (e.g., results page or another quiz)
        window.location.href = "/19Q/index.html"; // Update to the appropriate path
    }
}

function endQuiz() {
    // Disable interactions after quiz completion
    document.querySelector(".nextButton").disabled = true;
    document.querySelector(".submitButton").disabled = true;

    // Calculate the IQ score based on answers
    let score = answers.filter(answer => answer).length; // Count correct answers

    // Display IQ result with images
    const resultImage = document.createElement("img");
    resultImage.src = getIQImage(score);
    resultImage.alt = "IQ Result";
    resultImage.style.width = "100%"; // Adjust size as needed
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    resultContainer.appendChild(resultImage);
    document.querySelector(".mainbox").innerHTML = '';
    document.querySelector(".mainbox").appendChild(resultContainer);
}

function getIQImage(score) {
    if (score >= 18) {
        return '/images/high-IQ.png';
    } else if (score >= 10) {
        return '/images/average-IQ.png';
    } else {
        return '/images/low-IQ.png';
    }
}