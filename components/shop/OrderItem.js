import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import Colors from '../../constants/Colors';

import CartItem from './CartItem';
import Card from '../UI/Card';


const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title="Show Detailssss" onPress={() => {
                setShowDetails(prevState => !prevState);
            }} />

            {showDetails && (
                <View style={styles.cartItem}>
                    {props.items.map(cartItem => (
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.productTitle}
                        />
                    ))}
                </View>
            )
            }
        </Card>
    );
}



const styles = StyleSheet.create({

    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        margin: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    cartItem: {
        width: '100%'
    }
});

export default OrderItem;