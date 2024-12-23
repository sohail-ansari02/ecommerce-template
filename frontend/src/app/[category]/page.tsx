import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { ProductsOld } from "@/components/products/Products";
import { Suspense } from "react";
import { getCategoryProducts } from "../actions";

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedCategory = capitalizeFirstLetter(params.category);

  return {
    title: `${capitalizedCategory} | Mircle Fitness`,
    description: `${capitalizedCategory} category at e-commerce template made by Marcos Cámara`,
  };
}

const CategoryPage = async ({ params }: Props) => {
  return (
    <section className="pt-14">
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={6} />}
      >
        <CategoryProducts category={params.category} />
      </Suspense>
    </section>
  );
};

const CategoryProducts = async ({ category }: { category: string }) => {
  const products = await getCategoryProducts(category);

  return <ProductsOld products={products} extraClassname="" />;
};

export default CategoryPage;
