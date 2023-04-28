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
                // pollution? 
            ],
            // pollution ?
        },


        {
            name: "coal plant",
            purchaseCosts: [ "..." ],
            // ...
        },

        // ...

    ]

};

export default config;