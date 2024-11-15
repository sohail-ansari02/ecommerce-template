'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface CurrencyContextType {
  selectedCountry: string
  setSelectedCountry: (country: string) => void
  conversionRates: Record<string, number>
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('IN')
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR')
        const data = await response.json()
        setConversionRates(data.rates)
      } catch (error) {
        console.error('Failed to fetch conversion rates:', error)
      }
    }

    fetchConversionRates()
  }, [])

  return (
    <CurrencyContext.Provider value={{ selectedCountry, setSelectedCountry, conversionRates }}>
      {children}
    </CurrencyContext.Provider>
  )
}