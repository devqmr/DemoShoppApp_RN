import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return { ...state,
            userProducts:  state.userProducts.filter(prod => prod.id !== action.pid)}
        default:
            return state;
    }

    return state;
}

export default productsReducer;