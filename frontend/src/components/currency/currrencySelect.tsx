"use client";

import React, { useEffect, useState } from "react";
import { SELECTED_COUNTRY, SELECTED_CURRENCY_SYMBOL, useCurrency } from "@/context/currency-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { Label } from "../ui/label";
import { fetchCountries } from "@/libs/countryList";

export const CountrySelect = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("IN|₹");  // Default country code is India (IN)
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState<string>('₹')

  const [countries, setCountries] = useState<{ code: string, name: string, flag: string, currency: string ,currencySymbol: string}[]>([]);

  // Fetch countries from an API (for example, REST Countries API)
  useEffect(() => {
    fetchCountries().then(data => setCountries(data));
    if (!localStorage.getItem(SELECTED_COUNTRY)) {
      localStorage.setItem(SELECTED_COUNTRY, "INR|₹");
    }
    if (!localStorage.getItem(SELECTED_CURRENCY_SYMBOL)) {
      localStorage.setItem(SELECTED_CURRENCY_SYMBOL, "₹");
    }
    setSelectedCountry(localStorage.getItem(SELECTED_COUNTRY) as string);
    setSelectedCurrencySymbol(localStorage.getItem(SELECTED_CURRENCY_SYMBOL) as string);
  }, []);

  // Handle country change
  const handleChange = (value: string) => {
    const [country,currency] = value.split('|');
    localStorage.setItem(SELECTED_COUNTRY, value);
    setSelectedCountry(value);
    localStorage.setItem(SELECTED_CURRENCY_SYMBOL, currency);
    setSelectedCurrencySymbol(currency);
    location.reload();
  };

  return (
    <div className="space-y-2 bg-black flex-1 md:flex-none w-auto fixed bottom-5 left-4 z-20">
      <Select onValueChange={handleChange} value={selectedCountry} >
        <SelectTrigger id="country-select4currency">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent className="h-52 !overflow-auto">
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.name+'|'+country.currencySymbol}>
              <div className="flex items-center">
                <img src={country.flag} alt={country.name} className="w-6 h-4 mr-2" />
                <span className="mr-2">{country.name}</span>
                <span className="text-sm text-gray-500">{country.currency}</span>
              </div>
            </SelectItem>
            // <SelectItem key={country.code + '|' + country.currencySymbol} value={country.code + '|' + country.currencySymbol}>
            //   <div className="flex items-center">
            //     <img src={country.flag} alt={country.name} className="w-6 h-4 mr-2" />
            //     <span className="mr-2">{country.name}</span>
            //     <span className="text-sm text-gray-500">{country.currency}</span>
            //   </div>
            // </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;
