import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CustomHeader from'../components/CustomHeader';
class SubscriptionScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Subscription' navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Subscription!</Text>
        </View>
      </View>
    );
  }

}
export default SubscriptionScreen;