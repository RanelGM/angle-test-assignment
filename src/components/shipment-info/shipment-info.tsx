import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkActionDispatch } from 'types/store';
import useAsync from 'hooks/useAsync';
import { loadProducts } from 'store/action';
import { getProducts } from 'store/selectors';
import withPhoneMaskInput from 'hocs/withPhoneMaskInput';
import withMapConnectedInput from 'hocs/withMapConnectedInput';
import LoadPending from 'components/load-pending/load-pending';
import LoadError from 'components/load-error/load-error';
import Map from 'components/map/map';
import { CustomSelect, Input, ProductList } from './components/components';

const WithPhoneMaskInput = withPhoneMaskInput(Input);
const WithMapConnectedInput = withMapConnectedInput(Input);

function ShipmentInfo(): JSX.Element {
  const products = useSelector(getProducts);
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

  const totalCost = products ? products.reduce((sum, product) => sum + product.price, 0) : 0;

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
        <WithMapConnectedInput name="address" type="text">Адрес</WithMapConnectedInput>
        <Map />

        <div className="shipment-form__half-wrapper">
          <Input name="name" type="text">Ваше имя</Input>
          <WithPhoneMaskInput name="phone" type="tel">Ваш Телефон</WithPhoneMaskInput>
        </div>

        <Input name="email" type="email">Ваш Email</Input>
        <CustomSelect />
        <Input name="comment" type="text">Введите комментарий</Input>

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
