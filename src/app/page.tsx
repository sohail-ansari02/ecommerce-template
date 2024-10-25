import { Products, ProductsOld } from "../components/products/Products";
import { getAllProducts, getAllProductsOld } from "./actions";

import HeroEmblaCarousel from "@/components/home/heroCarousle";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";

const IMAGE_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    alt: "Forest landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Seascape",
  },
  {
    src: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    alt: "Desert landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    alt: "Snowy mountain landscape",
  },
];
const Home = async () => {
  return (
    <section className="pt-14">
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
      >
        <HeroEmblaCarousel
          slides={IMAGE_SLIDES}
          options={{ loop: true, align: "center" }}
        />
        <AllProducts />
      </Suspense>
    </section>
  );
};

const AllProducts = async () => {
  // const productsOld = await getAllProductsOld();
  const products = await getAllProducts();
  return (
    <Products products={products} extraClassname="" showDeleteBtn={false} />
  );
  // return <ProductsOld products={productsOld} extraClassname="" />;
};

export default Home;
