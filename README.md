# **Bug Destroyer! RPG**

## **About Development...**

_Bug Destroyer! RPG_ is a short game I developed as my unit 1 project for General Assembly's software engineering immersive. _Bug Destroyer! RPG_ is a turn based roleplaying game where the player assumes the role of an AI designed to eliminate bugs in a program. The game currently has one fight, but as of March 11th 2022, a second fight is in development. Here is the [trello board](https://trello.com/b/pb4QCtGq/turn-based-rpg) I used during development.

_Bug Destroyer! RPG_ is heavily inspired by (and an homage to) Nintendo's 1994 Super Nintendo release _EarthBound_ (_Mother 2_ in Japan). _EarthBound_ is an offbeat, quirky (and sometimes _dark_) RPG about a small town boy who stops an alien invasion with the help of psychic powers and his friends. _EarthBound_ was published by Nintendo and developed by HAL Laboratory and APE (which was led by the legendary japanese media personality, Shigesato Itoi).

Even though I was born in 1994, I was blessed enough to play _EarthBound_ on my hand-me-down SNES when I was around 10 years old (_probably the target age group_). _EarthBound's_ humor and gameplay changed the way I viewed video games. I began to look at games as an art form rather than just mindless entertainment. I also really, _really_ wanted to make something like it. _Bug Destroyer! RPG_ has finally allowed me to do just that.

## **About the Game...**

The game begins with an HTML landing page that offers a bit of exposition and takes in the players name. From there, the player is thrown right into the first fight. The player and enemy are dictated by javascript objects. The game ends when the player or enemy have their hp reach 0. The player is given 4 options (and a secret 5th option) to interact with the enemy.

### **attack**

The attack button starts a round of battle. The player will do damage to the bug that is between a range of 2 numbers. It is possible for the player to miss, or get a critical hit which does 1.5x damage. Both miss and crit are dictated by a random 'hit rating' number.

### **magic**

The magic button opens up another menu with 5 options. 4 of these options are spells (fire, water, air, earth) and the 5th option in the middle is a go back button that returns the player to the original action bar. Clicking a spell costs mp as indicated (total mp and hp located in the player display). Spells work in reliance with the enemies weaknesses and resistances. If an enemy is weak to a spell, you'll do big damage. If an enemy is resistant to a spell, it will heal the enemy by 10 hp. Spells cannot crit or miss. After a spell is used, it becomes the enemies turn.

### **guard**

Guard allows the player to not take any damage from the enemies next attack.

### **items**

The items button opens up another menu with 3 options. Pizza Bagels, go back, and Nice'd Coffee. Bagels restore 50 hp. Coffee restores 30 mp. Using items costs a turn and it will become the enemies turn after an item is used. Remaining item inventory is displayed after an item is used.

### **inspect**

The 5th action options, which some may consider _secret_ is available when the enemy image is clicked on from the main action bar menu. This will turn the option bar into 2 buttons: inspect (10 mp) and go back to the main action bar. Inspecting the enemy gives some flare text, the enemies max hp as well as some of its weaknesses and resistances. Inspecting does not cost a turn.

## **CREDITS**

I wish I could say I created the moving CSS background, but I did not. I found it through a quick google search. The background was created by Ryan Mulligan, go give his [codepen](https://codepen.io/hexagoncircle) some love.

All the sounds came from an _EarthBound_ fansite, [Starmen.net](http://starmen.net/index.php). Nintendo (probably?) owns those sounds (and keeps a tight grip on their use).

The music is from Kanye instrumentals I got off youtube.

The clay bug images are from [Fat Brain Toys](https://www.fatbraintoys.com/toy_companies/fat_brain_toy_co/hey_clay_bugs.cfm).

### **THIS GAME IS NOT INTENDED FOR PROFESSIONAL RELEASE. THIS GAME SERVED AS A SOFTWARE ENGINEERING LEARNING TOOL. I AM NOT RECEIVING ANY FINANCIAL COMPENSATION FOR THIS GAME**

At this time I have no socials to share... Thanks for playing!!!
