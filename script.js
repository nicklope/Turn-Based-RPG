// Global Variables

// Functions

const enemyTurn = () => {
  console.log(`${firstEnemy.enemyName} came out swinging!`)
  player.playerHp -= firstEnemy.enemyAttacks
  console.log(
    `${player.playerName} took ${firstEnemy.enemyAttacks} points of damage!`
  )
}

// Obects + constructors

const player = {
  playerName: 'name',
  playerHp: 100,
  playerMp: 100,
  playerAttacks: 10,
  playerItems: [],
  guard() {
    console.log('En guarde!')
  },
  attack(enemy) {
    console.log(`${this.playerName} goes for the attack!`)
    enemy.enemyHp -= this.playerAttacks
    console.log(
      `${enemy.enemyName} took ${this.playerAttacks} points of damage!`
    )
    enemyTurn()
  }
}

const firstEnemy = {
  enemyName: 'first enemy',
  enemyHp: 100,
  enemyMp: 100,
  enemyAttacks: 10,
  enemyPhrases: [],
  attack() {
    console.log('Take this!')
  }
}

// Event Listeners

console.log(player.attack(firstEnemy))
