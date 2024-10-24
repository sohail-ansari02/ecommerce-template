import { EnrichedProducts, ProductDocument } from "@/types/types.old";

import { ProductsOld } from "@/components/products/Products";
import { getAllProductsOld } from "../actions";

interface SearchProps {
  searchParams: { [key: string]: string | undefined };
}

const normalizeText = (text: string): string => {
  return text
    .replace(/[-_]/g, "")
    .replace(/[^\w\s]/g, "")
    .toLowerCase();
};

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const products = await getAllProductsOld();
  let filteredProducts: EnrichedProducts[] = [];

  if (products) {
    filteredProducts = products.filter((product) =>
      normalizeText(product.name).includes(normalizeText(searchParams.q || ""))
    );
  }

  return (
    <section className="pt-14">
      {filteredProducts.length > 0 ? (
        <ProductsOld products={filteredProducts} extraClassname="" />
      ) : (
        <h3 className="text-sm text-center">
          No products found for &quot;{searchParams.q}&quot;
        </h3>
      )}
    </section>
  );
};

export default Search;
