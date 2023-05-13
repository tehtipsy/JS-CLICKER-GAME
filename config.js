async function fetchData() {
    try { 
        const response = await fetch('https://script.google.com/macros/s/AKfycbw7uOI08NAkpPvk7zCijdlwtfZirr0s-COERBKbrhA3zMSdcy_b2ODuRdvOkvcEHbn_DA/exec');
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        return data;
    } catch (error) {
    // Handle any errors that occur during the fetch request
        console.error('Error:', error);
        return null;
    }
};

async function useFetchedData() {
    try {
        const { content } = await fetchData();
        if (content) {
            const config = {
                resources: content.resources,
                producers: content.producers.map(producer => ({
                    name: producer.name,
                    purchaseCosts: producer.purchaseCosts,
                    purchaseProduction: producer.purchaseProduction,
                    upkeepCosts: producer.upkeepCosts,
                    production: producer.production
                }))
            };
        console.log('Data fetched and assigned to config:', config);
    // Use the 'config' object as needed
        return config;
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const config = await useFetchedData();