import React,{ Component } from 'react';
import {StyleSheet,View,Text} from'react-native';

class Library extends Component {
    render(){
    return (
      <View style={styles.MainView}>
          <Text>THIS IS  THIRD TAB </Text>
      </View>
    );
  }}
  const styles=StyleSheet.create({
      MainView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'lightblue'}

    
  });
  export default Library;