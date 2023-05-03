import { config } from "./config.js";

class Game {
    constructor() {
        this.resources = { // move to config
            money: 0,
            population: 0,
            pollution: 0,
            wood: 100,
            coal: 100,
            energy: 0,
        };
        this.producers = { // move to config
            lumberjack: 0,
            coalMine: 2,
            powerPlant: 0,
        };
    };
    
    // update resources automagicly
    updateAutoProduction() {
        this.resources.population++; // SUPPLY PLACEHOLDER
    };

    // get producer Index from config file
    findProducerIndex(producer) { 
        const producerIndex = config.producers.findIndex(p => p.name === producer);
        return producerIndex
    }; 

    // update producers using config index
    updateAllProducers() {
        Object.keys(this.producers).forEach(producer => {
            if (this.producers[producer] >= 1) { // ???
                const producerIndex = this.findProducerIndex(producer);
                this.updateProducer(producerIndex);
            }
        });
    };

    // check producer upkeep and then produce
    updateProducer(producer) {
        // this.getNumberOfActiveProducers(producer, config); // test
        const success = this.consumeUpkeepCosts(producer, config);
        this.produce(producer, success, config);
        // console.log(success) // ???
        // this.producePollution(producer, success, config); // redundent ?
    };

    // get name of producer using index
    getProducerName(producer) {
        return Object.keys(this.producers)[producer]
    };

    // get total number of producers using name
    getNumberOfProducers(producer) {
        return this.producers[this.getProducerName(producer)]
    };

    getNumberOfActiveProducers(producer, config) {
        // compere number of producers to upkeep costs 
        let numberOfResourcesAvailable = 0
        config.producers[producer].upkeepCosts.forEach(upkeepResource => {
            if (this.resources[upkeepResource.currency] >= upkeepResource.base) {
                console.log(this.resources[upkeepResource.currency]);
                numberOfResourcesAvailable++;
            }
            // else {}
        });
        console.log(numberOfResourcesAvailable);
        return numberOfResourcesAvailable
    };

    // // chatGPT 5
    // consumeUpkeepCosts(producer, config) {
    //     const numProducers = this.getNumberOfProducers(producer);
    //     let numFueled = 0;
    
    //     config.producers[producer].upkeepCosts.forEach(resources => {
    //         let costPerProducer = 0;
    //         for (const resource of Object.values(resources)) {
    //             if (typeof resource === "object" && resource.base !== undefined) {
    //                 costPerProducer += resource.base;
    //             }
    //         }
    //         costPerProducer *= numProducers;
    
    //         const canAffordAllResources = Object.values(resources).every(resource => {
    //             if (typeof resource === "object" && resource.base !== undefined) {
    //                 return this.resources[resource.currency] >= resource.base * numProducers;
    //             }
    //             return true;
    //         });
    
    //         if (canAffordAllResources) {
    //             for (const resource of Object.values(resources)) {
    //                 if (typeof resource === "object" && resource.base !== undefined) {
    //                     const numResourceNeeded = Math.ceil(resource.base * numProducers / resource.base);
    //                     const numResourceConsumed = numResourceNeeded * numProducers;
    //                     this.resources[resource.currency] -= numResourceConsumed;
    //                 }
    //             }
    //             numFueled += numProducers;
    //         } else {
    //             let numFueledThisResource = 0;
    //             for (const resource of Object.values(resources)) {
    //                 if (typeof resource === "object" && resource.base !== undefined) {
    //                     const availableResources = this.resources[resource.currency];
    //                     if (availableResources >= resource.base) {
    //                         const numResourceNeeded = Math.ceil(costPerProducer / resource.base);
    //                         const numResourceConsumed = numResourceNeeded * numProducers;
    //                         this.resources[resource.currency] -= numResourceConsumed;
    //                         numFueledThisResource += numProducers;
    //                     } else if (availableResources > 0) {
    //                         const numResourceConsumed = Math.floor(availableResources / resource.base);
    //                         this.resources[resource.currency] -= numResourceConsumed * resource.base;
    //                         numFueledThisResource += numResourceConsumed;
    //                     }
    //                 }
    //             }
    //             if (numFueledThisResource > 0) {
    //                 numFueled += numFueledThisResource;
    //             } else {
    //                 return 0;
    //             }
    //         }
    //     });
    
    //     return numFueled;
    // }

    // // chatGPT 4
    // consumeUpkeepCosts(producer, config) {
    //     const numProducers = this.getNumberOfProducers(producer);
    //     let numFueled = 0;
    
    //     config.producers[producer].upkeepCosts.forEach(resourceArray => {
    //         const costPerProducer = resourceArray.reduce((total, resource) => {
    //             return total + resource.base;
    //         }, 0) * numProducers;
    
    //         const canAffordAllResources = resourceArray.every(resource => {
    //             return this.resources[resource.currency] >= resource.base * numProducers;
    //         });
    
    //         if (canAffordAllResources) {
    //             resourceArray.forEach(resource => {
    //                 const numResourceNeeded = Math.ceil(resource.base * numProducers / resource.base);
    //                 const numResourceConsumed = numResourceNeeded * numProducers;
    //                 this.resources[resource.currency] -= numResourceConsumed;
    //             });
    //             numFueled += numProducers;
    //         } else {
    //             let numFueledThisResource = 0;
    //             resourceArray.forEach(resource => {
    //                 const availableResources = this.resources[resource.currency];
    //                 if (availableResources >= resource.base) {
    //                     const numResourceNeeded = Math.ceil(costPerProducer / resource.base);
    //                     const numResourceConsumed = numResourceNeeded * numProducers;
    //                     this.resources[resource.currency] -= numResourceConsumed;
    //                     numFueledThisResource += numProducers;
    //                 } else if (availableResources > 0) {
    //                     const numResourceConsumed = Math.floor(availableResources / resource.base);
    //                     this.resources[resource.currency] -= numResourceConsumed * resource.base;
    //                     numFueledThisResource += numResourceConsumed;
    //                 }
    //             });
    //             if (numFueledThisResource > 0) {
    //                 numFueled += numFueledThisResource;
    //             } else {
    //                 return 0;
    //             }
    //         }
    //     });
    
    //     return numFueled;
    // };

    // // chatGPT 3
    // consumeUpkeepCosts(producer, config) {
    //     const numProducers = this.getNumberOfProducers(producer);
    //     let numFueled = 0;
    
    //     config.producers[producer].upkeepCosts.forEach(resourceArrayObject => {
    //         // const resourceArray = Object.entries(resourceArrayObject)
    //         const resourceArray = Object.entries(resourceArrayObject).map(([name, value]) => {
    //             return { name, base: value };
    //           });
    //         console.log(resourceArray)
    //         const costPerProducer = resourceArray.reduce((total, resource) => {
    //             return total + resource.base;
    //         }, 0) * numProducers;
    
    //         const canAffordAllResources = resourceArray.every(resource => {
    //             return this.resources[resource.currency] >= resource.base * numProducers;
    //         });
    
    //         if (canAffordAllResources) {
    //             resourceArray.forEach(resource => {
    //                 const numResourceNeeded = Math.ceil(resource.base * numProducers / resource.base);
    //                 const numResourceConsumed = numResourceNeeded * numProducers;
    //                 this.resources[resource.currency] -= numResourceConsumed;
    //             });
    //             numFueled += numProducers;
    //         } else {
    //             let numFueledThisResource = 0;
    //             resourceArray.forEach(resource => {
    //                 const availableResources = this.resources[resource.currency];
    //                 if (availableResources >= resource.base) {
    //                     const numResourceNeeded = Math.ceil(costPerProducer / resource.base);
    //                     const numResourceConsumed = numResourceNeeded * numProducers;
    //                     this.resources[resource.currency] -= numResourceConsumed;
    //                     numFueledThisResource += numProducers;
    //                 } else if (availableResources > 0) {
    //                     const numResourceConsumed = Math.floor(availableResources / resource.base);
    //                     this.resources[resource.currency] -= numResourceConsumed * resource.base;
    //                     numFueledThisResource += numResourceConsumed;
    //                 }
    //             });
    //             if (numFueledThisResource > 0) {
    //                 numFueled += numFueledThisResource;
    //             } else {
    //                 return 0;
    //             }
    //         }
    //     });
    
    //     return numFueled;
    // };
    
    // // chatGPT one kind of resource per producer
    //     consumeUpkeepCosts(producer, config) {
        //         const numProducers = this.getNumberOfProducers(producer);
        //         let numFueled = 0;
        
        //         config.producers[producer].upkeepCosts.forEach(resource => {
            //             const costPerProducer = resource.base * numProducers;
            //             const availableResources = this.resources[resource.currency];
            
            //             if (availableResources >= costPerProducer) {
                //                 const numResourceNeeded = Math.ceil(costPerProducer / resource.base);
                //                 const numResourceConsumed = numResourceNeeded * numProducers;
                //                 this.resources[resource.currency] -= numResourceConsumed;
                //                 numFueled += numProducers;
                //             } else if (availableResources > 0) {
                    //                 const numResourceConsumed = Math.floor(availableResources / resource.base);
                    //                 this.resources[resource.currency] -= numResourceConsumed * resource.base;
                    //                 numFueled += numResourceConsumed;
                    //             }
                    //         });
                    //         console.log(numFueled)
                    //         return numFueled;
                    //     };
                    
                    // // chatGPT 2
                    //     consumeUpkeepCosts(producer, config) {
                        //         const numProducers = this.getNumberOfProducers(producer);
                        //         let numFueled = 0;
                        
                        //         config.producers[producer].upkeepCosts.forEach(upkeepCost => {
                            //             let allResourcesAvailable = true;
                            //             let totalResourceConsumed = 0;
                            
                            //             upkeepCost.resources.forEach(resource => {
                                //                 const costPerProducer = resource.base * numProducers;
                                //                 const availableResources = this.resources[resource.currency];
                                
                                //                 if (availableResources < costPerProducer) {
                                    //                     allResourcesAvailable = false;
                                    //                     return;
                                    //                 }
                                    
                                    //                 const numResourceNeeded = Math.ceil(costPerProducer / resource.base);
                                    //                 const numResourceConsumed = numResourceNeeded * numProducers;
                                    //                 this.resources[resource.currency] -= numResourceConsumed;
                                    //                 totalResourceConsumed += numResourceConsumed;
                                    //             });
                                    
                                    //             if (allResourcesAvailable) {
//                 numFueled += numProducers;
//             } else if (totalResourceConsumed > 0) {
    //                 numFueled += Math.floor(totalResourceConsumed / upkeepCost.totalBase);
    //             }
    //         });
    
    //         console.log(numFueled)
    //         return numFueled;
    //     };
    
    
    // fix this mess
    consumeUpkeepCosts(producer, config) {
        // get number of active producers somewhere
        let numberSucceeded = 0
        config.producers[producer].upkeepCosts.forEach(resource => {
            if (this.resources[resource.currency] >= resource.base
                * this.getNumberOfProducers(producer)) { // add * active
                this.resources[resource.currency] -= resource.base 
                * this.getNumberOfProducers(producer) // move to diffrent function
                numberSucceeded++ // fix this
            }
            // else {

            // }
        }); return numberSucceeded
    };

    // produce resources times number of "active producers"
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
