import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ProductType } from './product';

export type State = {
  products: ProductType[] | null;
};

export enum ActionType {
  SetProducts = 'products/setProducts',
}

export type ThunkActionResult = ThunkAction<Promise<void>, State, undefined, Action>;

export type ThunkActionDispatch = ThunkDispatch<State, undefined, Action>;
