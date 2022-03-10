const titleMusic = new Audio('audio/TitleScreen.mp3')
const startSound = new Audio('audio/equip.wav')

const landingFlex = document.getElementById('landing-flex')
const startBtn = document.getElementById('start-btn')
const gameTitle = document.querySelector('h1')
const instructions = document.getElementById('instructions')
const nameForm = document.createElement('form')
const nameInput = document.createElement('input')
const submitName = document.createElement('input')
submitName.id = 'submit-btn'
submitName.setAttribute('type', 'button')

startBtn.addEventListener('click', () => {
  startSound.play()
  startBtn.remove()
  gameTitle.remove()
  setTimeout(() => {
    titleMusic.play()
    instructions.innerText = 'Hello World! :)'
  }, 3000)
  setTimeout(() => {
    instructions.innerText = 'Or should I say...'
  }, 6000)
  setTimeout(() => {
    instructions.innerText = 'Welcome to existence.'
  }, 9000)
  setTimeout(() => {
    instructions.innerText = 'Enter your name...'
    landingFlex.appendChild(nameForm)
    nameForm.appendChild(nameInput)
    nameForm.appendChild(submitName)
  }, 12000)
})
submitName.addEventListener('click', () => {
  startSound.play()
  nameForm.remove()
  instructions.innerText = `Ohoho! An AI program with a name? ${nameInput.value}!  How anomalous! :)`
})
