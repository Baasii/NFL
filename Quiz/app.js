const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', showResults);

const questions = [
  {
    question: 'What is the capital city of Serbia ?',
    answers: {
      a: 'Moscow',
      b: 'Pristina',
      c: 'Belgrade'
    },
    correctAnswer: 'c'
  },
  {
    question: 'In which country is the forest of Argonne located ?',
    answers: {
      a: 'France',
      b: 'Canada',
      c: 'Poland'
    },
    correctAnswer: 'a'
  },
  {
    question: 'Which of the following is the longest ?',
    answers: {
      a: 'Yangtze river',
      b: 'Yellow river',
      c: 'Rhine',
      d: 'Volga'
    },
    correctAnswer: 'a'
  }
];

function buildQuiz() {
  const output = [];

  questions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
      );
    }
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;

  questions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;

      answerContainers[questionNumber].style.color = 'lightgreen';
    } else {
      answerContainers[questionNumber].style.color = 'red';
    }
  });
  resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

buildQuiz();
