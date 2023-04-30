import { config } from "./config.js";

class Game {
    constructor() {
        this.resources = {
            money: 0,
            population: 0,
            pollution: 0,
            wood: 0,
            coal: 0,
            energy: 0,
        };
        this.producers = {
            lumberjack: 0,
            coalMine: 0,
            powerPlant: 0,
        };
    };

    updateAutoProduction() {
        this.resources.population++;
    };

    updateAllProducers() {
        Object.keys(this.producers).forEach(producer => {
            const producerIndex = config.producers.findIndex(p => p.name === producer);
            // this.produce(producer);
            // this.updateProducer(producer);
            // this.produce(producerIndex);
            this.updateProducer(producerIndex);
        });
    };

    updateProducer(producer) {
        // const config = {}; // get config - ES6 import
        const success = this.consumeCosts(producer, config);
        console.log(success)
        this.produce(producer, success, config);
        // this.producePollution(producer, success, config); // redundent ?
    };

    consumeCosts(producer, config) {
        let numberSucceeded = 0
        config.producers[producer].upkeepCosts.forEach(resource => {
            if (this.resources[resource.currency] >= resource.base) {
                this.resources[resource.currency] -= resource.base // move to diffrent function ?
                numberSucceeded++
            }
        }); return numberSucceeded
    };

    produce(producer, numberSucceeded, config) {
        config.producers[producer].production.forEach(resource => {
            this.resources[resource.currency] += resource.base * numberSucceeded;
        });
    };

    producePollution(producer, config, numberSucceeded) {
        // produce pollution
    };

    sellResouces(sellConfig) {
        // TBD
    };

    draw() {
        // draw ALL THE THINGS
        // // bonuses per sec //
        // document.getElementById("scorepersec").innerHTML = ;
        // document.getElementById("pollutionpersec").innerHTML = ;
        // document.getElementById("fossilfuelpersec").innerHTML = ;        
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
        // // upgrade count //
        document.getElementById("lumberjackcount").innerHTML = this.producers.lumberjack ;
        document.getElementById("coalminecount").innerHTML = this.producers.coalMine;
        document.getElementById("powerplantcount").innerHTML = this.producers.powerPlant;
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
    }

    stateUpdate() {
        this.updateAutoProduction();
        this.updateAllProducers(); // build function and config
        // this.sellResouces(); // TBD
    };

    update() {
        this.stateUpdate();
        this.draw();
    }

    // ...
    // every button press is here (preferably parametrically)
    buttonPress(buttonParams) {
        // do the button press
    }
}

// function addEventsToButtons(game) {
//     document.getElementById('mybutton').addEventListener(e => {
//         game.buttonPress('sexy button');
//     });
// }

let game = new Game();

// addEventsToButtons(game);

setInterval(() => game.update(), 1000);
