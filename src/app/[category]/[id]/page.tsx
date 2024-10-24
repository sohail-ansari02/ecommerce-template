import { getProduct, getRandomProducts } from "@/app/actions";

import { ProductDocument } from "@/types/types.old";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Products } from "@/components/products/Products";
import { Session } from "next-auth";
import { SingleProduct } from "@/components/products/SingleProduct";
import SingleProductSkeleton from "@/components/skeletons/SingleProductSkeleton";
import { Suspense } from "react";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";

type Props = {
  params: {
    id: string;
  };
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export async function generateMetadata({ params }: Props) {
  const product: ProductDocument = await getProduct(params.id);
  const capitalizedName = capitalizeFirstLetter(product.name);

  return {
    title: `${capitalizedName} | Fitness Ecommerce`,
    description: product.description,
  };
}

const ProductPage = async ({ params }: Props) => (
  <section className="pt-14">
    <Suspense
      fallback={
        <div>
          <SingleProductSkeleton />
          <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
            YOU MIGHT ALSO LIKE...
          </h2>
          <ProductSkeleton
            extraClassname={"colums-mobile"}
            numberProducts={6}
          />
        </div>
      }
    >
      <AllProducts id={params.id} />
    </Suspense>
  </section>
);

const AllProducts = async ({ id }: { id: string }) => {
  const session: Session | null = await getServerSession(authOptions);
  const product: ProductDocument = await getProduct(id);
  const randomProducts = await getRandomProducts(id);
  const productJSON = JSON.stringify(product);

  return (
    <>
      <SingleProduct product={productJSON} session={session} />

      <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
        YOU MIGHT ALSO LIKE...
      </h2>

      <Products products={randomProducts} extraClassname={"colums-mobile"} />
    </>
  );
};

export default ProductPage;
