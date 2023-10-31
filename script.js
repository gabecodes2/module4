document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const questionDiv = document.getElementById("question");
    const timeSpan = document.getElementById("time");
    const gameOverDiv = document.getElementById("gameOver");
    const initialsInput = document.getElementById("initials");
    const saveScoreBtn = document.getElementById("saveScoreBtn");
    const leaderboardBtn = document.getElementById("leaderboardBtn");
    const nextBtn = document.getElementById("nextBtn");
    const feedbackDiv = document.getElementById("feedback");
    const leaderboard = [];

    const questions = [
        {
            question: "What's the capital of New York?",
            choices: ["Albany", "Buffalo", "New York City", "Ossining"],
            correctAnswer: "Albany"
        },
        {
            question: "What's the capital of Portugal?",
            choices: ["Faro", "Lisbon", "Paris", "Bali"],
            correctAnswer: "Lisbon"
        },
        {
            question: "What's the Population of France?",
            choices: ["65 Million", "35 Million", "150 Million", "300 Million"],
            correctAnswer: "65 Million"
        },
        {
            question: "What's the most populated Country",
            choices: ["China", "United States", "India", "Brazil"],
            correctAnswer: "India"
        }
    ];

    let questionIndex = 0;
    let time = 60;
    let timer;

    function startQuiz() {
        startBtn.style.display = "none";
        timer = setInterval(updateTime, 1000);
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[questionIndex];
        if (questionIndex < questions.length) {
            questionDiv.textContent = currentQuestion.question;
            for (let i = 0; i < currentQuestion.choices.length; i++) {
                const choice = document.createElement("button");
                choice.textContent = currentQuestion.choices[i];
                choice.className = "choice-btn"; 
                choice.addEventListener("click", function() {
                    handleAnswerClick(currentQuestion, currentQuestion.choices[i]);
                });
                questionDiv.appendChild(choice);
            }
        } else {
            endQuiz();
        }
    }

    function handleAnswerClick(question, selectedAnswer) {
        if (selectedAnswer === question.correctAnswer) {
            feedbackDiv.textContent = "Correct!";
            questionIndex++;
            showQuestion();
        } else {
            feedbackDiv.textContent = "Wrong!";
            time -= 10;
            if (time < 0) {
                time = 0; 
            }
            updateTime();
        }
    }

    function updateTime() {
        time--;
        timeSpan.textContent = time;
        if (time <= 0) {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timer);
        questionDiv.textContent = "Game Over!";
        gameOverDiv.style.display = "block";
        const initials = initialsInput.value.trim();
        const userEntry = {
            initials: initials,
            timeLeft: time
        };
        leaderboard.push(userEntry);
    }

    function saveScore() {
        const initials = initialsInput.value.trim();
        const score = time;
        const userEntry = {
            initials: initials,
            score: score
        };
        leaderboard.push(userEntry);
    }

    function displayLeaderboardByTime() {
        leaderboard.sort((a, b) => a.timeLeft - b.timeLeft);
        const leaderboardDiv = document.getElementById("leaderboard");
        leaderboardDiv.innerHTML = "<h2>Leaderboard</h2>";

        leaderboard.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.textContent = `${entry.initials}: ${entry.timeLeft} seconds left`;
            leaderboardDiv.appendChild(entryDiv);
        });
    }

    function displayLeaderboardByScore() {
        leaderboard.sort((a, b) => b.score - a.score);
        const leaderboardDiv = document.getElementById("leaderboard");
        leaderboardDiv.innerHTML = "<h2>Leaderboard</h2>";

        leaderboard.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.textContent = `${entry.initials}: ${entry.score} seconds left`;
            leaderboardDiv.appendChild(entryDiv);
        });
    }

    startBtn.addEventListener("click", startQuiz);
    saveScoreBtn.addEventListener("click", saveScore);
    leaderboardBtn.addEventListener("click", displayLeaderboardByScore);
});
