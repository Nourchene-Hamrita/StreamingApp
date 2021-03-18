import React,{ Component } from 'react';
import {StyleSheet,View,Text} from'react-native';

class  SecondTab extends Component {
    render(){
    return (
      <View style={styles.MainView}>
          <Text>THIS IS  SECOND TAB </Text>
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
  export default SecondTab;