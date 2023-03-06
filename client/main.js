const circles = document.querySelectorAll('.circle')
const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const closeButton = document.querySelector('#close')
const scoreSpan = document.querySelector('.score')
const scoreEnd = document.querySelector('.scoreEnd')
const overlay = document.querySelector('.overlay')

let score = 0
let active = 0
let timer
let pace = 1000
let rounds = 0
// eslint-disable-next-line no-unused-vars
let clicked
const getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const audioClick = () => {
  const audioRight = new Audio('https://audio.code.org/goal1.mp3')
  audioRight.play()
}

const clickCircle = (i) => {
  if (i !== active) {
    return endGame()
  }

  clicked = true
  score += 10
  scoreSpan.textContent = score
}

circles.forEach((circle, i) => {
  // eslint-disable-next-line indent
    circle.addEventListener('click', () => {
    audioClick()
    clickCircle(i)
  })
})

const enableCircles = () => {
  circles.forEach(circle => {
    circle.style.pointerEvents = 'auto'
  })
}

const startGame = () => {
  if (rounds >= 10) {
    return endGame()
  }

  startButton.classList.add('hidden')
  endButton.classList.remove('hidden')

  enableCircles()
  const nextActive = pickNew(active)

  circles[nextActive].classList.toggle('active')
  circles[active].classList.remove('active')

  active = nextActive

  timer = setTimeout(startGame, pace)

  pace -= 10
  rounds++
  console.log(score)
  function pickNew (active) {
    const nextActive = getRndInt(0, 3)
    if (nextActive !== active
    ) {
      return nextActive
    }
    return pickNew(active)
  }
}

const endGameAudio = () => {
  const audioLose = new Audio('https://audio.code.org/failure3.mp3')
  audioLose.play()
}

const endGame = () => {
  endGameAudio()
  scoreEnd.textContent = score
  endButton.classList.remove('hidden')
  startButton.classList.add('hidden')
  overlay.style.visibility = 'visible'
  console.log('game ended')
  clearTimeout(timer)
}

const resetGame = () => {
  window.location.reload()
}

startButton.addEventListener('click', startGame)
endButton.addEventListener('click', endGame)
closeButton.addEventListener('click', resetGame)
