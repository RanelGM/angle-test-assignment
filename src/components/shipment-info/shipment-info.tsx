import getMockData from "utils/mock-data";
import { CustomSelect, ProductList } from "./components/components";

const products = getMockData();

function ShipmentInfo(): JSX.Element {
  const totalCost = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <section className="shipment-info">
      <div className="shipment-info__login">
        <p className="shipment-info__text">Есть аккаунт?</p>
        <a className="shipment-info__link" href="#work-in-progress">
          Войти
        </a>
      </div>

      <form className="shipment-info__form shipment-form">
        <label htmlFor="address">
          <span>Адрес</span>
          <input id="address" className="shipment-form__input" type="text" />
        </label>

        <label htmlFor="name">
          <span className="visually-hidden">Ваше Имя</span>
          <input
            id="name"
            className="shipment-form__input"
            type="text"
            placeholder="Ваше Имя"
          />
        </label>

        <label htmlFor="phone">
          <span className="visually-hidden">Ваш Телефон</span>
          <input
            id="phone"
            className="shipment-form__input"
            type="tel"
            placeholder="Ваш Телефон"
          />
        </label>

        <label htmlFor="email">
          <span className="visually-hidden">Ваш Email</span>
          <input
            id="email"
            className="shipment-form__input"
            type="email"
            placeholder="Ваш Email"
          />
        </label>

        <CustomSelect />

        <label htmlFor="comment">
          <span className="visually-hidden">Ваш Email</span>
          <input
            id="comment"
            className="shipment-form__input"
            type="comment"
            placeholder="Введите комментарий"
          />
        </label>

        <ProductList products={products} />

        <div className="shipment-info__total">
          <p>Итог:</p>
          <p>{totalCost} руб.</p>
        </div>

        <button className="shipment-info__button-submit" type="submit">
          Купить
        </button>
      </form>
    </section>
  );
}

export default ShipmentInfo;
