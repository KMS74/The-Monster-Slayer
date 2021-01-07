new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      let damage = this.calculateDmage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`,
      });

      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },

    calculateDmage(minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm("You Win! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You Lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else {
        return false;
      }
    },
    monsterAttack() {
      let damage = this.calculateDmage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`,
      });
      this.checkWin();
    },
    specialAttack() {
      // more damage to monster
      let damage = this.calculateDmage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster hard for ${damage}`,
      });

      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    heal() {
      if (this.playerHealth != 100) {
        if (this.playerHealth <= 85) {
          this.playerHealth += 10;
        } else {
          this.playerHealth = 100;
        }
        this.turns.unshift({
          isPlayer: true,
          text: `Player heals for 10`,
        });
        this.monsterAttack();
      }
    },
    giveUp() {
      this.gameIsRunning = false;
    },
  },
});
