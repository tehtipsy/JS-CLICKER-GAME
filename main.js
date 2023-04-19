// // upgarde types:
// // 1. Lumberjack
// // BASE COST + 10% * NUMBER OF WORKERS
// // 1.1 Jacksaw
// // 1.2 Power Saw
// // 1.3 heavy logging machine
// // 2. Coal Mine
// // 2.1 More Miners
// // 3. Power Plants
// // 3.1 More Power

// // pollution system:
// // pnealty for power plants and coal mine,
// // "polluting upgrades", that subtarctes from the "ozone layer".

var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    totalPollution: 0,
    clickValue: 1000, // seperate totalIncome from clickValue

    addToScore: function(amount) {
        this.score += amount;
        this.totalScore += amount;
        display.updateScore();
    },

    getScorePerSecond: function() {
        var scorePerSecond = 0;
        for (i = 0; i < upgrades.name.length; i++) {
            scorePerSecond += upgrades.income[i] * upgrades.count[i];
        }
        return scorePerSecond
    },

    getPollutionPerSecond: function() {
        var pollutionPerSecond = 0;
        for (i = 0; i < upgrades.name.length; i++) {
            pollutionPerSecond += upgrades.pollutionOut[i] * upgrades.count[i];
        }
       return pollutionPerSecond
    },
};

var upgrades = {
    name: ["Lumberjack", "Coal Mine", "Power Plant"],
    baseCost: [2500, 10000, 200000], // fix demo costs
    income: [1000, 50000, 1000000],
    pollutionOut: [0, 1, 100],
    count: [0, 0, 0],
    cost: [0, 0, 0], // calculate using baseCost * count(!=0) * 1.1
    maxPossible: [100000, 10000, 1000],
    // image: [],

    upgradeCost: function() {
        for (i = 0; i < this.name.length; i++) {
            this.cost[i] = this.baseCost[i];
        }
    },

    purchseUpgrade: function(index) {
        if (game.score >= this.cost[index]) {
            game.score -= Math.ceil(this.cost[index]);
            this.count[index]++;
            this.cost[index] = this.baseCost[index] * 1.1 * this.count[index]; // check your brain
            // this.cost[index] = this.cost[index] * 1.1 * this.count[index]; // better diff curve?
            display.updateScore();
        }
    }
};

var subUpgrades = {
    name: ["Jacksaw", "Power Saw", "heavy logging machine",	"More Miners",	"More Power"],
    parentUpgradeIndex: [0, 0, 0, 1, 2],
    level: [1, 2, 3, 1, 1],
    count:[0, 0, 0, 0, 0],
    cost: [0, 0, 0, 0, 0], // calc 10% of parent cost
    bonusToIncome: [1.1, 1.1, 1.1, 1.1, 1.1],
    bonusToPollution: [1.1, 1.1, 1.1, 1.1, 1.1],

    subUpgradeCost: function() {
        for(i = 0; i < subUpgrades.name.length; i++) {
            this.cost[i] = 0.1 * upgrades.baseCost[this.parentUpgradeIndex[i]] * this.level[i];
        }
    },

    purchseSubUpgrade: function(index) {
        if (game.score >= this.cost[index] && upgrades.count[this.parentUpgradeIndex[index]] > this.count[index]) {
            game.score -= Math.ceil(this.cost[index]);

        }
    }
};

var display = {
    updateScore: function() {
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("upgrades").innerHTML = game.getScorePerSecond();
        document.getElementById("pollution").innerHTML = game.totalPollution;
        document.getElementById("lumberjack").innerHTML = Math.ceil(upgrades.cost[0]);
        document.getElementById("jacksaws").innerHTML = Math.ceil(subUpgrades.cost[0]);
        document.getElementById("powersaws").innerHTML = Math.ceil(subUpgrades.cost[1]);
        document.getElementById("heavylogger").innerHTML = Math.ceil(subUpgrades.cost[2]);
        document.getElementById("coalmine").innerHTML = Math.ceil(upgrades.cost[1]);
        document.getElementById("powerplant").innerHTML = Math.ceil(upgrades.cost[2]);
        document.getElementById("lumberjackcount").innerHTML = upgrades.count[0];
        document.getElementById("coalminecount").innerHTML = upgrades.count[1];
        document.getElementById("powerplantcount").innerHTML = upgrades.count[2];
    }
};

setInterval(function() {
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    game.totalPollution += game.getPollutionPerSecond();
    display.updateScore();
}, 1000);

window.onload = function() {
    upgrades.upgradeCost();
    subUpgrades.subUpgradeCost();
    display.updateScore();
};