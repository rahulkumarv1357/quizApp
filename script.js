import questionnaire from "./questions.js";

const question = document.querySelector('#question')
const options = document.querySelector('.options')
const nextButton = document.querySelector('.nextButton')
const startQ = document.querySelector('.startQuiz')

let currentQuestionIndex = 0, score = 0;

startQ.addEventListener('click', () => {
  currentQuestionIndex = 0
    startQ.style.display = "none"
    startQuiz()
})

nextButton.addEventListener( 'click', () => {
  if(currentQuestionIndex === questionnaire.length - 1){
    resetQuestion()
    const h3 = document.createElement('h3')
    question.innerHTML = ''
    h3.innerHTML = `Your score ${score} out of ${questionnaire.length}`
    options.appendChild(h3)
    nextButton.style.display = "none"
    startQ.style.display = "block"

  }else{
    currentQuestionIndex++
    displayQuestion()
  }
})

function resetQuestion(){
  options.innerHTML = ""
}

function checkAnswer(e){
  const answer = questionnaire[currentQuestionIndex].answer
  if(this.innerHTML === answer){
    score++
    this.classList.add('correct')
  }else{
    this.classList.add('wrong')
  }
  Array.from(options.children).forEach( (option) => {
    if(option.innerText === answer){
      option.classList.add('correct')
    }
    option.disabled = true
  })
  nextButton.style.display = 'block'
}

function displayQuestion(){
  resetQuestion()
  const currentQuestion = questionnaire[currentQuestionIndex]
  const questionNo = currentQuestionIndex + 1
  question.innerHTML =questionNo + ". "+ currentQuestion?.question
  currentQuestion?.options?.forEach( (option) => {
    const button = document.createElement("button")
    button.classList.add("option")
    button.innerHTML = option
    options.appendChild(button)
    button.addEventListener('click', checkAnswer)
  })
}

function startQuiz(){
  currentQuestionIndex = 0
  score = 0
  displayQuestion()
}

startQuiz()