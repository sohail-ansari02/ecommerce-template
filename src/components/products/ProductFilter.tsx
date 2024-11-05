"use server";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useMemo, useState } from "react";

import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { iProduct } from "@/types/types";

const ProductFilter = ({ products,setFilteredProducts }: { products: iProduct[],setFilteredProducts:any }) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [sortBy, setSortBy] = useState<string>("name-asc");

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.price);
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      setPriceRange([minPrice, maxPrice]);
    } else {
      setPriceRange([0, 100]); // Reset or set default values when no products
    }
    setFilteredProducts(products);
  }, [products,setFilteredProducts]);

  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price || 0), 100),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          (product.price || 0) >= priceRange[0] &&
          (product.price || 0) <= priceRange[1]
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return (a.price || 0) - (b.price || 0);
          case "price-desc":
            return (b.price || 0) - (a.price || 0);
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [products, priceRange, sortBy]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  return (
    <>
      <div className="mb-2 p-4 bg-background rounded-lg shadow">
        <h2 className="text-xl font-semibold">Filters</h2>
        <div className="space-y-4 flex w-full gap-3 items-baseline flex-col md:flex-row">
          <div className="space-y-2 flex-1 w-full md:flex-none md:w-auto">
            <Label htmlFor="price-range">
              Price Range: ${priceRange[0].toFixed(2)} - $
              {priceRange[1].toFixed(2)}
            </Label>
            <Slider
              id="price-range"
              min={0}
              max={maxPrice}
              step={1}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2 flex-1 w-full md:flex-none md:w-auto  ">
            <Label htmlFor="sort-by">Sort By</Label>
            <Select onValueChange={handleSortChange} defaultValue={sortBy}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="mb-4 px-4">
        <p className="text-sm text-muted-foreground">
          Total Products: {filteredProducts.length}
        </p>
      </div>
    </>
  );
};

ProductFilter.propTypes = {};

export default ProductFilter;
