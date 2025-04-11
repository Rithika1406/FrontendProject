const Questions = [
    {
      Question: "Which is the largest animal in the world?",
      answers: [
        { text: "Shark", correct: false },
        { text: "Blue whale", correct: true },
        { text: "Elephant", correct: false },
        { text: "Giraffe", correct: false },
      ]
    },
    {
      Question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true },
        { text: "Berlin", correct: false },
        { text: "Rome", correct: false },
      ]
    },
    {
      Question: "How many continents are there?",
      answers: [
        { text: "5", correct: false },
        { text: "6", correct: false },
        { text: "7", correct: true },
        { text: "8", correct: false },
      ]
    }
  ];
  
  const questionElement = document.getElementById("question");
  const answerButton = document.getElementById("Answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timerInterval;
  let timeLeft = 10;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    document.getElementById("score-display").textContent = "Score: 0";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    startTimer();
  
    let currentQuestion = Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.Question}`;
  
    // ✅ Update Progress Bar
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = ((questionNo) / Questions.length) * 100;
    progressBar.style.width = progressPercent + "%";
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      button.dataset.correct = answer.correct;
      button.addEventListener("click", selectAnswer);
      answerButton.appendChild(button);
    });
  }
  
  function resetState() {
    clearInterval(timerInterval);
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
      answerButton.removeChild(answerButton.firstChild);
    }
  }
  
  function selectAnswer(e) {
    clearInterval(timerInterval); // Stop the timer
  
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
  
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
      document.getElementById("score-display").textContent = "Score: " + score;
    } else {
      selectedBtn.classList.add("incorrect");
    }
  
    Array.from(answerButton.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
    });
  
    nextButton.style.display = "block";
  }
  
  function startTimer() {
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;
  
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        // Auto-select timeout behavior
        Array.from(answerButton.children).forEach(button => {
          button.disabled = true;
          if (button.dataset.correct === "true") {
            button.classList.add("correct");
          }
        });
        nextButton.style.display = "block";
      }
    }, 1000);
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `🎉 You scored ${score} out of ${Questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < Questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  // ✅ Start it all
  startQuiz();
  