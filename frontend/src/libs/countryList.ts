export const fetchCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data.map((country: any) => ({
            code: country.cca2, // Alpha-2 code (US, CA, etc.)
            name: country.name.common, // Common name (United States, Canada, etc.)
            flag: country.flags.svg, // Flag URL
            currency: country.currencies ? Object.keys(country.currencies)[0] : "N/A", // Get currency code (e.g., INR, USD, etc.)
            currencySymbol: country.currencies ? country.currencies[Object.keys(country.currencies)[0]].symbol : "N/A", // Get currency code (e.g., INR, USD, etc.)

        }))
        return countryList;
    }
    catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }

}

