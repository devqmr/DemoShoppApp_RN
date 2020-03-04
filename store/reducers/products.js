import PRODUCTS from "../../data/dummy-data";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
    // switch (action.type) {
    //     case zxc:
    //         return { ...state }
    //     default:
    //         return state;
    // }

    return state;
}

export default productsReducer;