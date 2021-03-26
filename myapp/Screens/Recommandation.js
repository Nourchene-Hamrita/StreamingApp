import React, { Component } from 'react';
import { View} from 'react-native';
import CustomHeader from'../components/CustomHeader';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
class RecommandationScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <CustomHeader title='Recommanded' isHome={true} navigation={this.props.navigation} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
          </View>
        </View>
      );
    }
  
  }
  export default RecommandationScreen ;