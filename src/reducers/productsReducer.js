import { types } from '../types/types'

const initialState = {
  products: [],
  selectedProduct: null,
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getProducts:
      return {
        ...state,
        products: action.payload,
      }
    case types.productSelected:
      console.log({ state })
      return {
        ...state,
        selectedProduct: state.products.find(
          (product) => product._id === action.payload
        ),
      }

    default:
      return state
  }
}
