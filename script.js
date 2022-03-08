// Global Variables
const gameView = document.getElementById('game-view')
const actionBar = document.getElementById('action-bar')
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

actionBar.appendChild(attackBtn)
actionBar.appendChild(magicBtn)
actionBar.appendChild(guardBtn)
actionBar.appendChild(itemBtn)

// Functions
const clearActionBar = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
  actionBar.style.display = 'flex'
  actionBar.style.justifyContent = 'center'
  actionBar.style.alignItems = 'center'
}
const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}
const enemyTurn = (enemy) => {
  console.log(`${enemy.name} came out swinging!`)
  if (player.guarding === false) {
    player.hp -= enemy.damage
    console.log(`${player.name} took ${enemy.damage} points of damage!`)
  } else {
    console.log(`${enemy.name}'s attack bounced right off ${player.name}`)
    player.guarding = false
  }
}
const attack = (attacker, attacked) => {
  clearActionBar(actionBar)
  actionBar.innerText = `${attacker.name} goes for the attack!`
  attacked.hp -= attacker.damage
  console.log(`${attacked.name} took ${attacker.damage} points of damage!`)
  enemyTurn(attacked)
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
  guard() {
    console.log(`${player.playerName} braced for an attack!`)
    player.guarding = true
    enemyTurn()
  },
  useItem() {
    console.log(`${player.playerName} ate a delicious bagel...`)
    console.log(`${this.playerName} gained back 10 hp!`)
    this.playerHp += 10
    enemyTurn()
  },
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
  name: 'Slime',
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
