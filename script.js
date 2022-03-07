// Global Variables

// Functions

const enemyTurn = () => {
  console.log(`${firstEnemy.enemyName} came out swinging!`)
  if (player.guarding === false) {
    player.playerHp -= firstEnemy.enemyAttacks
    console.log(
      `${player.playerName} took ${firstEnemy.enemyAttacks} points of damage!`
    )
  } else {
    console.log(
      `${firstEnemy.enemyName}'s attack bounced right off ${player.playerName}`
    )
  }
}

// Obects + constructors

const player = {
  playerName: 'Player',
  playerHp: 100,
  playerMp: 100,
  playerAttacks: 10,
  fireSpell: 10,
  guarding: false,
  playerItems: [],
  guard() {
    console.log(`${player.playerName} braced for an attack!`)
    player.guarding = true
    enemyTurn()
  },
  attack(enemy) {
    console.log(`${this.playerName} goes for the attack!`)
    enemy.enemyHp -= this.playerAttacks
    console.log(
      `${enemy.enemyName} took ${this.playerAttacks} points of damage!`
    )
    enemyTurn()
  },
  fireAttack(enemy) {
    console.log(`${this.playerName} starts conjuring a fire spell!`)
    if (firstEnemy.enemyWeaknesses.includes('fire')) {
      firstEnemy.enemyHp -= player.fireSpell * 1.5
      console.log(`Its highly effective!`)
      console.log(
        `${firstEnemy.enemyName} took ${
          player.fireSpell * 1.5
        } points of damage!`
      )
      enemyTurn()
    } else if (firstEnemy.enemyResistances.includes('fire')) {
      firstEnemy.enemyHp += player.fireSpell
      console.log(`Ah! Its no use! Fire is only making it stronger!`)
      enemyTurn()
    }
  }
}

const firstEnemy = {
  enemyName: 'Slime',
  enemyHp: 100,
  enemyMp: 100,
  enemyAttacks: 10,
  enemyWeaknesses: [''],
  enemyResistances: ['fire'],
  enemyPhrases: [],
  attack() {
    console.log('Take this!')
  }
}

// Event Listeners

console.log(player.guard())
