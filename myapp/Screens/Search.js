import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Search extends Component {
    render() {
        return (
            <View style={{ flex: 1 }, styles.container}>
                <Icon style={styles.icon} name='search' size={25} color='#aaa' />
                <TextInput placeholder="Enter a key word or a tag" style={styles.inputsearch} />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    inputsearch: {
        width: "100%",
        height: "100%",
        justifyContent:'center',
        fontSize: 15,
        paddingLeft:8,
        borderWidth: 1.5,
        borderColor: "#aaa",
        
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,

    }
})
export default Search;
