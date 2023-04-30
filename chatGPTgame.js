import { config } from "./config.js";

class Game {
    constructor(config) {
      this.resources = {
        money: 100000,
        wood: 0,
        coal: 0,
        pollution: 0,
        population: 10,
      };
      this.producers = config.producers;
    }
  
    consumeCosts(producerName, config) {
      const producerIndex = this.producers.findIndex(p => p.name === producerName);
      const resourcesConsumed = {};
  
      this.producers[producerIndex].upkeepCosts.forEach(cost => {
        const { currency, base } = cost;
        const amount = base * this.producers[producerIndex].quantity;
  
        if (this.resources[currency] >= amount) {
          this.resources[currency] -= amount;
          resourcesConsumed[currency] = amount;
        }
      });
  
      return resourcesConsumed;
    }
  
    incrementQuantity(producerName) {
      const producerIndex = this.producers.findIndex(p => p.name === producerName);
  
      if (this.canAffordProducer(producerIndex)) {
        const { purchaseCosts, quantity } = this.producers[producerIndex];
        const nextPurchaseCost = purchaseCosts[quantity];
        const resourcesConsumed = this.consumeCosts(producerName, config);
  
        this.resources.population += nextPurchaseCost.base;
        this.producers[producerIndex].quantity++;
  
        Object.entries(resourcesConsumed).forEach(([currency, amount]) => {
          this.resources[currency] -= amount;
        });
        
        return true;
      }
  
      return false;
    }
  
    canAffordProducer(producerIndex) {
      const { purchaseCosts, quantity } = this.producers[producerIndex];
      const nextPurchaseCost = purchaseCosts[quantity];
      
      return Object.entries(nextPurchaseCost).every(([currency, value]) => {
        const currentAmount = this.resources[currency];
        const cost = typeof value === "string"
          ? Math.ceil(currentAmount * parseFloat(value))
          : value;
        
        return currentAmount >= cost;
      });
    }
  
    updateProducer(producer) {
      if (this.canAffordProducer(producer)) {
        this.incrementQuantity(producer);
        this.producers[producer].lastUpdated = Date.now();
      }
    }
  
    updateAllProducers() {
      this.producers.forEach((producer, index) => {
        if (producer.lastUpdated + producer.frequency <= Date.now()) {
          this.updateProducer(index);
        }
      });
    }
  
    stateUpdate() {
      this.updateAllProducers();
    }
  
    update() {
      this.stateUpdate();
      setTimeout(() => this.update(), 1000);
    }
  }

//   setInterval(() => this.update(), 1000);