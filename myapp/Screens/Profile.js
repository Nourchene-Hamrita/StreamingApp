import React,{ Component } from 'react';
import {StyleSheet,View,Text} from'react-native';

class  Profile extends Component {
    render(){
    return (
      <View style={styles.MainView}>
          <Text>THIS IS  FOURTH TAB </Text>
      </View>
    );
  }}
  const styles=StyleSheet.create({
      MainView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'pink'}

    
  });
  export default Profile;