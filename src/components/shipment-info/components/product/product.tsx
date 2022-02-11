import { ProductType } from "types/product";
import { MIN_PRODUCT_AMOUNT, MAX_PRODUCT_AMOUNT } from "utils/const";

type ProductProps = {
  product: ProductType;
};

function Product({ product }: ProductProps): JSX.Element {
  const { amount, name, img, price, type } = product;

  const handleAmountChange = () => {};

  return (
    <li className="product">
      <img
        className="product__image"
        src={img}
        alt={`Изображение ${name}`}
        width="150"
        height="150"
      />

      <div className="product__wrapper">
        <div className="product__info-wrapper">
          <h3 className="product__heading">{name}</h3>
          <p className="product__price">{price} руб.</p>
          <p className="product__description">{type}</p>
        </div>

        <div className="product__counter-wrapper counter">
          <button className="counter__button-decrease" type="button">
            <span className="visually-hidden">Уменьшить</span>
          </button>

          <input
            className="counter__amount"
            type="number"
            min={MIN_PRODUCT_AMOUNT}
            max={MAX_PRODUCT_AMOUNT}
            aria-label="Изменить количество"
            value={amount}
            onChange={handleAmountChange}
          />

          <button className="counter__button-increase" type="button">
            <span className="visually-hidden">Увеличить</span>
          </button>
        </div>

        <button className="product__button-delete" type="button">
          Удалить
        </button>
      </div>
    </li>
  );
}

export default Product;
