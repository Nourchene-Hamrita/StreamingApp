import React, { Component } from 'react';
import { View, } from 'react-native';
import { Text } from 'native-base';
import { IconButton, Colors } from 'react-native-paper';

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginBottom:50 }}>
         
        <IconButton
          icon="video-plus"
          color={Colors.red300}
          size={100}
          onPress={() => console.log('Pressed')}
          />
        <Text note >Add video</Text>
          
       
      </View>
    );
  }
}