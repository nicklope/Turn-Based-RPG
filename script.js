// Global Variables
const gameView = document.getElementById('game-view')
const actionBar = document.getElementById('action-bar')
const enemyDiv = document.getElementById('enemy-div')

const attackBtn = document.createElement('div')
attackBtn.id = 'attack-btn'
attackBtn.className = 'action-btn'
const magicBtn = document.createElement('div')
magicBtn.id = 'magic-btn'
magicBtn.className = 'action-btn'
const guardBtn = document.createElement('div')
guardBtn.id = 'guard-btn'
guardBtn.className = 'action-btn'
const itemBtn = document.createElement('div')
itemBtn.id = 'item-btn'
itemBtn.className = 'action-btn'

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

let enemyAttackDeclarationTO = ''
let firstEnemyAttackTO = ''
let reappendTO = ''

actionBar.appendChild(attackBtn)
attackBtn.innerText = 'attack'
actionBar.appendChild(magicBtn)
magicBtn.innerText = 'magic'
actionBar.appendChild(guardBtn)
guardBtn.innerText = 'guard'
actionBar.appendChild(itemBtn)
itemBtn.innerText = 'items'

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
  actionBar.style.alignItems = ''
  actionBar.appendChild(fireBtn)
  fireBtn.innerText = 'fire'
  actionBar.appendChild(waterBtn)
  waterBtn.innerText = 'water'
  actionBar.appendChild(airBtn)
  airBtn.innerText = 'air'
  actionBar.appendChild(earthBtn)
  earthBtn.innerText = 'earth'
}
const appendItemBar = () => {
  clearActionBar(actionBar)
  actionBar.style.display = 'grid'
  actionBar.style.justifyContent = ''
  actionBar.style.alignItems = ''
  actionBar.appendChild(pizzaBtn)
  pizzaBtn.innerText = 'pizza bagels'
  actionBar.appendChild(coffeeBtn)
  coffeeBtn.innerText = `nice'd coffee`
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
  player.damage = randomRange(14, 28)
  console.log(enemy.hp, player.hp)

  actionBar.innerText = `${player.name} goes for the attack!`

  if (hitRating <= 1) {
    setTimeout(function () {
      enemyDiv.style.animationName = 'dodge'

      actionBar.innerText = `Oh no! ${player.name} missed!!`
      setTimeout(checkForWin, 2000)
      setTimeout(checkForWin, 6000)
      enemyTurn(enemy)
    }, 1250)
  } else if (hitRating >= 9) {
    setTimeout(function () {
      enemyDiv.style.animationName = 'blink'
      actionBar.innerText = `OOOOF!! ${enemy.name} took ${
        player.damage * 2
      } points of critical damage!`
      enemy.hp -= player.damage * 2
      setTimeout(checkForWin, 2000)
      setTimeout(checkForWin, 6000)
      enemyTurn(enemy)
    }, 1000)
  } else {
    setTimeout(function () {
      enemyDiv.style.animationName = 'blink'
      actionBar.innerText = `${enemy.name} took ${player.damage} points of damage!`
      enemy.hp -= player.damage
      setTimeout(checkForWin, 2000)
      setTimeout(checkForWin, 6000)
      enemyTurn(enemy)
    }, 1250)
  }
}
const guard = (attacker, attacked) => {
  clearActionBar(actionBar)
  actionBar.innerText = `${attacker.name} braced for an attack!`
  attacker.guarding = true
  enemyTurn(attacked)
}
const useItem = (player, enemy) => {
  clearActionBar(actionBar)
  actionBar.innerText = `${player.name} ate a delicious bagel...`
  player.hp += 10
  setTimeout(function () {
    actionBar.innerText = `${player.name} gained back 10 hp!`
  }, 1750)

  enemyTurn(enemy)
}
const fireAttack = (player, enemy) => {
  clearActionBar(actionBar)

  if (player.mp > 25) {
    actionBar.innerText = `${player.name} starts conjuring a fire spell!`

    if (enemy.weaknesses.includes('fire')) {
      enemy.hp -= player.fireSpell * 1.5

      setTimeout(function () {
        enemyDiv.style.animationName = 'blink'
        actionBar.innerText = `OOOF! ${enemy.name} took ${
          player.fireSpell * 1.5
        } points of damage!`
      }, 1250)

      player.mp -= 25
      enemyTurn(enemy)
    } else if (enemy.resistances.includes('fire')) {
      enemy.hp += player.fireSpell - 10
      setTimeout(function () {
        actionBar.innerText = `Its no use! Fire is only making it stronger! ${
          enemy.name
        } gained ${player.firespell - 10} hp`
      }, 1250)
      player.mp -= 25
      enemyTurn(enemy)
    }
  } else {
    actionBar.innerText = 'Not enough MP!'
    enemyTurn(enemy)
  }
  setTimeout(checkForWin, 2000)
  setTimeout(checkForWin, 6000)
}
const waterAttack = (player, enemy) => {
  clearActionBar(actionBar)

  if (player.mp > 25) {
    actionBar.innerText = `${player.name} shot a torrent of water!`

    if (enemy.weaknesses.includes('water')) {
      enemy.hp -= player.waterSpell * 1.5

      setTimeout(function () {
        enemyDiv.style.animationName = 'blink'
        actionBar.innerText = `OOOF! ${enemy.name} took ${
          player.waterSpell * 1.5
        } points of damage!`
      }, 1250)

      player.mp -= 25
      enemyTurn(enemy)
    } else if (enemy.resistances.includes('water')) {
      enemy.hp += player.waterSpell - 10
      setTimeout(function () {
        actionBar.innerText = `Its no use! Water is only making it stronger!`
      }, 1250)
      player.mp -= 25
      enemyTurn(enemy)
    }
  } else {
    actionBar.innerText = 'Not enough MP!'
    enemyTurn(enemy)
  }
  setTimeout(checkForWin, 2000)
  setTimeout(checkForWin, 6000)
}
const airAttack = (player, enemy) => {
  clearActionBar(actionBar)

  if (player.mp > 25) {
    actionBar.innerText = `${player.name} summoned a huge gust of wind!`

    if (enemy.weaknesses.includes('air')) {
      enemy.hp -= player.airSpell * 1.5

      setTimeout(function () {
        enemyDiv.style.animationName = 'blink'
        actionBar.innerText = `OOOF! ${enemy.name} took ${
          player.airSpell * 1.5
        } points of damage!`
      }, 1250)

      player.mp -= 25
      enemyTurn(enemy)
    } else if (enemy.resistances.includes('air')) {
      enemy.hp += player.airSpell - 10
      setTimeout(function () {
        actionBar.innerText = `Its no use! Wind is only making it stronger!`
      }, 1250)
      player.mp -= 25
      enemyTurn(enemy)
    }
  } else {
    actionBar.innerText = 'Not enough MP!'
    enemyTurn(enemy)
  }
  setTimeout(checkForWin, 2000)
  setTimeout(checkForWin, 6000)
}
const earthAttack = (player, enemy) => {
  clearActionBar(actionBar)

  if (player.mp > 25) {
    actionBar.innerText = `${player.name} caused a massive earthquake!`

    if (enemy.weaknesses.includes('earth')) {
      enemy.hp -= player.earthSpell * 1.5

      setTimeout(function () {
        enemyDiv.style.animationName = 'blink'
        actionBar.innerText = `OOOF! ${enemy.name} took ${
          player.earthSpell * 1.5
        } points of damage!`
      }, 1250)

      player.mp -= 25
      enemyTurn(enemy)
    } else if (enemy.resistances.includes('earth')) {
      enemy.hp += player.earthSpell - 10
      setTimeout(function () {
        actionBar.innerText = `Its no use! The earthquake is only making it stronger!`
      }, 1250)
      player.mp -= 25
      enemyTurn(enemy)
    }
  } else {
    actionBar.innerText = 'Not enough MP!'
    enemyTurn(enemy)
  }
  setTimeout(checkForWin, 2000)
  setTimeout(checkForWin, 6000)
}
const enemyTurn = (enemy) => {
  enemy.damage = randomRange(14, 28)
  let hitRating = hitRate()

  enemyAttackDeclarationTO = setTimeout(function () {
    enemyDiv.style.animationName = 'still'
    actionBar.innerText = `${enemy.name} came out swinging!`
  }, 3000)

  firstEnemyAttackTO = setTimeout(function () {
    if (player.guarding === false) {
      if (hitRating <= 1) {
        actionBar.innerText = `Phew!!${enemy.name} whiffed the attack!`
        reappendTO = setTimeout(appendActionBar, 1500)
      } else if (hitRating === 10) {
        player.hp -= enemy.damage * 1.5
        actionBar.style.animationName = 'shake'
        actionBar.innerText = `OOOF! That hit hard! Took ${
          enemy.damage * 1.5
        } points of damage!`
        reappendTO = setTimeout(appendActionBar, 1500)
      } else {
        player.hp -= enemy.damage
        actionBar.style.animationName = 'shake'
        actionBar.innerText = `${player.name} took ${enemy.damage} points of damage!`
        reappendTO = setTimeout(appendActionBar, 1500)
      }
    } else {
      actionBar.innerText = `${enemy.name}'s attack bounced right off ${player.name}!`
      player.guarding = false
      reappendTO = setTimeout(appendActionBar, 1500)
    }
  }, 5000)
}
const checkForWin = () => {
  if (player.hp <= 0) {
    clearTimeout(reappendTO)
    youLose()
  } else if (enemy.hp <= 0) {
    clearTimeout(firstEnemyAttackTO)
    clearTimeout(enemyAttackDeclarationTO)
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
  name: 'Player',
  hp: 100,
  mp: 100,
  damage: '',
  fireSpell: 20,
  waterSpell: 20,
  airSpell: 20,
  earthSpell: 20,
  guarding: false,
  playerItems: [],
  fireAttack(player, enemy) {
    if (player.mp > 25) {
      console.log(`${player.name} starts conjuring a fire spell!`)
      if (enemy.weaknesses.includes('fire')) {
        enemy.hp -= player.fireSpell * 1.5
        console.log(`Its highly effective!`)
        console.log(
          `${enemy.name} took ${player.fireSpell * 1.5} points of damage!`
        )
        player.mp -= 25
        enemyTurn(enemy)
      } else if (enemy.resistances.includes('fire')) {
        enemy.hp += player.fireSpell
        console.log(`Ah! Its no use! Fire is only making it stronger!`)
        player.mp -= 25
        enemyTurn(enemy)
      }
    } else {
      console.log('Not enough MP!')
      enemyTurn(enemy)
    }
  },
  thunderAttack(enemy) {
    if (player.mp > 25) {
      console.log(`${player.name} starts conjuring a thunder spell!`)
      if (enemy.weaknesses.includes('thunder')) {
        enemy.hp -= player.thunderSpell * 1.5
        console.log(`Its highly effective!`)
        console.log(
          `${enemy.name} took ${player.thunderSpell * 1.5} points of damage!`
        )
        player.mp -= 25
        enemyTurn(enemy)
      } else if (enemy.resistances.includes('thunder')) {
        enemy.hp += player.thunderSpell - 5
        console.log(`Ah! Its no use! Thunder is only making it stronger!`)
        player.mp -= 25
        enemyTurn(enemy)
      }
    } else {
      console.log('Not enough MP!')
      enemyTurn(enemy)
    }
  }
}

const enemy = {
  name: 'Annoying Bug',
  hp: 200,
  mp: 100,
  damage: '',
  weaknesses: ['fire', 'earth'],
  resistances: ['water', 'air'],
  enemyPhrases: []
}

// Event Listeners

attackBtn.addEventListener('click', () => {
  attack(player, enemy)
})
guardBtn.addEventListener('click', () => {
  guard(player, enemy)
})
itemBtn.addEventListener('click', () => {
  appendItemBar()
})
magicBtn.addEventListener('click', () => {
  appendMagicBar()
})
fireBtn.addEventListener('click', () => {
  fireAttack(player, enemy)
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
