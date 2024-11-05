"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { Label } from "../ui/label";

export const CountrySelect = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("IN");  // Default country code is India (IN)
  const [countries, setCountries] = useState<{ code: string, name: string, flag: string, currency: string }[]>([]);

  // Fetch countries from an API (for example, REST Countries API)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data.map((country: any) => ({
          code: country.cca2, // Alpha-2 code (US, CA, etc.)
          name: country.name.common, // Common name (United States, Canada, etc.)
          flag: country.flags.svg, // Flag URL
          currency: country.currencies ? Object.keys(country.currencies)[0] : "N/A", // Get currency code (e.g., INR, USD, etc.)
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Handle country change
  const handleChange = (value: string) => {
    setSelectedCountry(value);
    console.log("Selected country:", value);
  };

  return (
    <div className="space-y-2 bg-black flex-1 md:flex-none w-auto fixed bottom-5 left-4 z-50">
      <Select onValueChange={handleChange} value={selectedCountry} defaultValue="IN">
        <SelectTrigger id="country-select">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent className="h-52 overflow-auto">
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center">
                <img src={country.flag} alt={country.name} className="w-6 h-4 mr-2" />
                <span className="mr-2">{country.name}</span>
                <span className="text-sm text-gray-500">{country.currency}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;
