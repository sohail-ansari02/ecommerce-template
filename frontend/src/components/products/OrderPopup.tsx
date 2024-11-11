'use client'

import * as Dialog from '@radix-ui/react-dialog'

import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { OrderProduct } from '@/libs/order';
import { cn } from "@/libs/utils"
import { fetchCountries } from '@/libs/countryList';

export default function OrderPopup({ className }: { className?: string }) {
    const [open, setOpen] = useState(false)
    const [countries, setCountries] = useState<{ code: string, name: string, flag: string, currency: string }[]>([]);

    // Fetch countries from an API (for example, REST Countries API)
    useEffect(() => {
        fetchCountries().then(data => setCountries(data))
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const orderData = Object.fromEntries(formData)
        console.log('Order data:', orderData)
        // Here you would typically send the data to your backend
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant="default" className={cn(className)}>Place Order</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 !pointer-events-none" />
                <Dialog.Content onInteractOutside={e => e.preventDefault()}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto border border-[#2E2E2E]">
                    <Dialog.Title className="text-xl font-bold mb-4 text-white">
                        Order Information
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-white">First Name</Label>
                            <Input id="firstName" name="firstName" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-white">Last Name</Label>
                            <Input id="lastName" name="lastName" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white">Phone</Label>
                            <Input id="phone" name="phone" type="tel" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input id="email" name="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country" className="text-white">Country</Label>
                            <Select name="country" defaultValue="IN">
                                <SelectTrigger className="w-full" id="country">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent className="h-52 !overflow-scroll !isolate" style={{ 'overflow': 'auto' }}>
                                    {countries.map((country) => (
                                        <SelectItem key={country.code} value={country.code}>
                                            <div className="flex items-center">
                                                <img src={country.flag} alt={country.name} className="w-6 h-4 mr-2" />
                                                <span className="mr-2">{country.name}</span>
                                                {/* <span className="text-sm text-gray-500">{country.currency}</span> */}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                       
                        <div className="space-y-2">
                            <Label htmlFor="shippingAddress" className="text-white">Shipping Address</Label>
                            <Input id="shippingAddress" name="shippingAddress" required />
                        </div>
                      
                        <div className="space-y-2">
                            <Label htmlFor="postalCode" className="text-white">Postal Code</Label>
                            <Input id="postalCode" name="postalCode" type="string" required />
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                            <Dialog.Close asChild>
                                <Button variant="outline" className='text-black'>Cancel</Button>
                            </Dialog.Close>
                            <Button type="submit" variant="default" onClick={() => OrderProduct()} >Submit Order</Button>
                        </div>
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full p-1 text-gray-400 hover:text-gray-200"
                            aria-label="Close"
                        >
                            ❌
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}