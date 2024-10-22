"use server";

import { EnrichedProducts } from "@/types/types";
import { JsonParse } from "@/libs/utils";
import { Product } from "@/models/Products";
import { Schema } from "mongoose";
import { connectDB } from "@/libs/mongodb";

export const getAllProducts = async () => {
  // Mock data for updatedCart
  const mockUpdatedCart: EnrichedProducts[] = [
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1"),
      size: "M",
      variantId: "price_1234567890",
      quantity: 2,
      price: 29.99,
      color: "Blue",
      category: "T-Shirts",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Classic Blue T-Shirt",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2"),
      size: "L",
      variantId: "price_2345678901",
      quantity: 1,
      price: 59.99,
      color: "Black",
      category: "Jeans",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Slim Fit Black Jeans",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3"),
      size: "S",
      variantId: "price_3456789012",
      quantity: 3,
      price: 19.99,
      color: "White",
      category: "Socks",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Cotton Ankle Socks",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a4"),
      size: "XL",
      variantId: "price_4567890123",
      quantity: 1,
      price: 89.99,
      color: "Green",
      category: "Jackets",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Waterproof Hiking Jacket",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a4"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a5"),
      size: "One Size",
      variantId: "price_5678901234",
      quantity: 2,
      price: 24.99,
      color: "Red",
      category: "Hats",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Adjustable Baseball Cap",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a5"),
    },
  ];

  return ( mockUpdatedCart);
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
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1"),
      size: "M",
      variantId: "price_1234567890",
      quantity: 2,
      price: 29.99,
      color: "Blue",
      category: "T-Shirts",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Classic Blue T-Shirt",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2"),
      size: "L",
      variantId: "price_2345678901",
      quantity: 1,
      price: 59.99,
      color: "Black",
      category: "Jeans",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Slim Fit Black Jeans",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3"),
      size: "S",
      variantId: "price_3456789012",
      quantity: 3,
      price: 19.99,
      color: "White",
      category: "Socks",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Cotton Ankle Socks",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a4"),
      size: "XL",
      variantId: "price_4567890123",
      quantity: 1,
      price: 89.99,
      color: "Green",
      category: "Jackets",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Waterproof Hiking Jacket",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a4"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a5"),
      size: "One Size",
      variantId: "price_5678901234",
      quantity: 2,
      price: 24.99,
      color: "Red",
      category: "Hats",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Adjustable Baseball Cap",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a5"),
    },
  ];

  return  JsonParse( mockUpdatedCart);
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
  const mockUpdatedCart: EnrichedProducts[] = [
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1"),
      size: "M",
      variantId: "price_1234567890",
      quantity: 2,
      price: 29.99,
      color: "Blue",
      category: "T-Shirts",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Classic Blue T-Shirt",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2"),
      size: "L",
      variantId: "price_2345678901",
      quantity: 1,
      price: 59.99,
      color: "Black",
      category: "Jeans",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Slim Fit Black Jeans",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3"),
      size: "S",
      variantId: "price_3456789012",
      quantity: 3,
      price: 19.99,
      color: "White",
      category: "Socks",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Cotton Ankle Socks",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a4"),
      size: "XL",
      variantId: "price_4567890123",
      quantity: 1,
      price: 89.99,
      color: "Green",
      category: "Jackets",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Waterproof Hiking Jacket",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a4"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a5"),
      size: "One Size",
      variantId: "price_5678901234",
      quantity: 2,
      price: 24.99,
      color: "Red",
      category: "Hats",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Adjustable Baseball Cap",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a5"),
    },
  ];

  return JsonParse( mockUpdatedCart);
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
  const mockUpdatedCart: EnrichedProducts[] = [
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1"),
      size: "M",
      variantId: "price_1234567890",
      quantity: 2,
      price: 29.99,
      color: "Blue",
      category: "T-Shirts",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Classic Blue T-Shirt",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2"),
      size: "L",
      variantId: "price_2345678901",
      quantity: 1,
      price: 59.99,
      color: "Black",
      category: "Jeans",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Slim Fit Black Jeans",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3"),
      size: "S",
      variantId: "price_3456789012",
      quantity: 3,
      price: 19.99,
      color: "White",
      category: "Socks",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Cotton Ankle Socks",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a4"),
      size: "XL",
      variantId: "price_4567890123",
      quantity: 1,
      price: 89.99,
      color: "Green",
      category: "Jackets",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Waterproof Hiking Jacket",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a4"),
    },
    {
      productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a5"),
      size: "One Size",
      variantId: "price_5678901234",
      quantity: 2,
      price: 24.99,
      color: "Red",
      category: "Hats",
      image: ["https://vajrafit.com/cdn/shop/files/custom_resized_b9df6f59-b5d8-4cf8-9b3a-5f399961881f.webp"],
      name: "Adjustable Baseball Cap",
      purchased: false,
      _id: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a5"),
    },
  ];

  return JsonParse( mockUpdatedCart[2]);
  // try {
  //   await connectDB();

  //   const product = await Product.findOne({ _id });
  //   return product;
  // } catch (error) {
  //   console.error("Error getting product:", error);
  // }
};
