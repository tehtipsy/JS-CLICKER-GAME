var score = 0;
var basePoint = 1;

var upgradeCost = 5;
let upgrades = 0;
document.getElementById("upgradecost").innerHTML = upgradeCost;
document.getElementById("upgrades").innerHTML = upgrades;


function upgradeScoring() {
    if (score >= upgradeCost) {
        score = score - upgradeCost;
        upgrades = upgrades + 1;
        upgradeCost = Math.round(upgradeCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("upgradecost").innerHTML = upgradeCost;
        document.getElementById("upgrades").innerHTML = upgrades;
    }
}

function scorePoints(amountOfPoints) {
    if (upgrades >= 1) {
        amountOfPoints = amountOfPoints + upgrades;
    }
    score = score + amountOfPoints;
    document.getElementById("score").innerHTML = score;
}

setInterval(function() {
    score = score + upgrades;
    document.getElementById("score").innerHTML = score;
}, 1000);