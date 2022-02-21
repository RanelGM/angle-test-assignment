import { ChangeEvent, useState } from 'react';
import { ProductType } from 'types/product';
import { MIN_PRODUCT_AMOUNT, MAX_PRODUCT_AMOUNT } from 'utils/const';

type ProductProps = {
  product: ProductType,
  onProductUpdate: (amount: number, product: ProductType) => void,
  onProductDelete: (product: ProductType) => void,
};

function Product({ product, onProductUpdate, onProductDelete }: ProductProps): JSX.Element {
  const { amount, name, img, price, type } = product;
  const [currentCount, setCurrentCount] = useState(product.amount);

  const totalPice = price * amount;

  const handleAmountChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const isValueOutOfSymbol = input.value.length > MAX_PRODUCT_AMOUNT.toString().length;

    if (isValueOutOfSymbol) {
      return;
    }

    setCurrentCount(+input.value);
  };

  const handleAmountBlur = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const value = +input.value < MIN_PRODUCT_AMOUNT ? MIN_PRODUCT_AMOUNT : +input.value;

    setCurrentCount(value);
    onProductUpdate(value, product);
  };

  const handleDecrementBtnClick = () => {
    if (currentCount === MIN_PRODUCT_AMOUNT) {
      return;
    }

    const value = currentCount - 1;

    setCurrentCount(value);
    onProductUpdate(value, product);
  };

  const handleIncrementBtnClick = () => {
    if (currentCount === MAX_PRODUCT_AMOUNT) {
      return;
    }

    const value = currentCount + 1;

    setCurrentCount(value);
    onProductUpdate(value, product);
  };

  const handleProductDelete = () => {
    onProductDelete(product);
  };

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
          <p className="product__price">
            {totalPice}
            {' '}
            руб.
          </p>
          <p className="product__description">{type}</p>
        </div>

        <div className="product__counter-wrapper counter">
          <button className="counter__button-decrease" type="button" onClick={handleDecrementBtnClick}>
            <span className="visually-hidden">Уменьшить</span>
          </button>

          <input
            className="counter__amount"
            type="number"
            min={MIN_PRODUCT_AMOUNT}
            max={MAX_PRODUCT_AMOUNT}
            aria-label="Изменить количество"
            value={currentCount}
            onChange={handleAmountChange}
            onBlur={handleAmountBlur}
          />

          <button className="counter__button-increase" type="button" onClick={handleIncrementBtnClick}>
            <span className="visually-hidden">Увеличить</span>
          </button>
        </div>

        <button className="product__button-delete" type="button" onClick={handleProductDelete}>
          Удалить
        </button>
      </div>
    </li>
  );
}

export default Product;
