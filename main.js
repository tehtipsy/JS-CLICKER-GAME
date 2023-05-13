import { config } from "./config.js";

class Game {
    constructor() {
        const initializeResources = () => {
            const resources = {};
            config.resources.forEach((resource) => {resources[resource] = 0;});
            return resources;
        };
        this.resources = initializeResources();
        this.producers = {};
        config.producers.forEach((producer) => {this.producers[producer.name] = 0;});
    };
    
    // auto produce by config
    AutoProduce() {
        config.autoProduction.forEach(resource => {
            this.resources[resource.currency] += resource.base;
        });
    };

    // update resources automagicly
    updateAutoProduction() { 
        this.AutoProduce();
    };

    // update producers using config index
    updateAllProducers() {
        Object.keys(this.producers).forEach(producer => {
            if (this.producers[producer] >= 1) {
                this.updateProducer(this.findProducerIndex(producer));
            };
        });
    };

    // check producer upkeep and then produce
    updateProducer(producer) {
        const success = this.consumeUpkeep(producer);
        this.produceResources(producer, success);        
    };
// 
    // get producer Index from config file
    findProducerIndex(producer) { 
        return config.producers.findIndex(p => p.name === producer);
    }; 

    // get name of producer using index
    getProducerName(producer) {
        return Object.keys(this.producers)[producer];
    };
// 
    // get total number of producers using name
    getTotalNumberOfProducers(producer) {
        return this.producers[this.getProducerName(producer)];
    };

    // check available resources
    producersUpkeepSucceded(producer) {
        const activeProducers = [];
        let numberSucceeded = 0;
        config.producers[producer].upkeepCosts.forEach(resource => {
            if (this.resources[resource.currency] >= resource.base) {
                activeProducers.push(Math.floor(this.resources[resource.currency] / resource.base));
                numberSucceeded++;
            };
        });
        return [numberSucceeded, Math.min(...activeProducers)];
    };

    // get the number of active producers like a sane person
    getNumberOfActiveProducers(producer) {
        const numberOfResourcesNeeded = config.producers[producer].upkeepCosts.length;
        const success = this.producersUpkeepSucceded(producer);
        const numberSucceeded = success[0];
        const activeProducers = success[1];
        if (numberOfResourcesNeeded === numberSucceeded) {
            return activeProducers;
        } 
        else {
            return 0;
        };
    };

    // compere upkeep costs with active producers
    upkeepNumberSucceded(producer) {
        const numberActive = this.getNumberOfActiveProducers(producer);
        const totalNumber = this.getTotalNumberOfProducers(producer);
        let numberSucceeded;
        if (numberActive >= totalNumber) {
            numberSucceeded = totalNumber;
        } else {
            numberSucceeded = numberActive;  
        };
        return numberSucceeded;
    };
    
    // consume upkeep resources times number of "active producers"
    consumeUpkeep(producer) {
        const numberSucceeded = this.upkeepNumberSucceded(producer)
        config.producers[producer].upkeepCosts.forEach(resource => {
            this.resources[resource.currency] -= resource.base * numberSucceeded;
        }); 
        return numberSucceeded;
    };

    // produce resources times number of "active producers"
    produceResources(producer, numberSucceeded) {
        config.producers[producer].production.forEach(resource => {
            this.resources[resource.currency] += resource.base * numberSucceeded;
        });
    };
    
    sellResouces(sellConfig) {
        // TBD
    };
    
    draw() {
        // draw ALL THE THINGS
        // // upgrade count //
        document.getElementById("lumberjackcount").innerHTML = this.producers.lumberjack ;
        document.getElementById("coalminecount").innerHTML = this.producers.coalMine;
        document.getElementById("powerplantcount").innerHTML = this.producers.powerPlant;
        // // game counters //
        // document.getElementById("totalclicks").innerHTML = ;
        document.getElementById("score").innerHTML = this.resources.money;
        // document.getElementById("totalfossilfuel").innerHTML = ;
        // // resource count //
        document.getElementById("population").innerHTML = this.resources.population;
        document.getElementById("pollution").innerHTML = this.resources.pollution;
        document.getElementById("totaltrees").innerHTML = this.resources.wood;
        document.getElementById("totalcoal").innerHTML = this.resources.coal;
        document.getElementById("totalenergy").innerHTML = this.resources.energy;
        document.getElementById("totalfood").innerHTML = this.resources.food;
        // document.getElementById("woodpersec").innerHTML = ;
        // document.getElementById("coalpersec").innerHTML = ;
        // document.getElementById("energypersec").innerHTML = ;
        // // upgrade cost //
        // document.getElementById("lumberjack").innerHTML = config.producers[0].purchaseCosts[1].base;
        // document.getElementById("coalmine").innerHTML = ;
        // document.getElementById("powerplant").innerHTML = ;
        // // bonuses per sec //
        // document.getElementById("scorepersec").innerHTML = ;
        // document.getElementById("pollutionpersec").innerHTML = ;
        // document.getElementById("fossilfuelpersec").innerHTML = ;        
        // // subUpgrade cost //
        // document.getElementById("jacksaws").innerHTML = ;
        // document.getElementById("powersaws").innerHTML = ;
        // document.getElementById("heavylogger").innerHTML = ;
        // document.getElementById("moreminers").innerHTML = ;
        // document.getElementById("evenmoreminers").innerHTML = ;
        // document.getElementById("mineshafts").innerHTML = ;
        // document.getElementById("morepower").innerHTML = ;
        // document.getElementById("evenmorepower").innerHTML = ;
        // document.getElementById("mostpower").innerHTML = ;
        // // subUpgrade count //
        // document.getElementById("jacksawscount").innerHTML = ;
        // document.getElementById("powersawscount").innerHTML = ;
        // document.getElementById("heavymachinescount").innerHTML = ;
        // document.getElementById("moreminerscount").innerHTML = ;
        // document.getElementById("evenmoreminerscount").innerHTML = ;
        // document.getElementById("mineshaftscount").innerHTML = ;
        // document.getElementById("morepowercount").innerHTML = ;
        // document.getElementById("evenmorepowercount").innerHTML = ;
        // document.getElementById("mostpowercount").innerHTML = ;
    };

    stateUpdate() {
        this.updateAutoProduction();
        this.updateAllProducers();
        // this.sellResouces(); // TBD
    };

    update() {
        this.stateUpdate();
        this.draw();
    };
    
    // check how many purchase costs are met
    purchaseCostsSucceeded(producer) {
        let numberSucceeded = 0;
        config.producers[producer].purchaseCosts.forEach(resource => {
            if (this.resources[resource.currency] >= resource.base) {
                numberSucceeded++;
            };
        }); 
        return numberSucceeded;
    };

    // subtract purchase costs if they are met
    ableToPurchase(producer) {
        const numberOfResourcesNeeded = config.producers[producer].purchaseCosts.length;
        const numberSucceeded = this.purchaseCostsSucceeded(producer);
        if (numberOfResourcesNeeded === numberSucceeded) {
            config.producers[producer].purchaseCosts.forEach(resource => {
                this.resources[resource.currency] -= resource.base;
            }); 
            return true;
        } else {
            return false;
        };
    };

    // purchase producer if costs are met
    purchaseProducer(producer) {
        if (this.ableToPurchase(producer) === true) {
            this.producers[this.getProducerName(producer)]++;
        };
    };

    // produce resources on purchase
    produceOnPurchase(producer) {
        config.producers[producer].purchaseProduction.forEach(resource => {
            this.resources[resource.currency] += resource.base;
        });
    };

    buttonPress(producer) {
        this.purchaseProducer(producer);
        this.produceOnPurchase(producer);
        this.draw();
    };
};

function addEventsToButtons(game) {
    document.getElementById('clicker').addEventListener('click', e => {
        game.buttonPress(0); // Index 0 represents the axe producer
    });
    document.getElementById('lumberjack-button').addEventListener('click', e => {
        game.buttonPress(1); // Index 1 represents the lumberjack producer
    });
    document.getElementById('coal-mine-button').addEventListener('click', e => {
        game.buttonPress(2); // Index 2 represents the coalMine producer
    });
    document.getElementById('power-plant-button').addEventListener('click', e => {
        game.buttonPress(3); // Index 3 represents the powerPlant producer
    });
}

let game = new Game();

addEventsToButtons(game);
// TEST RESOURCES MOVE TO CONFIG
// game.resources.money+=1000000;
// game.resources.coal+=100000;
// game.resources.population+=100000;
// 
setInterval(() => game.update(), 1000);
