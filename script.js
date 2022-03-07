// Global Variables

// Functions

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
  console.log(`${attacker.name} goes for the attack!`)
  attacked.hp -= attacker.damage
  console.log(`${attacked.name} took ${attacker.damage} points of damage!`)
  enemyTurn(slime)
}
// Obects + constructors

const player = {
  name: 'Player',
  hp: 100,
  mp: 100,
  damage: 10,
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
      if (enemy.enemyWeaknesses.includes('fire')) {
        enemy.hp -= player.fireSpell * 1.5
        console.log(`Its highly effective!`)
        console.log(
          `${enemy.name} took ${player.fireSpell * 1.5} points of damage!`
        )
        player.mp -= 25
        enemyTurn(enemy)
      } else if (enemy.enemyResistances.includes('fire')) {
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
      if (enemy.enemyWeaknesses.includes('thunder')) {
        enemy.hp -= player.thunderSpell * 1.5
        console.log(`Its highly effective!`)
        console.log(
          `${enemy.name} took ${player.thunderSpell * 1.5} points of damage!`
        )
        player.mp -= 25
        enemyTurn(enemy)
      } else if (enemy.enemyResistances.includes('thunder')) {
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
  damage: 10,
  enemyWeaknesses: ['fire'],
  enemyResistances: ['thunder'],
  enemyPhrases: []
}

// Event Listeners

console.log(attack(player, slime))
console.log(player.fireAttack(slime))
console.log(player.thunderAttack(slime))
