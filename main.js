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
// // "polluting upgrades", that subtarcte from the "ozone layer".

var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    totalPollution: 0,
    clickValue: 1000,

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
        for (i = 0; i < upgrades.name.length; i++){
            pollutionPerSecond += upgrades.pollutionOut[i] * upgrades.count[i];
        }
       return pollutionPerSecond
    },
};

var upgrades = {
    name:["Lumberjack", "Coal Mine", "Power Plant"],
    baseCost:[2500, 1000000, 20000000],
    income:[1000, 50000, 1000000],
    pollutionOut:[0, 1, 100],
    count:[0, 0, 0],
    // image:[],
    maxPossible:[100000, 10000, 1000],

    purchseUpgrade: function(index) {
        if (game.score >= this.baseCost[index] *1.1*this.count[index]) { // fix this shit
            game.score -= Math.ceil(this.baseCost[index] *1.1*this.count[index]);
            this.count[index]++;
            display.updateScore();
        }
    }
};

var display = {
    updateScore: function() {
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("upgrades").innerHTML = game.getScorePerSecond();
        document.getElementById("pollution").innerHTML = game.totalPollution;
        document.getElementById("baseCost[0]").innerHTML = Math.ceil(upgrades.baseCost[0] * 1.1 * upgrades.count[0]); // fix this shit
        document.getElementById("baseCost[1]").innerHTML = Math.ceil(upgrades.baseCost[1] * 1.1 * upgrades.count[1]); // fix this shit
    }
};

window.onload = function() {
    display.updateScore();
};

setInterval(function() {
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    game.totalPollution += game.getPollutionPerSecond();
    display.updateScore();
}, 1000);

// OLD VERSION
// var score = 0;
// var basePoint = 1000;

// var upgradeCost = 2500;
// let upgrades = 0;

// document.getElementById("upgradecost").innerHTML = upgradeCost;
// document.getElementById("upgrades").innerHTML = upgrades;

// var maxLumberjacks = 100000;
// let maxScore = 3000000000000; // MAX NUMBER OF TREES TO CUT 

// var pollution = 0;
// let maxPollution = 1000000000000; // POLLUTION ENDGAME

// var coal = 0;
// let maxCoal = 1000000000000; // COAL ENDGAME

// function upgradeScoring() {
//     if (score >= upgradeCost) {
//         score -= upgradeCost;
//         upgrades = upgrades + basePoint; // add scoring multiplyers HERE
//         upgradeCost = Math.round(upgradeCost * 1.15);

//         document.getElementById("score").innerHTML = score;
//         document.getElementById("upgradecost").innerHTML = upgradeCost;
//         document.getElementById("upgrades").innerHTML = upgrades;
//     }
// }

// function scorePoints(amountOfPoints) {
//     if (upgrades >= 1) {
//         amountOfPoints += upgrades;
//     }
//     score += amountOfPoints;
//     document.getElementById("score").innerHTML = score;
// }

// setInterval(function() {
//     score += upgrades;
//     document.getElementById("score").innerHTML = score;
// }, 1000);