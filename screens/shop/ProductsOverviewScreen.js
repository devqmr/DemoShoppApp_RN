import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (<FlatList data={products} renderItem={itemData => (
        <ProductItem title={itemData.item.title} image= {itemData.item.imageUrl} price={itemData.item.price} onViewDetail={() => {}}  onAddToCart={() => {}} />
    )} />);
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start', //START FROM TOP
        alignItems: 'center' //CENTER HORIZNTAL
    }
});

export default ProductsOverviewScreen;