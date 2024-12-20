import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Session, getServerSession } from "next-auth";
import { Wishlists, getTotalWishlist } from "@/app/(carts)/wishlist/action";
import { useEffect, useMemo, useState } from "react";

import { EnrichedProducts } from "@/types/types.old";
import { Images } from "./Images";
import { JsonParse } from "@/libs/utils";
import { Label } from "../ui/label";
import Link from "next/link";
import ProductFilter from "./ProductFilter";
import { Skeleton } from "../ui/skeleton";
import { Slider } from "../ui/slider";
import { authOptions } from "@/libs/auth";
import dynamic from "next/dynamic";
import { iProduct } from "@/types/types";

const WishlistButton = dynamic(() => import("../cart/WishlistButton"), {
  loading: () => <Skeleton className="w-5 h-5" />,
});

const DeleteButton = dynamic(() => import("../cart/DeleteButton"), {
  loading: () => <Skeleton className="w-5 h-5" />,
});

const ProductCartInfo = dynamic(() => import("../cart/ProductCartInfo"), {
  loading: () => <Skeleton className="w-24 h-8" />,
});

export const ProductsOld = async ({
  products,
  extraClassname = "",
}: {
  products: EnrichedProducts[];
  extraClassname: string;
}) => {
  const session: Session | null = await getServerSession(authOptions);
  const hasMissingQuantity = false; // products.some((product) => !product.quantity);
  const wishlist =
    hasMissingQuantity && session?.user ? await getTotalWishlist() : undefined;

  const gridClassname = [
    "grid gap-x-3.5 gap-y-6 sm:gap-y-9",
    extraClassname === "colums-mobile" && "grid-cols-auto-fill-110",
    extraClassname === "cart-ord-mobile" && "grid-cols-1",
    "sm:grid-cols-auto-fill-250",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={gridClassname}>
      {products.map((product, index) => {
        const {
          _id,
          category,
          quantity,
          productId,
          image,
          name,
          price,
          purchased,
        } = product;
        // const productLink = `/${category}/${quantity ? productId : _id}`;
        const productLink = `/${category}/${productId}`;
        const containerClassname = [
          "flex justify-between border border-solid border-border-primary rounded-md overflow-hidden",
          extraClassname === "cart-ord-mobile"
            ? "flex-row sm:flex-col"
            : "flex-col",
        ]
          .filter(Boolean)
          .join(" ");
        const linkClassname =
          extraClassname === "cart-ord-mobile"
            ? "w-6/12 sm:w-full hover:scale-105 transition-all"
            : "hover:scale-105 transition-all";
        const infoClassname = [
          extraClassname === "cart-ord-mobile" ? "w-6/12 sm:w-full" : "",
          "flex justify-between flex-col gap-2.5 p-3.5 bg-background-secondary z-10",
        ]
          .filter(Boolean)
          .join(" ");
        // return product.name;
        return (
          <div className={containerClassname} key={index}>
            <Link href={productLink} className={linkClassname}>
              <Images
                image={image}
                name={name}
                width={280}
                height={425}
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1154px) 33vw, (max-width: 1536px) 25vw, 20vw"
              />
            </Link>
            <div className={infoClassname}>
              <div className="flex justify-between w-full">
                <Link href={productLink} className="w-10/12">
                  <h2 className="text-sm font-semibold truncate">{name}</h2>
                </Link>
                {quantity ? (
                  purchased ? (
                    quantity > 1 && <span className="text-sm">{quantity}</span>
                  ) : (
                    "DeleteButton"
                    // <DeleteButton product={product} />
                  )
                ) : (
                  <WishlistButton
                    session={session}
                    productId={JSON.stringify(_id)}
                    wishlistString={JSON.stringify(wishlist)}
                  />
                )}
              </div>
              {!purchased && (
                <div className="text-sm">
                  {quantity ? (price * quantity).toFixed(2) : price} $
                </div>
              )}
              {/* {quantity !== undefined && <ProductCartInfo product={product} />} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export const Products = async ({
  products = [],
  extraClassname = "",
  showDeleteBtn = false,
}: {
  products: iProduct[];
  extraClassname: string;
  showDeleteBtn: boolean;
}) => {
  const session: Session | null = await getServerSession(authOptions);
  // const hasMissingQuantity = false;// products.some((product) => !product.quantity);
  // const wishlist =
  // hasMissingQuantity && session?.user ? await getTotalWishlist() : undefined;

  // const [filteredProducts,setFilteredProducts] = useState(products);
  let filteredProducts = [];
  const setFilteredProducts = (data: iProduct[]) => {
    filteredProducts = data;
  };

  const gridClassname = [
    "grid gap-x-3.5 gap-y-6 sm:gap-y-9",
    extraClassname === "colums-mobile" && "grid-cols-auto-fill-110",
    extraClassname === "cart-ord-mobile" && "grid-cols-1",
    "sm:grid-cols-auto-fill-250",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* <ProductFilter
        setFilteredProducts={setFilteredProducts}
        products={products}
      /> */}

      <div className={gridClassname}>
        {products.map((product, index) => {
          const {
            _id,
            name,
            category,
            images,
            price,
            quantity,
            onSale,
            oldPrice,
          } = product;
          // const productLink = `/${category}/${quantity ? productId : _id}`;
          const productLink =  `/${encodeURIComponent(category)}/${_id}`;
          const containerClassname = [
            "flex justify-between border border-solid border-border-primary rounded-md overflow-hidden",
            extraClassname === "cart-ord-mobile"
              ? "flex-row sm:flex-col"
              : "flex-col",
          ]
            .filter(Boolean)
            .join(" ");
          const linkClassname =
            extraClassname === "cart-ord-mobile"
              ? "w-6/12 sm:w-full hover:scale-105 transition-all"
              : "hover:scale-105 transition-all";
          const infoClassname = [
            extraClassname === "cart-ord-mobile" ? "w-6/12 sm:w-full" : "",
            "flex justify-between flex-col gap-2.5 p-3.5 bg-background-secondary z-10",
          ]
            .filter(Boolean)
            .join(" ");
          // return product.name;
          return (
            <div className={containerClassname} key={index}>
              <Link href={productLink} className={linkClassname}>
                <Images
                  image={[images[0]]}
                  name={name}
                  width={280}
                  height={425}
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1154px) 33vw, (max-width: 1536px) 25vw, 20vw"
                />
              </Link>
              <div className={infoClassname}>
                <div className="flex justify-between w-full">
                  <Link href={productLink} className="w-10/12">
                    <h2 className="text-sm font-semibold truncate">{name}</h2>
                  </Link>
                  {quantity > 0 && showDeleteBtn ? (
                    <DeleteButton product={product} />
                  ) : (
                    ""
                    // <span className="text-sm">{quantity}</span>
                  )}
                </div>

                <div className="text-sm">
                  {onSale ? (
                    <>
                      <span className="line-through">{oldPrice} ₹</span>{" "}
                      <span>{price} ₹</span>
                    </>
                  ) : (
                    <>{quantity ? (price * quantity).toFixed(2) : price} ₹</>
                  )}
                </div>

                {quantity > 0 && <ProductCartInfo product={product} />}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
