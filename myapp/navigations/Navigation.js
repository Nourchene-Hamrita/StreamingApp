import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStackScreen } from '../navigations/stack';
import { HistoryStackScreen } from '../navigations/stack';
import { SubStackScreen } from '../navigations/stack';
import Library from'../Screens/Library';
import Profile from'../Screens/Profile';
import FirstTab from'../Screens/FirstTab';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const RecomStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RootDrawerScreen = () => {
  return (

    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="History" component={HistoryStackScreen} />
      <Drawer.Screen name="Subscription" component={SubStackScreen} />
      
    </Drawer.Navigator>

  );
};
const RecomStackScreen = () => {
  return (
    <RecomStack.Navigator>
      <RecomStack.Screen name="Recommandations" component={FirstTab} options={{ headerTitleStyle: {
      color:'#4169e1',
      letterSpacing:1,
    }}} />
    </RecomStack.Navigator>)
};
const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" component={Library}  options={{ headerTitleStyle: {
      color:'#4169e1',
      letterSpacing:1,
    }}}/>
    </LibraryStack.Navigator>)
};
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile}  options={{ headerTitleStyle: {
      color:'#4169e1',
      letterSpacing:1,
    }}}/>
    </ProfileStack.Navigator>)
};
class Navigation extends Component {
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
      </NavigationContainer>
    )

  }
}
export default Navigation;

