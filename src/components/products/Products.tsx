import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Session, getServerSession } from "next-auth";
import { Wishlists, getTotalWishlist } from "@/app/(carts)/wishlist/action";
import { useMemo, useState } from "react";

import { EnrichedProducts } from "@/types/types.old";
import { Images } from "./Images";
import { JsonParse } from "@/libs/utils";
import { Label } from "../ui/label";
import Link from "next/link";
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
  products,
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
  const [priceRange, setPriceRange] = useState<number[]>([0, 100])
  const [sortBy, setSortBy] = useState<string>('name-asc')

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price || 0), 100), [products])

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => (product.price || 0) >= priceRange[0] && (product.price || 0) <= priceRange[1])
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return (a.price || 0) - (b.price || 0)
          case 'price-desc':
            return (b.price || 0) - (a.price || 0)
          case 'name-asc':
            return a.name.localeCompare(b.name)
          case 'name-desc':
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })
  }, [products, priceRange, sortBy])

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

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
      {" "}
      <div className="mb-8 p-4 bg-background rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="space-y-4">
          <div className="space-y-2">
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

          <div className="space-y-2">
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
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Total Products: {filteredProducts.length}
        </p>
      </div>
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
          const productLink = `/${category}/${_id}`;
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
                      <span className="line-through">{oldPrice} $</span>{" "}
                      <span>{price} $</span>
                    </>
                  ) : (
                    <>{quantity ? (price * quantity).toFixed(2) : price} $</>
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
