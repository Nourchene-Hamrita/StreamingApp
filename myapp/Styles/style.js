import { StyleSheet, Dimensions } from 'react-native';
import Header from '../Screens/Header';
import React  from 'react';
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        width: width,
        height: height / 2.7
    },
    centerAlign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {

        backgroundColor: "rgba(255,255,255,1)",
        flex: 0.6,
        padding: 20,
        marginTop: -height / 3.8,
        borderRadius: 20,
        width: width / 1.1,
        height: height / 1.4,


    },
    inputContainers: {

        backgroundColor: "rgba(255,255,255,1)",
        flex: 0.6,
        padding: 20,
        marginTop: -height / 3.5,
        borderRadius: 20,
        width: width / 1.1,
        height: height / 1.4,
    },
    input: {
        textAlign: "center",
        fontSize: 15,
        borderWidth: 1.5,
        borderColor: "#aaa",
        borderRadius: 30,
        padding: 10,
        width: width / 1.2,
        marginVertical: 10,




    },
    inputIcon: {
        position: 'absolute',
        top:20,
        left: 20,


    },
    eye: {

        position: 'absolute',
        top: 90,
        right: 20,

    },
    menu: {

        position: 'absolute',
        left:2

    },
    header:{
        width: '100%',
        height: '100%' ,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',




      },
    headerText:{
        position:'absolute',
        left:40,
        fontSize:20,
        fontWeight:'bold',
        letterSpacing:1,
        color:'#333'


    },
    logo: {
        width: width,
        height: height / 3
    }
});

export { styles };