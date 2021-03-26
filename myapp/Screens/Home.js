import React, { Component } from 'react';
import { View,Image } from 'react-native';
import { Button, Text } from 'native-base';
import CustomHeader from'../components/CustomHeader';



class HomeScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Home' isHome={true} navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <Text>Home!</Text>
        </View>
      </View>
    );
  }

}
export default HomeScreen;








