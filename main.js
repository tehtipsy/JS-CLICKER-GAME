var score = 0;
var basePoint = 1000;

var upgradeCost = 2500;
let upgrades = 0;

document.getElementById("upgradecost").innerHTML = upgradeCost;
document.getElementById("upgrades").innerHTML = upgrades;

var maxLumberjacks = 100000;
let maxScore = 3000000000000; // MAX NUMBER OF TREES TO CUT 

var pollution = 0;
let maxPollution = 1000000000000; // POLLUTION ENDGAME

var coal = 0;
let maxCoal = 1000000000000; // POLLUTION ENDGAME

function upgradeScoring() {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        upgrades = upgrades + basePoint; // add scoring multiplyers HERE
        upgradeCost = Math.round(upgradeCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("upgradecost").innerHTML = upgradeCost;
        document.getElementById("upgrades").innerHTML = upgrades;
    }
}

// upgarde types:
// 1. Lumberjack
// BASE COST + 10% * NUMBER OF WORKERS
// 1.1 Jacksaw
// 1.2 Power Saw
// 1.3 heavy logging machine
// 2. Coal Mine
// 2.1 More Miners
// 3. Power Plants
// 3.1 More Power

// pollution system:
// pnealty for power plants and coal mine,
// "polluting upgrades", that subtarcte from the "ozone layer".

function scorePoints(amountOfPoints) {
    if (upgrades >= 1) {
        amountOfPoints += upgrades;
    }
    score += amountOfPoints;
    document.getElementById("score").innerHTML = score;
}

setInterval(function() {
    score += upgrades;
    document.getElementById("score").innerHTML = score;
}, 1000);