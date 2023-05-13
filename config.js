async function fetchData() {
    try { 
        const response = await fetch('https://script.google.com/macros/s/AKfycbxt71NixIJRryi1ej77-RACGBCNue6JnAxLfE4qGQOEeoewYfMlDHzlFqKag4J61NiKHg/exec');
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
            const config = {...content};
            console.log('Data fetched and assigned to config:', config);
            return config;
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const config = await useFetchedData();