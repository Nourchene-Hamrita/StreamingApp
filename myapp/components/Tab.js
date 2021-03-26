import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Library from'../Screens/Library';
import Profile from'../Screens/Profile';
import FirstTab from'../Screens/FirstTab';
import Home from '../Screens/Home';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


 class Tab extends Component {
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
export default createMaterialBottomTabNavigator(
  {
    Home: { screen: Home },
    Library: { screen: Library },
    Recommandations: { screen: FirstTab},
    Profile: { screen: Profile },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
);