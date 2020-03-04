import React from 'react';
import { View, Text, StyleSheet, Button, Image, Platform, ColorPropType } from 'react-native';
import Colors from '../../constants/Colors';


const ProductItem = props => {
    return (
        <View style={styles.product}>
            <View style={styles.productImageContainer}>
                <Image
                    source={{ uri: props.image }}
                    style={styles.productImage} />
            </View>
            <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{props.title}</Text>
                <Text style={styles.productPrice}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.productButtons}>
                <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails} />
                <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    productImageContainer: {
        height: '60%',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden'
    },
    productImage: {
        height: '100%',
        width: '100%'
    },
    productTitle: {
        fontSize: 18,
        marginVertical: 4
    },
    productPrice: {
        fontSize: 14,
        color: '#888'
    },
    productButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    productDetails: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },

});

export default ProductItem;