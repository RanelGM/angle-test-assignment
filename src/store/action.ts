import { createAction } from '@reduxjs/toolkit';

import { ProductType } from 'types/product';
import { ActionType, ThunkActionResult } from 'types/store';
import { productsURL } from 'utils/const';
import { getPixelStaticMockData } from 'utils/mock-data';

export const setProducts = createAction(
  ActionType.SetProducts,
  (products: ProductType[]) => ({ payload: products }),
);

export const setAddress = (createAction(
  ActionType.SetAddress,
  (address: string) => ({ payload: address }),
));

export const setIsMarkUpdateRequired = (createAction(
  ActionType.SetIsMarkUpdateRequired,
  (status: boolean) => ({ payload: status }),
));

export const loadProducts = (): ThunkActionResult => async (dispatch): Promise<void> => {
  // const response = await fetch('productsURL');
  // const data = await response.json() as string;
  // const products = JSON.parse(data) as ProductType[];

  // dispatch(setProducts(products));

  const mockData = getPixelStaticMockData();
  dispatch(setProducts(mockData));
};
