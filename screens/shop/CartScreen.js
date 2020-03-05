import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';


import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { BorderlessButton } from 'react-native-gesture-handler';
import CartItem from '../../components/shop/CartItem';


const CartScreen = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];

        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                producPrice: state.cart.items[key].productPrice,
                quntity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }

        return transformedCartItems;
    });

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryAmount}>${cartTotalAmount.toFixed(2)}</Text> </Text>
                <Button title='Order Now' color={Colors.accent} disabled={cartItems.length === 0} />
            </View>

            <FlatList
                contentContainerStyle={styles.list}
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        title={itemData.item.productTitle}
                        quantity={itemData.item.quntity}
                        amount={itemData.item.sum}
                        onRemove={() => {
                            console.warn("Delete the Product" + itemData.item.productTitle)
                        }}
                    />
                )} />

        </View>
    );
}

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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
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