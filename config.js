export const config = {
    producers: [
        {
            name: "lumberjack",
            purchaseCosts: [
                {
                    currency: "population",
                    currencyGrowth: [1],
                    base: 1,
                },
                {
                    currency: "money",
                    currencyGrowth: "1.1",
                    base: 2500,
                },
            ],
            upkeepCosts: [
                {
                    currency: "money",
                    base: 250,
                    currencyGrowth: "1",
                },               
                {
                    currency: "population",
                    currencyGrowth: 1,
                    base: 1,
                }, 
            ],
            production: [
                {
                    currency: "wood",
                    base: 1,
                },                  
                {
                    currency: "money",
                    base: 1,
                },  
                {
                    currency: "pollution",
                    base: 1,
                },
            ],
        },        
        
        {
            name: "coalMine",
            purchaseCosts: [
                {
                    currency: "population",
                    currencyGrowth: [1],
                    base: 10,
                },
                {
                    currency: "money",
                    currencyGrowth: "1.1",
                    base: 10000,
                },
            ],
            upkeepCosts: [
                {
                    currency: "money",
                    base: 2500,
                    currencyGrowth: "1",
                },                  
                {
                    currency: "wood",
                    base: 1,
                    currencyGrowth: "1",
                },                
            ],
            production: [
                {
                    currency: "coal",
                    base: 100,
                },  
                {
                    currency: "pollution",
                    base: 100,
                },
            ],
        },        
        
        {
            name: "powerPlant",
            purchaseCosts: [
                {
                    currency: "population",
                    currencyGrowth: [1],
                    base: 10,
                },
                {
                    currency: "money",
                    currencyGrowth: "1.1",
                    base: 200000,
                },
            ],
            upkeepCosts: [
                {
                    currency: "money",
                    base: 250,
                    currencyGrowth: "1",
                },                       
                {
                    currency: "coal",
                    base: 2000,
                    currencyGrowth: "1",
                },                
            ],
            production: [
                {
                    currency: "wood",
                    base: 1,
                },  
                {
                    currency: "pollution",
                    base: 100,
                },
            ],
        },
    ],

};

// export default config;