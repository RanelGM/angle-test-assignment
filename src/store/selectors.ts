import { State } from 'types/store';
import { ProductType } from 'types/product';

export const getProducts = (state: State): ProductType[] | null => state.products;
