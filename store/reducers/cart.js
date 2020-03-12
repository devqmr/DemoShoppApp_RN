import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/CartItem";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    items: {},
    totalAmount: 0
}

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(
                    1,
                    prodPrice,
                    prodTitle,
                    prodPrice
                );
            }

            
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewCartItem
                },
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART:
            const selectedProduct = state.items[action.pid];
            const currentQty = selectedProduct.quantity;
            let updatedCartItems;

            if (currentQty > 1) {

                const updatedCartItem = new CartItem(
                    selectedProduct.quantity - 1,
                    selectedProduct.productPrice,
                    selectedProduct.productTitle,
                    selectedProduct.sum - selectedProduct.productPrice
                );

                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - prodPrice
            }


        case ADD_ORDER:
            return initialState;
    }

    return state;
}


export default cartReducer;