import LoadError from 'components/load-error/load-error';
import LoadPending from 'components/load-pending/load-pending';
import useAsync from 'hooks/useAsync';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, setProducts } from 'store/action';
import { getProducts } from 'store/selectors';
import { ProductType } from 'types/product';
import { ThunkActionDispatch } from 'types/store';
import { Product } from '../components';

const getTotalCost = (products: ProductType[] | null) => {
  if (!products) {
    return 0;
  }

  return products.reduce((sum, product) => sum + product.price * product.amount, 0);
};

function ProductList(): JSX.Element {
  const products = useSelector(getProducts);
  const dispatch = useDispatch<ThunkActionDispatch>();
  const totalCost = getTotalCost(products);
  const isTotalCostShow = Boolean(products?.length);

  const handleProductUpdate = (amount: number, product: ProductType) => {
    if (!products) {
      return;
    }

    const updatingProduct = { ...product, amount };
    const index = products.indexOf(product);
    const updatedProducts = [
      ...products.slice(0, index),
      updatingProduct,
      ...products.slice(index + 1),
    ];

    dispatch(setProducts(updatedProducts));
  };

  const handleProductDelete = (product: ProductType) => {
    if (!products) {
      return;
    }

    const index = products.indexOf(product);
    const updatedProducts = products.slice();
    updatedProducts.splice(index, 1);

    dispatch(setProducts(updatedProducts));
  };

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
          <Product
            key={product.id}
            product={product}
            onProductUpdate={handleProductUpdate}
            onProductDelete={handleProductDelete}
          />
        ))}
      </ul>

      {isTotalCostShow && (
        <div className="product-list__total">
          <p className="product-list__total-text">Итог:</p>
          <p className="product-list__total-text">
            {totalCost}
            {' '}
            руб.
          </p>
          <input
            className="visually-hidden"
            name="total-cost"
            tabIndex={-1}
            value={totalCost}
            readOnly
          />
        </div>
      )}

      {!isTotalCostShow && (
        <p className="product-list__empty-text">Корзина пуста.</p>
      )}

    </section>
  );
}

export default ProductList;
