import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';



const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails',
            {
                productId: id,
                productTitle: title,
            }
        );
    }



    return (<FlatList data={products} renderItem={itemData => (
        <ProductItem title={itemData.item.title}
            image={itemData.item.imageUrl}
            price={itemData.item.price}
            onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
            }}
        >
            <Button color={Colors.primary}
                title="View Details"
                onPress={
                    () => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }
                } />
            <Button color={Colors.primary}
                title="To Cart"
                onPress={
                    () => {
                        dispatch(cartActions.addToCart(itemData.item));
                    }
                } />
        </ProductItem>
    )} />);
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
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