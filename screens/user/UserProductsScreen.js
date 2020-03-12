import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';


const UserProductsScreen = props => {
    const products = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();


    return (<FlatList
        data={products}
        renderItem={itemData => (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onViewDetails={() => {
                    props.navigation.navigate('ProductDetails',
                        {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title,
                        }
                    );
                }} onAddToCart={() => {
                }} />
        )} />);
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start', //START FROM TOP
        alignItems: 'center' //CENTER HORIZNTAL
    }
});

export default UserProductsScreen;