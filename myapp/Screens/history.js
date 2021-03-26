import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CustomHeader from'../components/CustomHeader';

class HistoryScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='History' isHome={true} navigation={this.props.navigation}  />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>History!</Text>
        </View>
      </View>
    );
  }

}
export default HistoryScreen;