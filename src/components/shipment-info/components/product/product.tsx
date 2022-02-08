import { ProductType } from "types/product";

type ProductProps = {
  product: ProductType;
};

function Product({ product }: ProductProps): JSX.Element {
  const { amount, name, price, type } = product;

  return (
    <div className="product">
      <h3 className="product__heading">{name}</h3>
      <p className="product__price">{price} руб.</p>
      <p className="product__description">{type}</p>

      <div className="product__counter-wrapper counter">
        <button className="counter__button-decrease" type="button">
          <span className="visually-hidden">Уменьшить</span>
        </button>

        <span className="counter__amount">{amount}</span>

        <button className="counter__button-increase" type="button">
          <span className="visually-hidden">Увеличить</span>
        </button>
      </div>

      <button className="product__button-delete" type="button">
        Удалить
      </button>
    </div>
  );
}

export default Product;
