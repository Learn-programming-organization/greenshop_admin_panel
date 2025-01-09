import getProducts from "../services/getProducts";

const Products = () => {
  const products = getProducts();
  console.log(products);
  
  return <div>Products</div>;
};

export default Products;
