import { ProductType } from "types/product";
import { Product } from "../components";

type ProductListProps = {
  products: ProductType[];
};

function ProductList({ products }: ProductListProps): JSX.Element {
  return (
    <section className="product-list">
      <h2 className="product-list__heading">Выбранные товары:</h2>

      <ul className="product-list__list">
        {products.map((product) => (
          <li className="product-list__item" key={product.id}>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
