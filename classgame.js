
class Game {
    constructor() {
        this.resources = {
            money: 0,
            population: 0,
            pollution: 0,
            wood: 0,
            coal: 0,
        };
        this.producers = {
            lumberjack: 0,
            coalPlant: 0,
        };
    };

    updateAutoProduction() {
        this.resources.population++;
    };

    updateAllPRoducers() {
        Object.keys(this.producers).forEach(producer => {
            this.produce(producer);
        });
    };

    updateProducer(producer) {
        const config = {}; // get config
        const success = this.consumeCosts(producer, config);
        this.produce(producer, config, success);
        this.producePollution(producer, config, success);
    };

    consumeCosts(producer, config)
    {
        // consume costs and return the number of "active producers"
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
    }

    stateUpdate() {
        this.updateAutoProduction();
        this.updateAllPRoducers();
        this.sellResouces();
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

function addEventsToButtons(game) {
    document.getElementById('mybutton').addEventListener(e => {
        game.buttonPress('sexy button');
    });
}

let game = Game();

addEventsToButtons(game);

setInterval(() => game.update(), 1000);
