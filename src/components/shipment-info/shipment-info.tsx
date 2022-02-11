import { ChangeEvent } from "react";

import { getPixelStaticMockData } from "utils/mock-data";
import { CustomSelect, ProductList } from "./components/components";

const products = getPixelStaticMockData();

function ShipmentInfo(): JSX.Element {
  const totalCost = products.reduce((sum, product) => sum + product.price, 0);

  const handleInputFocus = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputElement = evt.target;
    const labelElement = inputElement.parentElement;

    if (!labelElement) {
      return;
    }

    labelElement.classList.add("shipment-form__label--focused");
  };

  const handleInputBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputElement = evt.target;
    const labelElement = inputElement.parentElement;
    const isInputFilled = Boolean(inputElement.value.trim());

    if (!labelElement) {
      return;
    }

    if (isInputFilled) {
      labelElement.classList.add("shipment-form__label--filled");
    } else {
      labelElement.classList.remove("shipment-form__label--filled");
    }

    labelElement.classList.remove("shipment-form__label--focused");
  };

  return (
    <section className="shipment-info">
      <h1 className="main-heading">Корзина</h1>

      <div className="shipment-info__login">
        <p className="shipment-info__text">Есть аккаунт?</p>
        <a className="shipment-info__link" href="#work-in-progress">
          Войти
        </a>
      </div>
      <form className="shipment-info__form shipment-form">
        <label className="shipment-form__label " htmlFor="address">
          <span className="shipment-form__label-text">Адрес</span>
          <input
            id="address"
            className="shipment-form__input"
            type="text"
            autoComplete="off"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </label>

        <div className="shipment-info__map">
          <img
            className="shipment-info__map-image"
            src="assets/img/map.png"
            alt="Карта с выбранным адресом доставки"
            width={555}
            height={700}
          />
        </div>

        <div className="shipment-form__half-wrapper">
          <label className="shipment-form__label" htmlFor="name">
            <span className="shipment-form__label-text">Ваше Имя</span>
            <input
              id="name"
              className="shipment-form__input"
              type="text"
              autoComplete="off"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </label>

          <label className="shipment-form__label" htmlFor="phone">
            <span className="shipment-form__label-text">Ваш Телефон</span>
            <input
              id="phone"
              className="shipment-form__input"
              type="tel"
              autoComplete="off"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </label>
        </div>

        <label className="shipment-form__label" htmlFor="email">
          <span className="shipment-form__label-text">Ваш Email</span>
          <input
            id="email"
            className="shipment-form__input"
            type="email"
            autoComplete="off"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </label>

        <CustomSelect />

        <label className="shipment-form__label" htmlFor="comment">
          <span className="shipment-form__label-text">Введите комментарий</span>
          <input
            id="comment"
            className="shipment-form__input"
            type="comment"
            autoComplete="off"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </label>

        <ProductList products={products} />

        <div className="shipment-form__total">
          <p className="shipment-form__total-text">Итог:</p>
          <p className="shipment-form__total-text">{totalCost} руб.</p>
        </div>

        <button className="shipment-form__button-submit" type="submit">
          Купить
        </button>
      </form>
    </section>
  );
}

export default ShipmentInfo;
