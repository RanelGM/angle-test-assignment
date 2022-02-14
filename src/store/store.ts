import { configureStore, createReducer } from '@reduxjs/toolkit';
import { State } from 'types/store';
import { setProducts } from './action';

const initialState: State = {
  products: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProducts, (state, action) => {
      state.products = action.payload;
    });
});

const store = configureStore({
  reducer,
});

export default store;
