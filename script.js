// Global Variables
const gameView = document.getElementById('game-view')
const actionBar = document.getElementById('action-bar')
const attackBtn = document.createElement('div')
const enemyDiv = document.getElementById('enemy-div')

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
  actionBar.innerText = ''
  actionBar.style.display = 'grid'
  actionBar.style.justifyContent = ''
  actionBar.style.alignItems = ''
  actionBar.appendChild(attackBtn)
  actionBar.appendChild(magicBtn)
  actionBar.appendChild(guardBtn)
  actionBar.appendChild(itemBtn)
}
const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const attack = (attacker, attacked) => {
  clearActionBar(actionBar)
  actionBar.innerText = `${attacker.name} goes for the attack!`
  attacked.hp -= attacker.damage
  setTimeout(function () {
    enemyDiv.style.animationName = 'blink'
    actionBar.innerText = `${attacked.name} took ${attacker.damage} points of damage!`
  }, 1250)
  enemyTurn(attacked)
}
const guard = (attacker, attacked) => {
  clearActionBar(actionBar)
  actionBar.innerText = `${attacker.name} braced for an attack!`
  attacker.guarding = true
  enemyTurn(attacked)
}
const useItem = (attacker, attacked) => {
  clearActionBar(actionBar)
  actionBar.innerText = `${attacker.name} ate a delicious bagel...`
  attacker.hp += 10
  setTimeout(function () {
    actionBar.innerText = `${attacker.name} gained back 10 hp!`
  }, 1750)

  enemyTurn(attacked)
}
const enemyTurn = (enemy) => {
  setTimeout(function () {
    enemyDiv.style.animationName = ''
    actionBar.innerText = `${enemy.name} came out swinging!`
  }, 3000)
  setTimeout(function () {
    if (player.guarding === false) {
      player.hp -= enemy.damage
      actionBar.innerText = `${player.name} took ${enemy.damage} points of damage!`
      // setTimeout(appendActionBar(), 6500)
    } else {
      actionBar.innerText = `${enemy.name}'s attack bounced right off ${player.name}!`
      player.guarding = false
      // setTimeout(appendActionBar(), 6500)
    }
  }, 5000)
}
// Obects + constructors

const player = {
  name: 'Player',
  hp: 100,
  mp: 100,
  damage: randomRange(7, 14),
  fireSpell: 10,
  thunderSpell: 10,
  guarding: false,
  playerItems: [],
  fireAttack(enemy) {
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

const slime = {
  name: 'Annoying Bug',
  hp: 100,
  mp: 100,
  damage: randomRange(7, 10),
  weaknesses: ['fire'],
  resistances: ['thunder'],
  enemyPhrases: []
}

// Event Listeners

attackBtn.addEventListener('click', () => {
  attack(player, slime)
})
guardBtn.addEventListener('click', () => {
  guard(player, slime)
})
itemBtn.addEventListener('click', () => {
  useItem(player, slime)
})
