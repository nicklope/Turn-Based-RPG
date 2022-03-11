// Global Variables
const gameView = document.getElementById('game-view')
const actionBar = document.getElementById('action-bar')
const enemyDiv = document.getElementById('enemy-div')
const playerDisplay = document.getElementById('player-display')
const enemyImg = document.querySelector('img')
const screen = document.getElementById('screen')

const attackBtn = document.createElement('div')
attackBtn.id = 'attack-btn'
attackBtn.className = 'action-btn'
attackBtn.innerText = 'attack'
const magicBtn = document.createElement('div')
magicBtn.id = 'magic-btn'
magicBtn.className = 'action-btn'
magicBtn.innerText = 'magic'
const guardBtn = document.createElement('div')
guardBtn.id = 'guard-btn'
guardBtn.className = 'action-btn'
guardBtn.innerText = 'guard'
const itemBtn = document.createElement('div')
itemBtn.id = 'item-btn'
itemBtn.className = 'action-btn'
itemBtn.innerText = 'items'

const fireBtn = document.createElement('div')
fireBtn.id = 'fire-btn'
fireBtn.className = 'action-btn'
const waterBtn = document.createElement('div')
waterBtn.id = 'water-btn'
waterBtn.className = 'action-btn'
const airBtn = document.createElement('div')
airBtn.id = 'air-btn'
airBtn.className = 'action-btn'
const earthBtn = document.createElement('div')
earthBtn.id = 'earth-btn'
earthBtn.className = 'action-btn'

const pizzaBtn = document.createElement('div')
pizzaBtn.id = 'pizza-btn'
pizzaBtn.className = 'action-btn'
const coffeeBtn = document.createElement('div')
coffeeBtn.id = 'coffee-btn'
coffeeBtn.className = 'action-btn'

const inspectBtn = document.createElement('div')
inspectBtn.id = 'inspect-btn'
inspectBtn.className = 'action-btn'

const goBackBtn = document.createElement('div')
goBackBtn.id = 'goback-btn'
goBackBtn.className = 'action-btn'

let enemyAttackDeclarationTO = ''
let firstEnemyAttackTO = ''
let reappendTO = ''

// Game Start
const searchButton = document.createElement('div')
searchButton.id = 'search-btn'
searchButton.innerText = 'What happened???'
actionBar.appendChild(searchButton)
actionBar.style.display = 'flex'
actionBar.style.justifyContent = 'center'
actionBar.style.alignItems = 'center'

// Functions
const clearActionBar = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
  actionBar.style.display = 'flex'
  actionBar.style.justifyContent = 'center'
  actionBar.style.alignItems = 'center'
}
const appendActionBar = () => {
  actionBar.style.animationName = 'still'
  actionBar.innerText = ''
  actionBar.style.display = 'grid'
  actionBar.style.gridTemplateColumns = '25% 25% 25% 25%'
  actionBar.style.justifyContent = ''
  actionBar.style.alignItems = ''
  actionBar.appendChild(attackBtn)
  actionBar.appendChild(magicBtn)
  actionBar.appendChild(guardBtn)
  actionBar.appendChild(itemBtn)
}
const appendMagicBar = () => {
  clearActionBar(actionBar)
  actionBar.style.display = 'grid'
  actionBar.style.justifyContent = ''
  actionBar.style.gridTemplateColumns = '20% 20% 20% 20% 20%'
  actionBar.style.alignItems = ''
  actionBar.appendChild(fireBtn)
  fireBtn.innerText = 'fire (25mp)'
  actionBar.appendChild(waterBtn)
  waterBtn.innerText = 'water (25mp)'
  actionBar.appendChild(goBackBtn)
  goBackBtn.innerText = 'go back'
  actionBar.appendChild(airBtn)
  airBtn.innerText = 'air (20mp)'
  actionBar.appendChild(earthBtn)
  earthBtn.innerText = 'earth (20mp)'
}
const appendItemBar = () => {
  clearActionBar(actionBar)
  actionBar.style.display = 'grid'
  actionBar.style.gridTemplateColumns = '33.33% 33.33% 33.33%'
  actionBar.style.justifyContent = ''
  actionBar.style.alignItems = ''
  actionBar.appendChild(pizzaBtn)
  pizzaBtn.innerText = 'pizza bagels'
  actionBar.appendChild(goBackBtn)
  goBackBtn.innerText = 'go back'
  actionBar.appendChild(coffeeBtn)
  coffeeBtn.innerText = `nice'd coffee`
}
const appendInspectBar = () => {
  if (actionBar.innerHTML.includes('items')) {
    clearActionBar(actionBar)
    actionBar.style.display = 'grid'
    actionBar.style.gridTemplateColumns = '50% 50%'
    actionBar.style.justifyContent = ''
    actionBar.style.alignItems = ''
    actionBar.appendChild(inspectBtn)
    inspectBtn.innerText = 'inspect enemy? (10mp)'
    actionBar.appendChild(goBackBtn)
    goBackBtn.innerText = 'go back'
  }
}
const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}
const hitRate = () => {
  return Math.floor(Math.random() * 10)
}

const attack = (player, enemy) => {
  clearActionBar(actionBar)
  let hitRating = hitRate()
  player.damage = randomRange(18, 23)

  playerTurnSound.play()
  actionBar.innerText = `${player.name} goes for the attack!`

  if (hitRating <= 1) {
    setTimeout(function () {
      missSound.play()

      enemyDiv.style.animationName = 'dodge'

      actionBar.innerText = `Oh no! ${player.name} missed!!`
      setTimeout(checkForWin, 2000)
      setTimeout(checkForWin, 6000)
      playerDisplay.innerText = ` ${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    }, 1250)
  } else if (hitRating >= 9) {
    setTimeout(function () {
      critSound.play()
      enemyDiv.style.animationName = 'blink'
      actionBar.innerText = `OOOOF!! ${enemy.name} took ${
        player.damage * 2
      } points of critical damage!`
      enemy.hp -= player.damage * 2
      setTimeout(checkForWin, 2000)
      setTimeout(checkForWin, 6000)
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    }, 1000)
  } else {
    setTimeout(function () {
      attackSound.play()
      enemyDiv.style.animationName = 'blink'
      actionBar.innerText = `${enemy.name} took ${player.damage} points of damage!`
      enemy.hp -= player.damage
      setTimeout(checkForWin, 2000)
      setTimeout(checkForWin, 6000)
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    }, 1250)
  }
}
const guard = (attacker, attacked) => {
  clearActionBar(actionBar)
  playerTurnSound.play()
  actionBar.innerText = `${attacker.name} braced for an attack!`
  attacker.guarding = true
  playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
  enemyTurn(attacked)
}
const useItem = (player, item, enemy) => {
  clearActionBar(actionBar)
  if (item === 'bagel') {
    if (player.bagelCount > 0) {
      eatSound.play()
      actionBar.innerText = `${player.name} ate a delicious pizza bagel...`
      player.hp += player.pizzaBagel
      setTimeout(function () {
        statUpSound.play()
        player.bagelCount--
        actionBar.innerText = `${player.name} gained 50 hp!(${player.bagelCount} left)`
        setTimeout(checkForWin, 2000)
        setTimeout(checkForWin, 6000)
        playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
        enemyTurn(enemy)
      }, 1750)
    } else if (player.bagelCount <= 0) {
      errorSound.play()
      actionBar.innerText = 'You dont have anymore pizza bagels!'
      setTimeout(function () {
        appendItemBar()
      }, 1750)
    }
  } else if (item === 'coffee') {
    if (player.coffeeCount > 0) {
      drinkSound.play()
      actionBar.innerText = `${player.name} guzzled down a nice'd coffee!`
      player.mp += player.niceCoffee
      setTimeout(function () {
        statUpSound.play()
        player.coffeeCount--
        actionBar.innerText = `${player.name} gained back 30 mp!(${player.coffeeCount} left)`
        setTimeout(checkForWin, 2000)
        setTimeout(checkForWin, 6000)
        playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
        enemyTurn(enemy)
      }, 1750)
    } else if (player.coffeeCount <= 0) {
      errorSound.play()
      actionBar.innerText = `You dont have anymore nice'd coffee!`
      setTimeout(function () {
        appendItemBar()
      }, 1750)
    }
  }
}
const inspectEnemy = (enemy) => {
  clearActionBar(actionBar)
  inspectSound.play()
  player.mp -= 10
  playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
  actionBar.innerText = `name: ${enemy.name} (he aint that itsy-bitsy!)`
  setTimeout(() => {
    actionBar.innerText = ` likes: software engineer brains`
  }, 2500)
  setTimeout(() => {
    actionBar.innerText = `max hp: ???`
  }, 4500)
  setTimeout(() => {
    actionBar.innerText = 'weaknesses: ???'
  }, 6500)
  setTimeout(() => {
    actionBar.innerText = 'resistances: ???'
  }, 8500)
  setTimeout(() => {
    appendActionBar()
  }, 10500)
}
const fireAttack = (player, enemy) => {
  clearActionBar(actionBar)

  if (player.mp >= 25) {
    magicSound.play()
    actionBar.innerText = `${player.name} starts conjuring a fire spell!`

    if (enemy.weaknesses.includes('fire')) {
      enemy.hp -= player.fireSpell * 1.5

      setTimeout(function () {
        fireSound.play()
        enemyDiv.style.animationName = 'fire'
        actionBar.innerText = `OOOF! ${enemy.name} took ${
          player.fireSpell * 1.5
        } points of damage!`
      }, 1250)

      player.mp -= 25
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    } else if (enemy.resistances.includes('fire')) {
      enemy.hp += player.fireSpell - 10

      setTimeout(function () {
        ailmentSound.play()
        enemyDiv.style.animationName = 'nouse'
        actionBar.innerText = `Its no use! Fire is only making it stronger! ${
          enemy.name
        } gained ${player.firespell - 10} hp`
      }, 1250)
      player.mp -= 25
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    }
  } else {
    errorSound.play()
    actionBar.innerText = 'Not enough MP!'
    playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
    enemyTurn(enemy)
  }
  setTimeout(checkForWin, 2000)
  setTimeout(checkForWin, 6000)
}
const waterAttack = (player, enemy) => {
  clearActionBar(actionBar)

  if (player.mp >= 25) {
    magicSound.play()
    actionBar.innerText = `${player.name} shot a torrent of water!`

    if (enemy.weaknesses.includes('water')) {
      enemy.hp -= player.waterSpell * 1.5

      setTimeout(function () {
        waterSound.play()
        enemyDiv.style.animationName = 'blink'
        actionBar.innerText = `OOOF! ${enemy.name} took ${
          player.waterSpell * 1.5
        } points of damage!`
      }, 1250)

      player.mp -= 25
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    } else if (enemy.resistances.includes('water')) {
      enemy.hp += player.waterSpell - 10

      setTimeout(function () {
        ailmentSound.play()
        enemyDiv.style.animationName = 'nouse'
        actionBar.innerText = `Its no use! Water is only making it stronger!`
      }, 1250)
      player.mp -= 25
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    }
  } else {
    errorSound.play()
    actionBar.innerText = 'Not enough MP!'
    playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
    enemyTurn(enemy)
  }
  setTimeout(checkForWin, 2000)
  setTimeout(checkForWin, 6000)
}
const airAttack = (player, enemy) => {
  clearActionBar(actionBar)

  if (player.mp >= 20) {
    magicSound.play()
    actionBar.innerText = `${player.name} summoned a huge gust of wind!`

    if (enemy.weaknesses.includes('air')) {
      enemy.hp -= player.airSpell * 1.5

      setTimeout(function () {
        airSound.play()
        enemyDiv.style.animationName = 'blink'
        actionBar.innerText = `OOOF! ${enemy.name} took ${
          player.airSpell * 1.5
        } points of damage!`
      }, 1250)

      player.mp -= 20
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    } else if (enemy.resistances.includes('air')) {
      enemy.hp += player.airSpell - 10

      setTimeout(function () {
        ailmentSound.play()
        enemyDiv.style.animationName = 'nouse'
        actionBar.innerText = `Its no use! Wind is only making it stronger!`
      }, 1250)
      player.mp -= 20
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    }
  } else {
    errorSound.play()
    actionBar.innerText = 'Not enough MP!'
    enemyTurn(enemy)
  }
  setTimeout(checkForWin, 2000)
  setTimeout(checkForWin, 6000)
}
const earthAttack = (player, enemy) => {
  clearActionBar(actionBar)

  if (player.mp >= 20) {
    magicSound.play()
    actionBar.innerText = `${player.name} caused a massive earthquake!`

    if (enemy.weaknesses.includes('earth')) {
      enemy.hp -= player.earthSpell * 1.5

      setTimeout(function () {
        earthSound.play()
        enemyDiv.style.animationName = 'earth'
        actionBar.innerText = `OOOF! ${enemy.name} took ${
          player.earthSpell * 1.5
        } points of damage!`
      }, 1250)

      player.mp -= 20
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    } else if (enemy.resistances.includes('earth')) {
      enemy.hp += player.earthSpell - 10

      setTimeout(function () {
        ailmentSound.play()
        enemyDiv.style.animationName = 'nouse'
        actionBar.innerText = `Its no use! The earthquake is only making it stronger!`
      }, 1250)
      player.mp -= 20
      playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
      enemyTurn(enemy)
    }
  } else {
    errorSound.play()
    actionBar.innerText = 'Not enough MP!'
    enemyTurn(enemy)
  }
  setTimeout(checkForWin, 2000)
  setTimeout(checkForWin, 6000)
}
const enemyTurn = (enemy) => {
  enemy.damage = randomRange(20, 23)
  let hitRating = hitRate()
  let i = Math.floor(Math.random() * 13)
  if (enemy.hp > 150) {
    enemyAttackDeclarationTO = setTimeout(function () {
      enemyTurnSound.play()
      enemyDiv.style.animationName = 'still'
      actionBar.innerText = `${enemy.name} went for a bite!`
    }, 3000)

    firstEnemyAttackTO = setTimeout(function () {
      if (player.guarding === false) {
        if (hitRating <= 2) {
          missSound.play()
          actionBar.innerText = `Phew! ${enemy.name} missed!`
          enemyPhraseTO = setTimeout(() => {
            actionBar.innerText = `${enemy.enemyPhrases[i]}`
          }, 2600)
          reappendTO = setTimeout(appendActionBar, 4500)
        } else if (hitRating > 9) {
          critSound.play()
          player.hp -= enemy.damage * 1.5
          playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
          actionBar.style.animationName = 'shake'
          actionBar.innerText = `OOOF! That hit hard! Took ${
            enemy.damage * 1.5
          } points of damage!`
          enemyPhraseTO = setTimeout(() => {
            actionBar.innerText = `${enemy.enemyPhrases[i]}`
          }, 2500)
          reappendTO = setTimeout(appendActionBar, 4500)
        } else {
          attackSound.play()
          player.hp -= enemy.damage
          playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
          actionBar.style.animationName = 'shake'
          actionBar.innerText = `${player.name} took ${enemy.damage} points of damage!`
          enemyPhraseTO = setTimeout(() => {
            actionBar.innerText = `${enemy.enemyPhrases[i]}`
          }, 2500)
          reappendTO = setTimeout(appendActionBar, 4500)
        }
      } else {
        guardSound.play()
        actionBar.innerText = `${enemy.name}'s attack bounced right off ${player.name}!`
        player.guarding = false
        reappendTO = setTimeout(appendActionBar, 1500)
      }
    }, 5000)
  } else if (enemy.hp <= 100) {
    enemyAttackDeclarationTO = setTimeout(function () {
      enemyTurnSound.play()
      enemyDiv.style.animationName = 'still'
      actionBar.innerText = `${enemy.name} went for a bite!`
    }, 3000)

    firstEnemyAttackTO = setTimeout(function () {
      if (player.guarding === false) {
        if (hitRating <= 2) {
          missSound.play()
          actionBar.innerText = `Phew! ${enemy.name} missed!`
          enemyPhraseTO = setTimeout(() => {
            actionBar.innerText = `${enemy.enemyPhrases[i]}`
          }, 2600)
          reappendTO = setTimeout(appendActionBar, 4500)
        } else if (hitRating > 9) {
          critSound.play()
          player.hp -= enemy.damage * 1.5
          playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
          actionBar.style.animationName = 'shake'
          actionBar.innerText = `OOOF! That hit hard! Took ${
            enemy.damage * 1.5
          } points of damage!`
          enemyPhraseTO = setTimeout(() => {
            actionBar.innerText = `${enemy.enemyPhrases[i]}`
          }, 2500)
          reappendTO = setTimeout(appendActionBar, 4500)
        } else {
          attackSound.play()
          player.hp -= enemy.damage
          playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`
          actionBar.style.animationName = 'shake'
          actionBar.innerText = `${player.name} took ${enemy.damage} points of damage!`
          enemyPhraseTO = setTimeout(() => {
            actionBar.innerText = `${enemy.enemyPhrases[i]}`
          }, 2500)
          reappendTO = setTimeout(appendActionBar, 4500)
        }
      } else {
        guardSound.play()
        actionBar.innerText = `${enemy.name}'s attack bounced right off ${player.name}!`
        player.guarding = false
        reappendTO = setTimeout(appendActionBar, 1500)
      }
    }, 5000)
  }
}
const checkForWin = () => {
  if (player.hp <= 0) {
    clearTimeout(reappendTO)
    clearTimeout(enemyPhraseTO)
    youLose()
  } else if (enemy.hp <= 0) {
    clearTimeout(firstEnemyAttackTO)
    clearTimeout(enemyAttackDeclarationTO)
    clearTimeout(enemyPhraseTO)
    youWin()
  }
}
const youLose = () => {
  clearActionBar(actionBar)
  actionBar.innerText = 'GAME OVER'
}
const youWin = () => {
  clearActionBar(actionBar)
  actionBar.innerText = 'YOU WIN'
}

// Obects + constructors

const player = {
  name: localStorage.getItem('inputName'),
  hp: 100,
  mp: 100,
  damage: '',
  fireSpell: 20,
  waterSpell: 20,
  airSpell: 16,
  earthSpell: 16,
  guarding: false,
  pizzaBagel: 50,
  bagelCount: 2,
  niceCoffee: 30,
  coffeeCount: 2
}
playerDisplay.innerText = `${player.name} HP: ${player.hp} MP: ${player.mp}`

const enemy = {
  name: 'Fatal Bug',
  hp: 250,
  mp: 100,
  damage: '',
  weaknesses: ['water'],
  resistances: ['air', 'fire', 'earth'],
  enemyPhrases: [
    `The fatal bug is sizing up the situation.`,
    `The fatal bug is thinking about murder...`,
    `The fatal bug wish it were home ruining software...`,
    `The fatal bug is watching you closely.`,
    `The fatal bug is restless...`,
    `The fatal bug is pondering what brains taste like.`,
    `The fatal bug is thinking about CSS Grid...`,
    `The fatal bug is muttering insanely.`,
    `The fatal bug seems bored.`,
    `The fatal bug is watching you closely.`,
    `The fatal bug hops closer.`,
    `The fatal bug hops closer.`,
    `The fatal bug hops closer.`
  ]
}
const fightMusic = new Audio('audio/fightmusic2.mp3')
const playerTurnSound = new Audio('audio/playerturn.mp3')
const attackSound = new Audio('audio/attack1.mp3')
const enemyTurnSound = new Audio('audio/enemyattack.wav')
const critSound = new Audio('audio/smaaash.wav')
const missSound = new Audio('audio/miss.wav')
const eatSound = new Audio('audio/eat.wav')
const drinkSound = new Audio('audio/bubblegum.wav')
const statUpSound = new Audio('audio/heal.wav')
const errorSound = new Audio('audio/error.wav')
const magicSound = new Audio('audio/psi2.wav')
const inspectSound = new Audio('audio/phonehangup.wav')
const fireSound = new Audio('audio/fire1.wav')
const waterSound = new Audio('audio/beam.wav')
const airSound = new Audio('audio/breath.wav')
const earthSound = new Audio('audio/thunder2.wav')
const guardSound = new Audio('audio/tcrash.wav')
const startSound = new Audio('audio/equip.wav')
const bugFoundSound = new Audio('audio/mysterious.wav')
const ailmentSound = new Audio('audio/ailment.wav')
const openSound = new Audio('audio/curshoriz.wav')
const closeSound = new Audio('audio/cursverti.wav')

// Event Listeners

attackBtn.addEventListener('click', () => {
  // attack(player, enemy)
  // fightMusic.play()
  clearActionBar(actionBar)
  actionBar.innerText = 'Thank you for playing! Fatal bug fight coming soon!'
})
guardBtn.addEventListener('click', () => {
  // guard(player, enemy)
  clearActionBar(actionBar)
  actionBar.innerText = 'Thank you for playing! Fatal bug fight coming soon!'
})
itemBtn.addEventListener('click', () => {
  // openSound.play()
  // appendItemBar()
  clearActionBar(actionBar)
  actionBar.innerText = 'Thank you for playing! Fatal bug fight coming soon!'
})
magicBtn.addEventListener('click', () => {
  // openSound.play()
  // appendMagicBar()
  clearActionBar(actionBar)
  actionBar.innerText = 'Thank you for playing! Fatal bug fight coming soon!'
})
fireBtn.addEventListener('click', () => {
  // fireAttack(player, enemy)
  clearActionBar(actionBar)
  actionBar.innerText = 'Thank you for playing! Fatal bug fight coming soon!'
})
waterBtn.addEventListener('click', () => {
  waterAttack(player, enemy)
})
airBtn.addEventListener('click', () => {
  airAttack(player, enemy)
})
earthBtn.addEventListener('click', () => {
  earthAttack(player, enemy)
})
pizzaBtn.addEventListener('click', () => {
  useItem(player, 'bagel', enemy)
})
coffeeBtn.addEventListener('click', () => {
  useItem(player, 'coffee', enemy)
})
goBackBtn.addEventListener('click', () => {
  closeSound.play()
  appendActionBar()
})
enemyImg.addEventListener('click', () => {
  inspectSound.play()
  appendInspectBar()
})
inspectBtn.addEventListener('click', () => {
  inspectEnemy(enemy)
})
searchButton.addEventListener('click', () => {
  searchButton.remove()
  startSound.play()
  actionBar.innerText = 'the annoying bug...'
  setTimeout(() => {
    actionBar.innerText = 'by destroying it...'
  }, 3000)
  setTimeout(() => {
    actionBar.innerText = 'you made an even worse bug!'
  }, 7000)
  setTimeout(() => {
    bugFoundSound.play()
    enemyImg.style.opacity = 1
    actionBar.innerText = 'Bug Identified!'
  }, 9000)
  setTimeout(() => {
    playerDisplay.style.opacity = 1
    appendActionBar()
    fightMusic.play()
    screen.style.animation =
      'color var(--d) var(--e) infinite, position var(--d) var(--e) infinite'
  }, 11000)
})