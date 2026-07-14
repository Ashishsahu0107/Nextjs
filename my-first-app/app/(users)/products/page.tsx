import ProductList from "./ProductList";

const products = async ({ searchParams }) => {
    const searchParam = await searchParams;

    const category = searchParam?.category || "all";
    const sort = searchParam?.sort || "default";
    const page = searchParam?.page || 1;

    return (
        <div>
            {/* <ProductList/> */}
            Showing {category} products, sorted by {sort}, page {page}
        </div>
    );
};

export default products;