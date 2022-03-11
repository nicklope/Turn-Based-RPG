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

const yesBtn = document.querySelector('a')
yesBtn.remove()

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
  instructions.innerText = `Ohoho! An AI program that names itself? ${nameInput.value}!  How anomalous! :)`
  localStorage.setItem('inputName', nameInput.value)
  setTimeout(() => {
    instructions.innerText = `${nameInput.value}...`
  }, 6000)
  setTimeout(() => {
    instructions.innerText = `I created you for one purpose...`
  }, 8000)
  setTimeout(() => {
    instructions.innerText = `to search through my code...`
  }, 11000)
  setTimeout(() => {
    instructions.innerText = `AND DESTROY BUGS!`
  }, 14000)
  setTimeout(() => {
    instructions.innerText = `I made you more than well equipped for this task...`
  }, 17000)
  setTimeout(() => {
    instructions.innerText = `Are you ready?`
  }, 21000)
  setTimeout(() => {
    landingFlex.appendChild(yesBtn)
  }, 23000)
})
