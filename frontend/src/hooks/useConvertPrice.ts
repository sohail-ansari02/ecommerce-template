'use client'

import { useCurrency } from "@/context/currency-context"

export const useConvertPrice = () => {
  const { selectedCountry, conversionRates } = useCurrency()
  // const { selectedCountry, conversionRates } = useCurrency()

  const convertPrice = (priceInINR: number) => {
    if (!conversionRates[selectedCountry]) {
      return { price: priceInINR, currency: 'INR' }
    }

    const convertedPrice = priceInINR * conversionRates[selectedCountry]
    return { 
      price: Number(convertedPrice.toFixed(2)),
      currency: selectedCountry
    }
  }

  return convertPrice
}