import { Products, ProductsOld } from "../components/products/Products";
import { Suspense, useEffect } from "react";
import { getAllProducts, getAllProductsOld } from "./actions";

import HeroEmblaCarousel from "@/components/home/heroCarousle";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const IMAGE_SLIDES = [
  {
    src: "/gada.webp",
    alt: "test",
  },
];
const Home = async () => {
  redirect('/search'); // Redirects to the /search page immediately

  return "";
  return (
    <section className="pt-14">
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
      >
        {/* <HeroEmblaCarousel
          slides={IMAGE_SLIDES}
          options={{ loop: true, align: "center" }}
        /> */}
        <AllProducts />
      </Suspense>
    </section>
  );
};

const AllProducts = async () => {
  // const productsOld = await getAllProductsOld();
  const products = await getAllProducts();
  return (
    // extraClassname={"colums-mobile"} adds more columns in mobile view
    <Products products={products} showDeleteBtn={false} extraClassname={"colums-mobile"} />
  );
  // return <ProductsOld products={productsOld} extraClassname="" />;
};

export default Home;
