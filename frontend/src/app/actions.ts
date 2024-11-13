"use server";

import { } from "@/libs/utils";

import { EnrichedProducts, ProductDocument } from "@/types/types.old";

import { Product } from "@/models/Products";
import { Schema } from "mongoose";
import client from "@/libs/sanityClient";
import { connectDB } from "@/libs/mongodb";
import { iProduct } from "@/types/types";

export const getAllProducts = async () => {
  // Mock data for updatedCart
  // const mockProductList: iProduct[] = [
  //   {
  //     _id: 1,
  //     name: "Steel Mace Gada",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 49.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Durable steel mace designed for strength and endurance training. Perfect for functional fitness.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 2,
  //     name: "Steel Mace Gada",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 64.99,
  //     onSale: true,
  //     oldPrice: 74.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Heavy-duty steel mace for combat athletes and strength enthusiasts. Great for improving grip strength.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 3,
  //     name: "Wooden Gada",
  //     category: "Wooden Gada",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 34.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Traditional wooden gada designed for muscle building and core strengthening exercises.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 4,
  //     name: "Steel Mace Gada",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 84.99,
  //     onSale: true,
  //     oldPrice: 94.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "High-quality steel mace designed for advanced strength training. Ideal for building full-body power.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 5,
  //     name: "Steel Mace Gada",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 119.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Premium steel mace with enhanced durability, designed for intense training sessions.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 6,
  //     name: "Wooden Gada",
  //     category: "Wooden Gada",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 44.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Classic wooden gada for traditional strength training. Great for developing grip and shoulder strength.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 7,
  //     name: "Barbell",
  //     category: "Barbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 99.99,
  //     onSale: true,
  //     oldPrice: 120.00,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "High-quality steel barbell for weight training. Excellent for building overall body strength.",
  //     sizes: ["Standard", "Olympic"],
  //     type: 'barbell',
  //   },
  //   {
  //     _id: 8,
  //     name: "Combo Barbell Set",
  //     category: "Barbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 179.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Includes barbell and two 25kg weight plates. Everything you need for an intense workout.",
  //     sizes: ["Standard"],
  //     type: 'combo',
  //   },
  //   {
  //     _id: 9,
  //     name: "Dumbbell Set",
  //     category: "Dumbbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 89.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Adjustable dumbbell set for home workouts. Perfect for building arm and shoulder strength.",
  //     sizes: ["Adjustable"],
  //     type: 'dandpaat',
  //   },
  //   {
  //     _id: 10,
  //     name: "Wooden Dandpaat",
  //     category: "Dandpaat",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 59.99,
  //     onSale: true,
  //     oldPrice: 79.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Traditional wooden dandpaat for strength training. Designed to improve grip strength and endurance.",
  //     sizes: ["Medium", "Large"],
  //     type: 'dandpaat',
  //   },
  //   {
  //     _id: 11,
  //     name: "Mudgar",
  //     category: "Mudgar",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 45.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Traditional tool used for shoulder and core strengthening exercises. Made from premium wood.",
  //     sizes: ["Standard"],
  //     type: 'mudgar',
  //   },
  //   {
  //     _id: 12,
  //     name: "Steel Mace",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 69.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Heavy-duty steel mace with a comfortable handle designed for functional fitness and conditioning.",
  //     sizes: ["Standard", "Large"],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 13,
  //     name: "Iron Barbell Set",
  //     category: "Barbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 199.99,
  //     onSale: true,
  //     oldPrice: 249.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Complete barbell set including a 15kg barbell and 50kg worth of weights, ideal for heavy lifting.",
  //     sizes: ["Standard"],
  //     type: 'barbell',
  //   },
  //   {
  //     _id: 14,
  //     name: "Wooden Mace",
  //     category: "Wooden Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 59.99,
  //     onSale: true,
  //     oldPrice: 69.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Traditional wooden mace designed for building strength and endurance in a variety of exercises.",
  //     sizes: ["Standard"],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 15,
  //     name: "Power Mudgar",
  //     category: "Mudgar",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 55.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "High-quality mudgar made for advanced strength training. Ideal for building shoulder and upper back muscles.",
  //     sizes: ["Large"],
  //     type: 'mudgar',
  //   },
  //   {
  //     _id: 16,
  //     name: "Classic Dumbbell",
  //     category: "Dumbbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 49.99,
  //     onSale: true,
  //     oldPrice: 59.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Classic-style dumbbells made from cast iron, perfect for home workouts and strengthening arms.",
  //     sizes: ["5kg", "10kg", "15kg"],
  //     type: 'dandpaat',
  //   },
  //   {
  //     _id: 17,
  //     name: "Combination Barbell Kit",
  //     category: "Barbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 159.99,
  //     onSale: true,
  //     oldPrice: 189.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Includes a 20kg barbell and set of interchangeable plates. Ideal for a versatile workout.",
  //     sizes: ["Olympic"],
  //     type: 'combo',
  //   },
  //   {
  //     _id: 18,
  //     name: "Wooden Strength Mace",
  //     category: "Wooden Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 74.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Classic wooden mace designed to improve grip and endurance while enhancing shoulder strength.",
  //     sizes: ["Medium"],
  //     type: 'gada',
  //   }
  // ];
  // return mockProductList;
  const query = `
   *[_type == "product"]{
      _id,
      name,
      description,
      price,
      onSale,
      oldPrice,
      "images": images[].asset->url, // Fetch URLs for images
      "category": category->title, // Fetch the category title
      "type": type->title,         // Fetch the type title
      sizes,
      weight,
      height
    }
    `;
  const products = await client.fetch(query);
  // console.log('pppp',products[0].height)
  return products as iProduct[];
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

  const products = await getAllProducts()
  const shuffleArray = (array: iProduct[]) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0,8);
  };

  return shuffleArray( products) ;
  // const mockProductList: iProduct[] = [
  //   {
  //     _id: 1,
  //     name: "Steel Mace Gada",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 49.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Durable steel mace designed for strength and endurance training. Perfect for functional fitness.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 2,
  //     name: "Steel Mace Gada",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 64.99,
  //     onSale: true,
  //     oldPrice: 74.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Heavy-duty steel mace for combat athletes and strength enthusiasts. Great for improving grip strength.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 3,
  //     name: "Wooden Gada",
  //     category: "Wooden Gada",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 34.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Traditional wooden gada designed for muscle building and core strengthening exercises.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 4,
  //     name: "Steel Mace Gada",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 84.99,
  //     onSale: true,
  //     oldPrice: 94.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "High-quality steel mace designed for advanced strength training. Ideal for building full-body power.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 5,
  //     name: "Steel Mace Gada",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 119.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Premium steel mace with enhanced durability, designed for intense training sessions.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 6,
  //     name: "Wooden Gada",
  //     category: "Wooden Gada",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 44.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Classic wooden gada for traditional strength training. Great for developing grip and shoulder strength.",
  //     sizes: [],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 7,
  //     name: "Barbell",
  //     category: "Barbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 99.99,
  //     onSale: true,
  //     oldPrice: 120.00,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "High-quality steel barbell for weight training. Excellent for building overall body strength.",
  //     sizes: ["Standard", "Olympic"],
  //     type: 'barbell',
  //   },
  //   {
  //     _id: 8,
  //     name: "Combo Barbell Set",
  //     category: "Barbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 179.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Includes barbell and two 25kg weight plates. Everything you need for an intense workout.",
  //     sizes: ["Standard"],
  //     type: 'combo',
  //   },
  //   {
  //     _id: 9,
  //     name: "Dumbbell Set",
  //     category: "Dumbbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 89.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Adjustable dumbbell set for home workouts. Perfect for building arm and shoulder strength.",
  //     sizes: ["Adjustable"],
  //     type: 'dandpaat',
  //   },
  //   {
  //     _id: 10,
  //     name: "Wooden Dandpaat",
  //     category: "Dandpaat",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 59.99,
  //     onSale: true,
  //     oldPrice: 79.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Traditional wooden dandpaat for strength training. Designed to improve grip strength and endurance.",
  //     sizes: ["Medium", "Large"],
  //     type: 'dandpaat',
  //   },
  //   {
  //     _id: 11,
  //     name: "Mudgar",
  //     category: "Mudgar",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 45.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Traditional tool used for shoulder and core strengthening exercises. Made from premium wood.",
  //     sizes: ["Standard"],
  //     type: 'mudgar',
  //   },
  //   {
  //     _id: 12,
  //     name: "Steel Mace",
  //     category: "Steel Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 69.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Heavy-duty steel mace with a comfortable handle designed for functional fitness and conditioning.",
  //     sizes: ["Standard", "Large"],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 13,
  //     name: "Iron Barbell Set",
  //     category: "Barbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 199.99,
  //     onSale: true,
  //     oldPrice: 249.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Complete barbell set including a 15kg barbell and 50kg worth of weights, ideal for heavy lifting.",
  //     sizes: ["Standard"],
  //     type: 'barbell',
  //   },
  //   {
  //     _id: 14,
  //     name: "Wooden Mace",
  //     category: "Wooden Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 59.99,
  //     onSale: true,
  //     oldPrice: 69.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Traditional wooden mace designed for building strength and endurance in a variety of exercises.",
  //     sizes: ["Standard"],
  //     type: 'gada',
  //   },
  //   {
  //     _id: 15,
  //     name: "Power Mudgar",
  //     category: "Mudgar",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 55.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "High-quality mudgar made for advanced strength training. Ideal for building shoulder and upper back muscles.",
  //     sizes: ["Large"],
  //     type: 'mudgar',
  //   },
  //   {
  //     _id: 16,
  //     name: "Classic Dumbbell",
  //     category: "Dumbbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 49.99,
  //     onSale: true,
  //     oldPrice: 59.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Classic-style dumbbells made from cast iron, perfect for home workouts and strengthening arms.",
  //     sizes: ["5kg", "10kg", "15kg"],
  //     type: 'dandpaat',
  //   },
  //   {
  //     _id: 17,
  //     name: "Combination Barbell Kit",
  //     category: "Barbells",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 159.99,
  //     onSale: true,
  //     oldPrice: 189.99,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Includes a 20kg barbell and set of interchangeable plates. Ideal for a versatile workout.",
  //     sizes: ["Olympic"],
  //     type: 'combo',
  //   },
  //   {
  //     _id: 18,
  //     name: "Wooden Strength Mace",
  //     category: "Wooden Mace",
  //     images: ["/gada.webp", "/gada.webp"],
  //     price: 74.99,
  //     onSale: false,
  //     quantity: 0,
  //     addedToCart: false,
  //     description: "Classic wooden mace designed to improve grip and endurance while enhancing shoulder strength.",
  //     sizes: ["Medium"],
  //     type: 'gada',
  //   }
  // ];
  // return mockProductList;

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
  // const mockUpdatedCart: iProduct =   {
  //   _id: 17,
  //   name: "Combination Barbell Kit",
  //   category: "Barbells",
  //   images: ["/gada.webp", "/gada.webp"],
  //   price: 159.99,
  //   onSale: true,
  //   oldPrice: 189.99,
  //   quantity: 0,
  //   addedToCart: false,
  //   description: "Includes a 20kg barbell and set of interchangeable plates. Ideal for a versatile workout.",
  //   sizes: ["Olympic"],
  //   type: 'combo',
  // };

  // return mockUpdatedCart;
  const query = `
    *[_type == "product" && _id == "${_id}"][0]{
      _id,
      name,
      description,
      price,
      oldPrice,
      onSale,
      "images": images[].asset->url, // Fetch URLs for images
      "category": category->title,    // Fetch category title
      sizes,
      weight,
      height,
    }
  `
  const product = await client.fetch(query, { _id }) as iProduct;
  console.log("product", product.name);

  return product;
  // const mockUpdatedCart: ProductDocument | any = {
  //   name: "Yoga Mat",
  //   description:
  //     "High-density foam yoga mat for comfort and support during your workouts. Non-slip surface.",
  //   price: 29.99,
  //   category: "Accessories",
  //   sizes: ["72 x 24 inches"],
  //   image: ["https://example.com/images/yogamat.jpg"],
  //   variants: [
  //     {
  //       priceId: "variant-001",
  //       color: "Black",
  //       images: ["/gada.webp", "/gada.webp"],
  //     },
  //   ],
  //   quantity: 100,
  //   productId: "605c72ef3b64b4e0f8e6d4c1",
  //   purchased: false,
  // };

  // return mockUpdatedCart;
  // try {
  //   await connectDB();

  //   const product = await Product.findOne({ _id });
  //   return product;
  // } catch (error) {
  //   console.error("Error getting product:", error);
  // }
};
