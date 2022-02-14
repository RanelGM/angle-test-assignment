import { createAction } from '@reduxjs/toolkit';

import { ProductType } from 'types/product';
import { ActionType, ThunkActionResult } from 'types/store';
import { productsURL } from 'utils/const';

const setProducts = createAction(
  ActionType.SetProducts,
  (products: ProductType[]) => ({ payload: products }),
);

export const loadProducts = (): ThunkActionResult => async (dispatch): Promise<void> => {
  const data = (
    await fetch(productsURL).then((response) => response.json())
  ) as ProductType[];

  dispatch(setProducts(data));
};

export default setProducts;
