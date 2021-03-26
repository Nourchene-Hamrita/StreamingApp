import React,{ Component } from 'react';
import {StyleSheet,View} from'react-native';
import CustomHeader from'../components/CustomHeader';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

class LibraryScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Library' isHome={true} navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Library!</Text>
        </View>
      </View>
    );
  }

}
export default LibraryScreen;