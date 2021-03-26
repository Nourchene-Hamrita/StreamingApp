import React,{ Component } from 'react';
import {StyleSheet,View,Text} from'react-native';
import CustomHeader from'../components/CustomHeader';

class ProfileScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Profile' navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile!</Text>
        </View>
      </View>
    );
  }

}
  export default ProfileScreen;