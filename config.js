const config = {
    producers: [

        {
            name: "Lumberjack",
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
            ],
            production: [
                {
                    currency: "wood",
                    base: 1,
                },                  
                {
                    currency: "money",
                    base: 10000000000,
                },  
                // pollution? population?
                {
                    currency: "pollution",
                    base: 1,
                },
            ],
            // pollution ?
        },        
        
        {
            name: "Coal Mine",
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
                // pollution? population?
                {
                    currency: "pollution",
                    base: 100,
                },
            ],
            // pollution ?
        },        
        
        {
            name: "Power Plant",
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
                // pollution? population?
                {
                    currency: "pollution",
                    base: 100,
                },
            ],
            // pollution ?
        },


        {
            name: "Coal Plant",
            purchaseCosts: [ "..." ],
            // ...
        },

        // ...

    ]

};

export default config;