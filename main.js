import { config } from "./config.js";

class Game {
    constructor() {
        this.resources = { // move to config
            money: 12500,
            population: 0,
            pollution: 0,
            wood: 6,
            coal: 40000,
            energy: 0,
        };
        this.producers = { // move to config
            lumberjack: 0,
            coalMine: 3,
            powerPlant: 3,
        };
    };
    
    // update resources automagicly
    updateAutoProduction() {
        this.resources.population++; // SUPPLY PLACEHOLDER
        // this.resources.money+=10000; // TEST
        // this.producers.coalMine+=1; // TEST
    };

    // get producer Index from config file
    findProducerIndex(producer) { 
        return config.producers.findIndex(p => p.name === producer);
    }; 

    // update producers using config index
    updateAllProducers() {
        Object.keys(this.producers).forEach(producer => {
            if (this.producers[producer] >= 1) { // check producer count
                this.updateProducer(this.findProducerIndex(producer));
            }
        });
    };

    // check producer upkeep and then produce
    updateProducer(producer) {
        const success = this.consumeUpkeep(producer)
        this.produce(producer, success);        
    };

    // get name of producer using index
    getProducerName(producer) {
        return Object.keys(this.producers)[producer]
    };

    // get total number of producers using name
    getTotalNumberOfProducers(producer) {
        return this.producers[this.getProducerName(producer)]
    };

    // get the number of active producers like a sane person
    getNumberOfActiveProducers(producer) {
        const numberOfResourcesNeeded = config.producers[producer].upkeepCosts.length
        const activeProducers = []
        let numberSucceeded = 0
        config.producers[producer].upkeepCosts.forEach(upkeepResource => {
            if (this.resources[upkeepResource.currency] >= upkeepResource.base) {
                numberSucceeded++
                activeProducers.push(Math.floor(this.resources[upkeepResource.currency] / upkeepResource.base))
            }
        });
        if (numberOfResourcesNeeded === numberSucceeded) {
            return Math.min(...activeProducers)
        } 
        else {
            return 0
        }
    };
    
    // consume upkeep resources times number of "active producers"
    consumeUpkeep(producer) {
        const numberActive = this.getNumberOfActiveProducers(producer)
        const totalNumber = this.getTotalNumberOfProducers(producer)
        let numberSucceeded
        if (numberActive >= totalNumber) {
            numberSucceeded = totalNumber
        } else {
            numberSucceeded = numberActive       
        }
        config.producers[producer].upkeepCosts.forEach(resource => {
            this.resources[resource.currency] -= resource.base * numberSucceeded
        }); 
        return numberSucceeded
    };

    // produce resources times number of "active producers"
    produce(producer, numberSucceeded) {
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
        // document.getElementById("woodpersec").innerHTML = ;
        // document.getElementById("coalpersec").innerHTML = ;
        // document.getElementById("energypersec").innerHTML = ;
        // // upgrade cost //
        document.getElementById("lumberjack").innerHTML = config.producers[0].purchaseCosts[1].base;
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
        this.updateAllProducers(); // build function and config
        // this.sellResouces(); // TBD
    };

    update() {
        this.stateUpdate();
        this.draw();
    };

    // ...
    // every button press is here (preferably parametrically)
    buttonPress(buttonParams) {
        // do the button press
    };
};

// function addEventsToButtons(game) {
//     document.getElementById('mybutton').addEventListener(e => {
//         game.buttonPress('sexy button');
//     });
// };

let game = new Game();

// addEventsToButtons(game);

setInterval(() => game.update(), 1000);
