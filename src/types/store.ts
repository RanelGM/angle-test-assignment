import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ProductType } from './product';

export type State = {
  products: ProductType[] | null,
  address: string | null,
  isMarkUpdateRequired: boolean,
};

export enum ActionType {
  SetProducts = 'products/setProducts',
  SetAddress = 'address/setAddress',
  SetIsMarkUpdateRequired = 'address/setIsMarkUpdateRequired',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, undefined, Action>;
export type ThunkActionDispatch = ThunkDispatch<State, undefined, Action>;
