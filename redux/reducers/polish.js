import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const polishReducer = createReducer(initialState, {
  polishCreateRequest: (state) => {
    state.isLoading = true;
  },
  polishCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.polish = action.payload;
    state.success = true;
  },
  polishCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all polishes of shop
  getAllPolishesShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllPolishesShopSuccess: (state, action) => {
    state.isLoading = false;
    state.polishes = action.payload;
  },
  getAllPolishesShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete polish of a shop
  deletePolishRequest: (state) => {
    state.isLoading = true;
  },
  deletePolishSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deletePolishFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all polishes
  getAllProlishesRequest: (state) => {
    state.isLoading = true;
  },
  getAllPolishesSuccess: (state, action) => {
    state.isLoading = false;
    state.allPolishes = action.payload;
  },
  getAllProlishesFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
});
