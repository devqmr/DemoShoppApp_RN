import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();


    return (<FlatList data={products} renderItem={itemData => (
        <ProductItem title={itemData.item.title} image={itemData.item.imageUrl} price={itemData.item.price} onViewDetails={() => {
            props.navigation.navigate('ProductDetails',
                {
                    productId: itemData.item.id,
                    productTitle: itemData.item.title,
                }
            );
        }} onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
        }} />
    )} />);
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
        )
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start', //START FROM TOP
        alignItems: 'center' //CENTER HORIZNTAL
    }
});

export default ProductsOverviewScreen;