// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// Quiz data
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "None",
    ],
    answer: 0,
  },
  {
    question: "Which language is used for styling?",
    options: ["HTML", "CSS", "Java", "Python"],
    answer: 1,
  },
  {
    question: "Which is used for logic?",
    options: ["CSS", "HTML", "JavaScript", "SQL"],
    answer: 2,
  },
  {
    question: "Which tag is used for inserting an image in HTML?",
    options: ["<img>", "<picture>", "<image>", "<src>"],
    answer: 0,
  },
  {
    question: "Which property is used to change text color in CSS?",
    options: ["font-color", "color", "text-color", "background-color"],
    answer: 1,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "#", "/* */"],
    answer: 1,
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<h6>", "<h1>", "<header>", "<head>"],
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external CSS file?",
    options: [
      "<link rel='stylesheet' href='style.css'>",
      "<stylesheet>style.css</stylesheet>",
      "<css src='style.css'>",
      "<link href='style.css'>",
    ],
    answer: 0,
  },
  {
    question:
      "Which JavaScript method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image?",
    options: ["title", "alt", "src", "text"],
    answer: 1,
  },
];


// State variables
let currentQuestion = 0;
let selectedAnswers = [];
let score = 0;
let timeLeft = 10;
let timer;

// Load question
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  startTimer();

  const q = questions[currentQuestion];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerText = option;

    // restore selected answer
    if (selectedAnswers[currentQuestion] === index) {
      li.classList.add("selected");
    }

    li.onclick = () => {
      selectedAnswers[currentQuestion] = index;

      // remove previous selection
      document
        .querySelectorAll("#options li")
        .forEach((opt) => opt.classList.remove("selected"));

      li.classList.add("selected");
    };

    optionsEl.appendChild(li);
  });
}

// Timer logic
function startTimer() {
  timerEl.innerText = `Time: ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `Time: ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// Navigation
nextBtn.onclick = nextQuestion;
prevBtn.onclick = prevQuestion;

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// Show result
function showResult() {
  clearInterval(timer);
  score = 0;

  questions.forEach((q, index) => {
    if (selectedAnswers[index] === q.answer) {
      score++;
    }
  });

  document.querySelector(".quiz-container").innerHTML = `
    <h1>Result</h1>
    <p>Your Score: ${score} / ${questions.length}</p>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

// Start quiz
loadQuestion();
