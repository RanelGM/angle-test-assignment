import { ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkActionDispatch } from 'types/store';
import useAsync from 'hooks/useAsync';
import { loadProducts, setAddress, setIsMarkUpdateRequired } from 'store/action';
import { getAddress, getProducts } from 'store/selectors';
import LoadPending from 'components/load-pending/load-pending';
import LoadError from 'components/load-error/load-error';
import Map from 'components/map/map';
import { CustomSelect, PhoneInput, ProductList } from './components/components';

function ShipmentInfo(): JSX.Element {
  const products = useSelector(getProducts);
  const address = useSelector(getAddress);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<ThunkActionDispatch>();

  const fetchProducts = async () => {
    await dispatch(loadProducts());
  };

  const [executeLoadProducts, loadStatus] = useAsync(fetchProducts);

  useEffect(() => {
    if (loadStatus.isLoading || loadStatus.isSuccess || loadStatus.isError || products) {
      return;
    }

    // Логика catch уже зашита в кастомный хук
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    executeLoadProducts();
  });

  useEffect(() => {
    if (!address || !addressRef.current || address === addressRef.current.value) {
      return;
    }

    addressRef.current.value = address;
    addressRef.current.parentElement?.classList.add('shipment-form__label--filled');
  });

  const totalCost = products ? products.reduce((sum, product) => sum + product.price, 0) : 0;

  const handleInputFocus = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const parent = input.parentElement;

    if (!parent) {
      return;
    }

    parent.classList.add('shipment-form__label--focused');
  };

  const handleInputBlur = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const parent = input.parentElement;
    const value = input.value.trim();
    const isInputFilled = Boolean(value);
    const isAddressInput = input === addressRef.current;

    if (!parent) {
      return;
    }

    if (isInputFilled) {
      parent.classList.add('shipment-form__label--filled');
    } else {
      parent.classList.remove('shipment-form__label--filled');
    }

    parent.classList.remove('shipment-form__label--focused');

    if (isAddressInput && isInputFilled) {
      dispatch(setAddress(value));
      dispatch(setIsMarkUpdateRequired(true));
    }
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

      <form
        className="shipment-info__form shipment-form"
      >
        <label className="shipment-form__label " htmlFor="address">
          <span className="shipment-form__label-text">Адрес</span>
          <input
            id="address"
            name="address"
            className="shipment-form__input"
            autoComplete="off"
            // required
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={addressRef}
          />
        </label>

        <Map />

        <div className="shipment-form__half-wrapper">
          <label className="shipment-form__label" htmlFor="name">
            <span className="shipment-form__label-text">Ваше Имя</span>
            <input
              id="name"
              className="shipment-form__input"
              type="text"
              autoComplete="off"
              // required
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </label>

          <PhoneInput />
        </div>

        <label className="shipment-form__label" htmlFor="email">
          <span className="shipment-form__label-text">Ваш Email</span>
          <input
            id="email"
            className="shipment-form__input"
            type="email"
            autoComplete="off"
            // required
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

        {loadStatus.isError && (
          <LoadError message="Возникла ошибка при загрузке списка товаров. Попробуйте позднее" />
        )}

        {loadStatus.isLoading && !products && (
          <LoadPending />
        )}

        {products && (
          <>
            <ProductList products={products} />

            <div className="shipment-form__total">
              <p className="shipment-form__total-text">Итог:</p>
              <p className="shipment-form__total-text">
                {totalCost}
                {' '}
                руб.
              </p>
            </div>

            <button className="shipment-form__button-submit" type="submit">
              Купить
            </button>
          </>
        )}

      </form>
    </section>
  );
}

export default ShipmentInfo;
