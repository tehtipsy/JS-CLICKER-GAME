import config from "./config";

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
            coalPlant: 0,
            powerPlant: 0,
        };
    };

    updateAutoProduction() {
        this.resources.population++;
    };

    updateAllProducers() {
        Object.keys(this.producers).forEach(producer => {
            this.produce(producer);
        });
    };

    updateProducer(producer) {
        // const config = {}; // get config ES6 import
        const success = this.consumeCosts(producer, config);
        this.produce(producer, config, success);
        this.producePollution(producer, config, success);
    };

    consumeCosts(producer, config) {
        // consume costs and return the number of "active producers"
        // let numberSucseeded = 0
        // config.producers[producer].upkeepCosts.forEach(resource => {
        //     this.resources[resource.currency] -= 
        // }); return numberSucseeded
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
                // document.getElementById("score").innerHTML = ;
                // document.getElementById("totalfossilfuel").innerHTML = ;
                // // resource count //
                document.getElementById("population").innerHTML = this.resources.population;
                // document.getElementById("pollution").innerHTML = ;
                // document.getElementById("totaltrees").innerHTML = ;
                // document.getElementById("totalcoal").innerHTML = ;
                // document.getElementById("totalenergy").innerHTML = ;
                // document.getElementById("woodpersec").innerHTML = ;
                // document.getElementById("coalpersec").innerHTML = ;
                // document.getElementById("energypersec").innerHTML = ;
                // // upgrade cost //
                // document.getElementById("lumberjack").innerHTML = ;
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
                // document.getElementById("lumberjackcount").innerHTML = ;
                // document.getElementById("coalminecount").innerHTML = ;
                // document.getElementById("powerplantcount").innerHTML = ;
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
        // this.updateAllProducers(); // build function and config
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
