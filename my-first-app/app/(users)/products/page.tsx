import ProductList from "./ProductList";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    page?: string | number;
  }>;
}

const products = async ({ searchParams }: ProductsPageProps) => {
  const searchParam = await searchParams;

  const category = searchParam?.category || "all";
  const sort = searchParam?.sort || "default";
  const page = Number(searchParam?.page) || 1;

  return (
    <div>
      {/* <ProductList/> */}
      Showing {category} products, sorted by {sort}, page {page}
    </div>
  );
};

export default products;