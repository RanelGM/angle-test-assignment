import { configureStore, createReducer } from '@reduxjs/toolkit';
import { State } from 'types/store';
import { setAddress, setIsMarkUpdateRequired, setProducts } from './action';

const initialState: State = {
  products: null,
  address: null,
  isMarkUpdateRequired: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(setAddress, (state, action) => {
      state.address = action.payload;
    })
    .addCase(setIsMarkUpdateRequired, (state, action) => {
      state.isMarkUpdateRequired = action.payload;
    });
});

const store = configureStore({
  reducer,
});

export default store;
