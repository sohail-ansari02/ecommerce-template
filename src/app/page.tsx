import { getAllProducts, getAllProductsOld } from "./actions";

import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Products } from "../components/products/Products";
import { Suspense } from "react";

const Home = async () => {
  return (
    <section className="pt-14">
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
      >
        <AllProducts />
      </Suspense>
    </section>
  );
};

const AllProducts = async () => {
  const products = await getAllProductsOld();
  return <Products products={products} extraClassname="" />;
};

export default Home;
