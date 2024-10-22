"use server";

import mongoose, { Schema } from "mongoose";

import { EnrichedProducts } from "@/types/types";
import { JsonParse } from "@/libs/utils";
import { Product } from "@/models/Products";
import { Session } from "next-auth";
import { authOptions } from "@/libs/auth";
import { connectDB } from "@/libs/mongodb";
import { getServerSession } from "next-auth/next";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export type Wishlists = {
  userId: string;
  items: Array<{
    productId: Schema.Types.ObjectId;
  }>;
};

export async function addItem(productId: Schema.Types.ObjectId) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user._id) {
    console.error(`User Id not found.`);
    return;
  }

  const userId = session.user._id;
  let wishlists: Wishlists | null = await kv.get(`wishlist-${userId}`);

  let myWishlists = {} as Wishlists;

  if (!wishlists || !wishlists.items) {
    myWishlists = {
      userId: userId,
      items: [
        {
          productId: productId,
        },
      ],
    };
  } else {
    let itemFound = false;

    myWishlists.items = wishlists.items.map((item) => {
      if (item.productId === productId) {
        itemFound = true;
      }
      return item;
    }) as Wishlists["items"];

    if (!itemFound) {
      myWishlists.items.push({
        productId: productId,
      });
    }
  }

  await kv.set(`wishlist-${userId}`, myWishlists);
  revalidatePath("/wishlist");
}

export async function getItems(userId: string) {
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

  return JsonParse(mockUpdatedCart);

  // connectDB();

  // if (!userId) {
  //   console.error(`User Id not found.`);
  //   return null;
  // }

  // const wishlist: Wishlists | null = await kv.get(`wishlist-${userId}`);

  // if (wishlist === null) {
  //   console.error("wishlist not found.");
  //   return null;
  // }

  // const updatedWishlist = [];
  // for (const wishlistItem of wishlist.items) {
  //   try {
  //     if (wishlistItem.productId) {
  //       const matchingProduct = await Product.findById(wishlistItem.productId);

  //       if (!matchingProduct) {
  //         console.error(
  //           `Product not found for productId: ${wishlistItem.productId}`,
  //         );
  //         continue;
  //       } else {
  //         updatedWishlist.push(matchingProduct);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error getting product details:", error);
  //   }
  // }

  // const filteredWishlist = updatedWishlist.filter((item) => item !== null);

  // return filteredWishlist;
}

export async function getTotalWishlist() {
  // Mock data for wishlists
  const mockWishlists: Wishlists = {
    userId: "mockUserId",
    items: [
      { productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a1") },
      { productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a2") },
      { productId: new Schema.Types.ObjectId("5f8d0f3e1c9d440000a1e1a3") },
    ],
  };

  return JsonParse(mockWishlists);
  // const session: Session | null = await getServerSession(authOptions);
  // const wishlists: Wishlists | null = await kv.get(
  //   `wishlist-${session?.user._id}`,
  // );

  // if (wishlists === null) {
  //   return undefined;
  // }

  // return wishlists;
}

export async function delItem(productId: Schema.Types.ObjectId) {
  const session: Session | null = await getServerSession(authOptions);
  const userId = session?.user._id;

  if (!userId) {
    console.error("User not found.");
    return;
  }

  let wishlists: Wishlists | null = await kv.get(`wishlist-${userId}`);

  if (wishlists && wishlists.items) {
    const updatedWishlist = {
      userId: userId,
      items: wishlists.items.filter((item) => !(item.productId === productId)),
    };

    await kv.set(`wishlist-${userId}`, updatedWishlist);
    revalidatePath("/wishlist");
  }
}
