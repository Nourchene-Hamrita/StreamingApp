import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import ThirdTab from './ThirdTab';
import FourthTab from './FourthTab';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStackScreen from'../Screens/Home';
import HistoryStackScreen from '../Screens/History';
import SubStackScreen from'./Subscription';
const Tab = createBottomTabNavigator();
const Drawer=createDrawerNavigator();
const RecomStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RootDrawerScreen = () => {
  return (
    
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="History" component={HistoryStackScreen}/>
       <Drawer.Screen name="Subscription" component={SubStackScreen} />
    </Drawer.Navigator>
  
);
};
const RecomStackScreen = () => {
  return (
    <RecomStack.Navigator>
      <RecomStack.Screen name="Recommandations" component={FirstTab} />
    </RecomStack.Navigator>)
};
const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" component={ThirdTab} />
    </LibraryStack.Navigator>)
};
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={FourthTab} />
    </ProfileStack.Navigator>)
};




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
          <Tab.Screen name="Home" component={RootDrawerScreen} />
          <Tab.Screen name="Recommandations" component={RecomStackScreen} />
          <Tab.Screen name="Library" component={LibraryStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>)

  }
}
export default Home;

