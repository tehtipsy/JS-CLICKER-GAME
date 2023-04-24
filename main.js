// // KARDASHEV SCALE CLICKER GAME // //

// // try to make profit without destroing the earth with pollution.
// // too much pollution makes the planet inhospitable to the population.
// // the goal of the game is to get to the space fairing age.

// // Pollution System:
// // pnealty for power plants and coal mines,
// // "polluting upgrades", that subtarctes from the "ozone layer".

// // Resources System:
// // Resources are gathered to unlock technolegies and items (Upgrades). 
// // some resources can be used to create diffrent resources.
// // They can also be combined with other resources and technologies
// // to unlock new resources and technologies.

// // Fuel System:
// // fuels are used in power plants to create stored energy and income.

// // Energy System:
// // HUMAN LABOR + UPKEEP + FUEL = PROGRESS
// // ???
// // PROFIT

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => { // create a custom event in purchse and click
    game.totalClicks++;
    display.updateScore();
  });
});

var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    totalPollution: 0,
    clickValue: 1000, // seperate IncomePerClick from clickValue //
    totalFossilFuel: 0, // seperate to resources //

    addToScore: function(amount) { // change to count clicks and then calc profit, add check for each button //
        this.score += amount;
        this.totalScore += amount;
        // gameResource.count[0]++; // add to wood counter
        // this.totalFossilFuel++; // add to fossil fuel counter
        display.updateScore();
    },

    getScorePerSecond: function() {
        var scorePerSecond = 0;
        for (i = 0; i < upgrades.name.length; i++) {
            scorePerSecond += upgrades.income[i] * upgrades.count[i];
        };
        for (i = 0; i < subUpgrades.name.length; i++) {
            scorePerSecond += 0.01
                * upgrades.income[subUpgrades.parentUpgradeIndex[i]] 
                * subUpgrades.bonusToIncome[i] 
                * subUpgrades.count[i] 
                * subUpgrades.level[i];
        }
        return scorePerSecond
    },

    getPollutionPerSecond: function() {
        var pollutionPerSecond = 0;
        for (i = 0; i < upgrades.name.length; i++) {
            pollutionPerSecond += upgrades.pollutionOut[i] * upgrades.count[i];
        }        
        for (i = 0; i < subUpgrades.name.length; i++) {
            pollutionPerSecond += 0.01 *
            upgrades.pollutionOut[subUpgrades.parentUpgradeIndex[i]] 
            * subUpgrades.count[i] 
            * subUpgrades.level[i]
            * subUpgrades.bonusToPollution[i];
        }
       return pollutionPerSecond
    },    
    
    getFossilFuelsPerSecond: function() { // add check for resource type
        var fossilFuelsPerSecond = 0;
        for (i = 0; i < upgrades.name.length; i++) {
            if (upgrades.outputType[i] == "Wood" 
            || upgrades.outputType[i] == "Coal") { // fix this shit //
                fossilFuelsPerSecond += upgrades.resourceOutput[i] 
                * upgrades.count[i];
            }
        }        
        for (i = 0; i < subUpgrades.name.length; i++) {
            if (upgrades.outputType[subUpgrades.parentUpgradeIndex[i]] == "Wood" 
            || upgrades.outputType[subUpgrades.parentUpgradeIndex[i]] == "Coal") { // fix this shit //
            fossilFuelsPerSecond += 0.1 *
            upgrades.resourceOutput[subUpgrades.parentUpgradeIndex[i]] 
            * subUpgrades.count[i] 
            * subUpgrades.level[i]
            }
        } return fossilFuelsPerSecond
    },

    getUpkeepCostPerSecond: function() {
        // count for each resource. 
        // add resource.count[i] >= upkeepcost in getScorePerSecond() ???
        var upkeepCost = 0
        for (let i = 0; i < upgrades.name.length; i++) {
            upkeepCost += 0.1
            * upgrades.resourceOutput[i] 
            * upgrades.count[i]
        }
        for (let i = 0; i < subUpgrades.name.length; i++) {
            upkeepCost += 0.1 
            * upgrades.resourceOutput[subUpgrades.parentUpgradeIndex[i]] 
            * subUpgrades.count[i]
            * subUpgrades.bonusToIncome[i]
            * subUpgrades.level[i]
        } return upkeepCost
    },
};

var gameResource = {
    name: ["Wood", "Coal", "Energy", "Population", "Food"], // Trees, Coal, Natural Gas, Energy, Water, ... Money??// 
    resourceType: ["Fossil Fuel", "Fossil Fuel", "Stored Energy", "People", "Food"], // Fossil Fuel, Stored Energy, Clean Fuel, ..., ... //
    mesureUnit: ["Tons", "Tons", "KVAs", "People", "Tons"], // $$$, Tons, KVA, ..., ... //
    count: [0, 0, 0, 0, 0],

    countResource: function(index) { // use the resource index I guess
        var ResourcePerSecond = 0;
        for (i = 0; i < upgrades.name.length; i++) {
            if (this.name[index] == upgrades.outputType[i]) {
                ResourcePerSecond += upgrades.resourceOutput[i] 
                * upgrades.count[i] 
            } 
        }
        for (i = 0; i < subUpgrades.name.length; i++) {
            if (this.name[index] == upgrades.outputType[subUpgrades.parentUpgradeIndex[i]]) {
                ResourcePerSecond += 0.01 
                * upgrades.resourceOutput[subUpgrades.parentUpgradeIndex[i]] 
                * subUpgrades.count[i] 
                * subUpgrades.level[i]
            }
        } return ResourcePerSecond
    },

    countAllResources: function() {
        for (let i = 0; i < this.name.length; i++) {
            // run countResource() for each Resource and add to Resource count
            this.count[i] += this.countResource(i);
        }
    },
};

var upgrades = {
    name: ["Lumberjack", "Coal Mine", "Power Plant"], // Offshore Gas Rig, Hydroelectric Power Plant, Solar Power Plant //
    level: [ 1, 2, 3],
    baseCost: [2500, 10000, 200000], // fix demo costs
    income: [1000, 50000, 1000000],
    pollutionOut: [0, 1, 100],
    count: [0, 0, 0],
    cost: [0, 0, 0], // calculate using baseCost * count(!=0) * 1.1
    // maxPossible: [100000, 10000, 1000],
    resourceOutput: [10, 100, 1000],
    outputType: ["Wood", "Coal", "Energy"],  // ["Wood", "Coal", "Energy"],
    fuelType: ["Population", "Wood", "Coal"],
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
    name: ["Jacksaw", "Power Saw", "Heavy Logging Machine",	"More Miners",	"Even More Miners", "Mine Shafts", "More Power", "Even More Power", "Most Power"],
    parentUpgradeIndex: [0, 0, 0, 1, 1, 1, 2, 2, 2],
    level: [1, 2, 3, 1, 2, 3, 1, 2, 3],
    count:[0, 0, 0, 0, 0, 0, 0, 0, 0],
    cost: [0, 0, 0, 0, 0, 0, 0, 0, 0], // calc 10% of parent cost
    bonusToIncome: [1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1], // calc according to level
    bonusToPollution: [1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1], // calc according to level

    subUpgradeCost: function() {
        for(i = 0; i < subUpgrades.name.length; i++) {
            this.cost[i] = 0.1 
            * upgrades.baseCost[this.parentUpgradeIndex[i]] * this.level[i];
        }
    },

    getSubUpgradesInStock: function(index) { // subUpgrades with same prnt and higher lvl
        var subUpgradesInStock = 0;
        for (i = 0; i < subUpgrades.name.length; i++) {
            if (this.parentUpgradeIndex[i] === this.parentUpgradeIndex[index]
                && this.level[i] > this.level[index]) {
                subUpgradesInStock += this.count[i] 
            }
        } return subUpgradesInStock;
    },

    purchseSubUpgrade: function(index) {
        if (game.score >= this.cost[index]
            && upgrades.count[this.parentUpgradeIndex[index]] > this.count[index]) {
            // check if higher level upgrades are "in stock" //
            subUpgradesInStock = this.getSubUpgradesInStock(index);
            if (subUpgradesInStock === 0) {

                // subtract cost of subUpgrade //
                game.score -= Math.ceil(this.cost[index]); 
                this.count[index]++;

                // subtract count of other subUpgrades with the same parentUpgrade and lower level from stock //
                for (i = 0; i < subUpgrades.name.length; i++) {
                    if (this.parentUpgradeIndex[i] === this.parentUpgradeIndex[index]
                        && this.level[i] < this.level[index] 
                        && this.count[i] > 0) {
                        this.count[i]--;
                    }
                };

            // change subUpgrade cost for next purches //
            // this.cost[index] = this.baseCost[index] * 1.1 * this.count[index]; // check your brain
            
            display.updateScore();
            }
        }
    }
};

var display = {
    updateScore: function() {
        // bonuses per sec //
        document.getElementById("scorepersec").innerHTML = game.getScorePerSecond();
        document.getElementById("upkeeppersec").innerHTML = game.getUpkeepCostPerSecond();
        document.getElementById("woodupkeeppersec").innerHTML = game.getUpkeepCostPerSecond();
        document.getElementById("pollutionpersec").innerHTML = game.getPollutionPerSecond();
        document.getElementById("fossilfuelpersec").innerHTML = game.getFossilFuelsPerSecond();        
        // game counters //
        document.getElementById("totalclicks").innerHTML = game.totalClicks; // count clicks on base and upgrade buttons
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("pollution").innerHTML = Math.ceil(game.totalPollution);
        document.getElementById("totalfossilfuel").innerHTML = Math.ceil(game.totalFossilFuel);
        // resource count //
        document.getElementById("totaltrees").innerHTML = Math.ceil(gameResource.count[0]);
        document.getElementById("totalcoal").innerHTML = Math.ceil(gameResource.count[1]);
        document.getElementById("totalenergy").innerHTML = Math.ceil(gameResource.count[2]);
        document.getElementById("population").innerHTML = Math.ceil(gameResource.count[3]);
        document.getElementById("woodpersec").innerHTML = Math.ceil(gameResource.countResource(0));
        document.getElementById("coalpersec").innerHTML = Math.ceil(gameResource.countResource(1));
        document.getElementById("energypersec").innerHTML = Math.ceil(gameResource.countResource(2));
        // upgrade cost //
        document.getElementById("lumberjack").innerHTML = Math.ceil(upgrades.cost[0]);
        document.getElementById("coalmine").innerHTML = Math.ceil(upgrades.cost[1]);
        document.getElementById("powerplant").innerHTML = Math.ceil(upgrades.cost[2]);
        // subUpgrade cost //
        document.getElementById("jacksaws").innerHTML = Math.ceil(subUpgrades.cost[0]);
        document.getElementById("powersaws").innerHTML = Math.ceil(subUpgrades.cost[1]);
        document.getElementById("heavylogger").innerHTML = Math.ceil(subUpgrades.cost[2]);
        document.getElementById("moreminers").innerHTML = Math.ceil(subUpgrades.cost[3]);
        document.getElementById("evenmoreminers").innerHTML = Math.ceil(subUpgrades.cost[4]);
        document.getElementById("mineshafts").innerHTML = Math.ceil(subUpgrades.cost[5]);
        document.getElementById("morepower").innerHTML = Math.ceil(subUpgrades.cost[6]);
        document.getElementById("evenmorepower").innerHTML = Math.ceil(subUpgrades.cost[7]);
        document.getElementById("mostpower").innerHTML = Math.ceil(subUpgrades.cost[8]);
        // upgrade count //
        document.getElementById("lumberjackcount").innerHTML = upgrades.count[0];
        document.getElementById("coalminecount").innerHTML = upgrades.count[1];
        document.getElementById("powerplantcount").innerHTML = upgrades.count[2];
        // subUpgrade count //
        document.getElementById("jacksawscount").innerHTML = subUpgrades.count[0];
        document.getElementById("powersawscount").innerHTML = subUpgrades.count[1];
        document.getElementById("heavymachinescount").innerHTML = subUpgrades.count[2];
        document.getElementById("moreminerscount").innerHTML = subUpgrades.count[3];
        document.getElementById("evenmoreminerscount").innerHTML = subUpgrades.count[4];
        document.getElementById("mineshaftscount").innerHTML = subUpgrades.count[5];
        document.getElementById("morepowercount").innerHTML = subUpgrades.count[6];
        document.getElementById("evenmorepowercount").innerHTML = subUpgrades.count[7];
        document.getElementById("mostpowercount").innerHTML = subUpgrades.count[8];
    }
};

setInterval(function() { // Income Cycle
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    game.totalPollution += game.getPollutionPerSecond();
    game.totalFossilFuel += game.getFossilFuelsPerSecond();
    // totalResourceCount //
    gameResource.countAllResources();
    // game.score -= game.getUpkeepCostPerSecond();
    // console.log(gameResource.count[1])
    display.updateScore();
}, 1000);

window.onload = function() {
    upgrades.upgradeCost();
    subUpgrades.subUpgradeCost();
    display.updateScore();
};