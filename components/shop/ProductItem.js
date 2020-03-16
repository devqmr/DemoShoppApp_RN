import React from 'react';
import { View, Text, StyleSheet, Button, Image, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';


const ProductItem = props => {

    let TouchablePlatform = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchablePlatform = TouchableNativeFeedback;
    }


    return (
        <TouchablePlatform onPress={props.onSelect} useForeground>
            <Card style={styles.product}>
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
                    {props.children}
                </View>
            </Card>
        </TouchablePlatform>
    );
}

const styles = StyleSheet.create({
    product: {

        height: 300,
        margin: 20,
        overflow: 'hidden'
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
        marginVertical: 0,
        fontFamily: 'open-sans-bold',
    },
    productPrice: {
        fontFamily: 'open-sans',
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