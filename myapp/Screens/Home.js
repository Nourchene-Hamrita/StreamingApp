import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../Screens/Header';
const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={({ navigation }) => ({
        headerTitle: () => (<Header navigation={navigation} title='Home' />)
      })} />
    </HomeStack.Navigator>)
}

class Home extends Component {
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
export default HomeStackScreen;