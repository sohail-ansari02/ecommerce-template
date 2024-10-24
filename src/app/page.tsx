import { Products, ProductsOld } from "../components/products/Products";
import { getAllProducts, getAllProductsOld } from "./actions";

import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
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
  const productsOld = await getAllProductsOld();
  const products = await getAllProducts();
  return <Products products={products} extraClassname="" />;
  // return <ProductsOld products={productsOld} extraClassname="" />;
};

export default Home;
