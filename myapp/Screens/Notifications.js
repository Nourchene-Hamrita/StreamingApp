import React,{ Component } from 'react';
import {StyleSheet,View,Text} from'react-native';
import CustomHeader from'../components/CustomHeader';
class Notifications extends Component {

    render() {
      return (
        <View style={{ flex: 1 }}>
          <CustomHeader title='Notifications' navigation={this.props.navigation} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notifications!</Text>
          </View>
        </View>
      );
    }
  
  }
  export default Notifications;