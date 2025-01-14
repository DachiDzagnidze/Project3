document.addEventListener('DOMContentLoaded', () => {
    let allAnswers = [];
    let missingQuizzes = [];
    
    // Loop through quiz keys from 1Q to 20Q
    for (let i = 1; i <= 20; i++) {
        const quizAnswers = JSON.parse(localStorage.getItem(`quizAnswers${i}Q`)) || [];
        if (quizAnswers.length === 0) {
            missingQuizzes.push(i);
        }
        allAnswers = allAnswers.concat(quizAnswers);
    }

    const totalAnswers = allAnswers.length;
    const correctAnswers = allAnswers.filter(answer => answer).length;
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    const iqCategory = document.getElementById('iqCategory');
    const retryButton = document.getElementById('retryButton');
    const scoreText = document.querySelector('.score');

    // Score counting animation
    let currentScore = 0;
    const totalScore = correctAnswers;
    const interval = setInterval(() => {
        if (currentScore < totalScore) {
            currentScore++;
            scoreDisplay.textContent = currentScore;
        } else {
            clearInterval(interval);

            // Calculate IQ based on correct answers
            let iqScore = 0;

            if (correctAnswers >= 16 && correctAnswers <= 20) {
                iqScore = Math.floor((correctAnswers - 15) * 8 + 120); // For 16-20 correct answers (120-160 range)
                iqCategory.textContent = `Your IQ: ${iqScore}`;
            } else if (correctAnswers >= 11 && correctAnswers <= 15) {
                iqScore = Math.floor((correctAnswers - 10) * 3 + 100); // For 11-15 correct answers (100-115 range)
                iqCategory.textContent = `Average IQ: ${iqScore}`;
            } else {
                iqScore = Math.floor(correctAnswers * 2 + 70); // For 0-10 correct answers (70-90 range)
                iqCategory.textContent = `Low IQ: ${iqScore}`;
            }
        }
    }, 30);

    // Handling missing quizzes
    if (missingQuizzes.length > 0) {
        scoreText.innerHTML = `You have not completed all quizzes. Missing quizzes: ${missingQuizzes.join(', ')}`;
        retryButton.style.display = 'block';
        retryButton.addEventListener('click', () => {
            window.location.href = `/quiz${missingQuizzes[0]}/homepage/index.html`;
        });
    } else {
        if (totalAnswers === 0) {
            scoreText.innerHTML = "No answers found. Please complete all quizzes.";
            retryButton.style.display = 'none';
        } else {
            retryButton.style.display = 'none';
        }
    }
});
