import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';


import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';



const CartScreen = props => {

    const dispatch = useDispatch();

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];

        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                producPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }

        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryAmount}>${Math.round((cartTotalAmount.toFixed(2)*100))/100}</Text> </Text>
                <Button title='Order Now'
                    color={Colors.accent}
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
                    }
                    }
                />
            </Card>

            <FlatList
                contentContainerStyle={styles.list}
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        deletable
                        title={itemData.item.productTitle}
                        quantity={itemData.item.quantity}
                        amount={itemData.item.sum}
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId))
                        }}
                    />
                )} />

        </View>
    );
}

CartScreen.navigationOptions = {
    headerTitle: "Your Cart"
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    summaryAmount: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
        fontSize: 20
    },
});

export default CartScreen;