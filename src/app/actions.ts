"use server";

import {} from "@/libs/utils";

import { EnrichedProducts, ProductDocument } from "@/types/types.old";

import { Product } from "@/models/Products";
import { Schema } from "mongoose";
import { connectDB } from "@/libs/mongodb";
import { iProduct } from "@/types/types";

export const getAllProducts = async () => {
  // Mock data for updatedCart
  const mockProductList: iProduct[] = [
    {
      _id: 1,
      name: "Steel Mace Gada",
      category: "Steel Mace",
      images: ["/gada.webp", "/gada.webp"],
      price: 49.99,
      onSale: false,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 2,
      name: "Steel Mace Gada",
      category: "Steel Mace",
      images: ["/gada.webp", "/gada.webp"],
      price: 64.99,
      onSale: true,
      oldPrice: 74.99,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 3,
      name: "Wooden Gada",
      category: "Wooden Gada",
      images: ["/gada.webp", "/gada.webp"],
      price: 34.99,
      onSale: false,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 4,
      name: "Steel Mace Gada",
      category: "Steel Mace",
      images: ["/gada.webp", "/gada.webp"],
      price: 84.99,
      onSale: true,
      oldPrice: 94.99,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 5,
      name: "Steel Mace Gada",
      category: "Steel Mace",
      images: ["/gada.webp", "/gada.webp"],
      price: 119.99,
      onSale: false,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 6,
      name: "Wooden Gada",
      category: "Wooden Gada",
      images: ["/gada.webp", "/gada.webp"],
      price: 44.99,
      onSale: false,
      quantity: 0,
      addedToCart: false,
    },
  ];

  return mockProductList;
};

export const getAllProductsOld = async () => {
  // Mock data for updatedCart
  const mockUpdatedCart: EnrichedProducts[] = [
    {
      productId: Math.random(),
      size: "M",
      variantId: "price_1234567890",
      quantity: 2,
      price: 29.99,
      color: "SOHAIL",
      category: "Equipment",
      image: ["/gada.webp"],
      name: "Ctetstlassic Blue T-Shirt",
      purchased: false,
      _id: Math.random(),
    },
    {
      productId: Math.random(),
      size: "L",
      variantId: "price_2345678901",
      quantity: 1,
      price: 59.99,
      color: "Black",
      category: "Equipment",
      image: ["/gada.webp"],
      name: "Gada",
      purchased: false,
      _id: Math.random(),
    },
    {
      productId: Math.random(),
      size: "S",
      variantId: "price_3456789012",
      quantity: 3,
      price: 19.99,
      color: "White",
      category: "Equipment",
      image: ["/gada.webp"],
      name: "Gada",
      purchased: false,
      _id: Math.random(),
    },
    {
      productId: Math.random(),
      size: "XL",
      variantId: "price_4567890123",
      quantity: 1,
      price: 89.99,
      color: "Green",
      category: "Equipment",
      image: ["/gada.webp"],
      name: "Gada",
      purchased: false,
      _id: Math.random(),
    },
    {
      productId: Math.random(),
      size: "One Size",
      variantId: "price_5678901234",
      quantity: 2,
      price: 24.99,
      color: "Red",
      category: "Equipment",
      image: ["/gada.webp"],
      name: "Gada",
      purchased: false,
      _id: Math.random(),
    },
  ];

  return mockUpdatedCart;
  // try {
  //   await connectDB();

  //   const products: EnrichedProducts[] = await Product.find();
  //   return products;
  // } catch (error) {
  //   console.error("Error getting products:", error);
  //   throw new Error("Failed to fetch category products");
  // }
};

export const getCategoryProducts = async (category: string) => {
  const mockUpdatedCart: EnrichedProducts[] = [
    {
      productId: Math.random(),
      size: "M",
      variantId: "price_1234567890",
      quantity: 2,
      price: 29.99,
      color: "Blue",
      category: "T-Shirts",
      image: ["/gada.webp"],
      name: "Classic Blue T-Shirt",
      purchased: false,
      _id: Math.random(),
    },
    {
      productId: Math.random(),
      size: "L",
      variantId: "price_2345678901",
      quantity: 1,
      price: 59.99,
      color: "Black",
      category: "Jeans",
      image: ["/gada.webp"],
      name: "Gada",
      purchased: false,
      _id: Math.random(),
    },
    {
      productId: Math.random(),
      size: "S",
      variantId: "price_3456789012",
      quantity: 3,
      price: 19.99,
      color: "White",
      category: "Socks",
      image: ["/gada.webp"],
      name: "Gada",
      purchased: false,
      _id: Math.random(),
    },
    {
      productId: Math.random(),
      size: "XL",
      variantId: "price_4567890123",
      quantity: 1,
      price: 89.99,
      color: "Green",
      category: "Jackets",
      image: ["/gada.webp"],
      name: "Gada",
      purchased: false,
      _id: Math.random(),
    },
    {
      productId: Math.random(),
      size: "One Size",
      variantId: "price_5678901234",
      quantity: 2,
      price: 24.99,
      color: "Red",
      category: "Hats",
      image: ["/gada.webp"],
      name: "Gada",
      purchased: false,
      _id: Math.random(),
    },
  ];

  return mockUpdatedCart;
  // try {
  //   await connectDB();

  //   const products: EnrichedProducts[] = await Product.find({ category });
  //   return products;
  // } catch (error) {
  //   console.error("Error getting products:", error);
  //   throw new Error("Failed to fetch category products");
  // }
};

export const getRandomProducts = async (productId: string) => {
  const mockProductList: iProduct[] = [
    {
      _id: 1,
      name: "Steel Mace Gada",
      category: "Steel Mace",
      images: ["/gada.webp", "/gada.webp"],
      price: 49.99,
      onSale: false,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 2,
      name: "Steel Mace Gada",
      category: "Steel Mace",
      images: ["/gada.webp", "/gada.webp"],
      price: 64.99,
      onSale: true,
      oldPrice: 74.99,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 3,
      name: "Wooden Gada",
      category: "Wooden Gada",
      images: ["/gada.webp", "/gada.webp"],
      price: 34.99,
      onSale: false,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 4,
      name: "Steel Mace Gada",
      category: "Steel Mace",
      images: ["/gada.webp", "/gada.webp"],
      price: 84.99,
      onSale: true,
      oldPrice: 94.99,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 5,
      name: "Steel Mace Gada",
      category: "Steel Mace",
      images: ["/gada.webp", "/gada.webp"],
      price: 119.99,
      onSale: false,
      quantity: 0,
      addedToCart: false,
    },
    {
      _id: 6,
      name: "Wooden Gada",
      category: "Wooden Gada",
      images: ["/gada.webp", "/gada.webp"],
      price: 44.99,
      onSale: false,
      quantity: 0,
      addedToCart: false,
    },
  ];

  return mockProductList;
  // const shuffleArray = (array: EnrichedProducts[]) => {
  //   let shuffled = array.slice();
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  //   }
  //   return shuffled;
  // };

  // try {
  //   await connectDB();

  //   const allProducts: EnrichedProducts[] = await Product.find();
  //   const shuffledProducts = shuffleArray(allProducts);
  //   const randomProducts = shuffledProducts
  //     .filter((product) => product._id.toString() !== productId)
  //     .slice(0, 6);
  //   return randomProducts;
  // } catch (error) {
  //   console.error("Error getting products:", error);
  //   throw new Error("Failed to fetch random products");
  // }
};

export const getProduct = async (_id: string) => {
  const mockUpdatedCart: ProductDocument | any = {
    name: "Yoga Mat",
    description:
      "High-density foam yoga mat for comfort and support during your workouts. Non-slip surface.",
    price: 29.99,
    category: "Accessories",
    sizes: ["72 x 24 inches"],
    image: ["https://example.com/images/yogamat.jpg"],
    variants: [
      {
        priceId: "variant-001",
        color: "Black",
        images: ["/gada.webp", "/gada.webp"],
      },
    ],
    quantity: 100,
    productId: "605c72ef3b64b4e0f8e6d4c1",
    purchased: false,
  };

  return mockUpdatedCart;
  // try {
  //   await connectDB();

  //   const product = await Product.findOne({ _id });
  //   return product;
  // } catch (error) {
  //   console.error("Error getting product:", error);
  // }
};
