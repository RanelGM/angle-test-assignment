import LoadError from 'components/load-error/load-error';
import LoadPending from 'components/load-pending/load-pending';
import useAsync from 'hooks/useAsync';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from 'store/action';
import { getProducts } from 'store/selectors';
import { ThunkActionDispatch } from 'types/store';
import { Product } from '../components';

function ProductList(): JSX.Element {
  const products = useSelector(getProducts);
  const dispatch = useDispatch<ThunkActionDispatch>();
  const totalCost = products ? products.reduce((sum, product) => sum + product.price, 0) : 0;

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

  if (loadStatus.isError) {
    return <LoadError message="Возникла ошибка при загрузке списка товаров. Попробуйте позднее" />;
  }

  if (loadStatus.isLoading || !products) {
    return <LoadPending />;
  }

  return (
    <section className="product-list">
      <h2 className="product-list__heading">Выбранные товары:</h2>

      <ul className="product-list__list">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>

      <div className="product-list__total">
        <p className="product-list__total-text">Итог:</p>
        <p className="product-list__total-text">
          {totalCost}
          {' '}
          руб.
        </p>
      </div>
    </section>
  );
}

export default ProductList;
