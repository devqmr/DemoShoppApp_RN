import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';



const UserProductsScreen = props => {
    const products = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id, title) => {
        props.navigation.navigate('editProduct', {
            productId: id,
        });
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you want to delete this product', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress:
                    () => {
                        dispatch(productsActions.deleteProduct(id));
                    }
            }
        ])
    }

    return (<FlatList
        data={products}
        renderItem={itemData => (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onSelect={() => {
                    editProductHandler(itemData.item.id, itemData.item.title)
                }}>

                <Button color={Colors.primary}
                    title="Edit"
                    onPress={
                        () => {
                            editProductHandler(itemData.item.id, itemData.item.title)
                        }
                    } />
                <Button color={Colors.primary}
                    title="Delete"
                    onPress={deleteHandler.bind(this, itemData.item.id)} />
            </ProductItem>
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('editProduct');
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

export default UserProductsScreen;