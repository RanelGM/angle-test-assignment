import { State } from 'types/store';
import { ProductType } from 'types/product';

export const getProducts = (state: State): ProductType[] | null => state.products;
export const getAddress = (state: State): string | null => state.address;
export const getIsMarkUpdateRequired = (state: State): boolean => state.isMarkUpdateRequired;
