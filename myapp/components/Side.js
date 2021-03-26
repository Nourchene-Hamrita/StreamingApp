import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MyScreen extends Component {
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
       <View style={{ flex: 1 }}>
         <Text>MyScreen</Text>
       </View>
     );
   }
}