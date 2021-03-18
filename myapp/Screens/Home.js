import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FirstTab from '../Screens/FirstTab';
import SecondTab from '../Screens/SecondTab';
import ThirdTab from '../Screens/ThirdTab';
import FourthTab from '../Screens/FourthTab';
import  Header  from '../Screens/Header';



const Tab = createBottomTabNavigator();

class Home extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Recommandations') {
                iconName = focused ? 'flash-sharp' : 'flash-outline';
              }
            
              else if (route.name === 'Library') {
                iconName = focused ? 'library-sharp' : 'library-outline';
              }
              else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              }

              return <Icon name={iconName} size={25} color={'#0000ff', '#4169e1'} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#4169e1',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={Header} />
          <Tab.Screen name="Recommandations" component={FirstTab} />
          <Tab.Screen name="Library" component={ThirdTab} />
          <Tab.Screen name="Profile" component={FourthTab} />
        </Tab.Navigator>
      </NavigationContainer>)

  }
}
export default Home;

