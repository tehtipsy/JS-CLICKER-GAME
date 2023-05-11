// async function fetchData() {
//     try {
//       const response = await fetch('https://example.com/data.json');
//       if (!response.ok) {
//         throw new Error('Network response was not OK');
//       }
//       const data = await response.json();
//       // Create an object using the JSON data
//       const myObject = {
//         // Define properties using data from the JSON
//         name: data.name,
//         age: data.age,
//         // Add any other properties as needed
//       };
//       return myObject;
//     } catch (error) {
//       // Handle any errors that occur during the fetch request
//       console.error('Error:', error);
//       return null;
//     }
//   }
  
//   export default fetchData;
// insted of config import
// import fetchData from './path/to/fetchData';

// async function useFetchedData() {
//   const myObject = await fetchData();
//   if (myObject) {
//     // Use the fetched data object here
//     console.log(myObject);
//   } else {
//     // Handle the case when there was an error during fetch
//     console.error('Failed to fetch data');
//   }
// }

// useFetchedData();

  

export const config = {
    resources: [
        "money",
        "population",
        "pollution",
        "wood",
        "coal",
        "energy",
    ],
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
                // {
                //     currency: "population",
                //     currencyGrowth: 1,
                //     base: 1,
                // }, 
            ],
            production: [
                {
                    currency: "wood",
                    base: 10,
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
                    currency: "energy",
                    base: 100,
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