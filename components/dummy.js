import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';


const Dummy = props => {
    return (<View><Text>Hi From Dummy Component</Text></View>);
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start', //START FROM TOP
        alignItems: 'center' //CENTER HORIZNTAL
    }
});

export default Dummy;