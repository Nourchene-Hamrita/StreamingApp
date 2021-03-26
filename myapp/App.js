import React, { Component } from 'react';
import { View, Text, StatusBar, } from 'react-native';
import Routes from './Screens/Routes';
import Navigation from './navigations/Navigation';
import Search from './Screens/Search';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp'
import SideBar from './components/SideBar'
import Home from './Screens/Home';



class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}


const StackNavigator = createStackNavigator({

  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen:Home,
    navigationOptions: {
      header: null
    }
  }
});
const MyApp = createDrawerNavigator({

  Acceuil: {
    screen: StackNavigator,

  },

},
  {
    initialRouteParams: ["Login", "Menu"],
    initialRouteName: 'Acceuil',
    drawerPosition: 'Left',
    contentComponent: ({ navigation }) => {
      return (<SideBar {...navigation} navigation={navigation} />
            
      )
    },
    drawerType: "slide",
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });

// define your styles
const AppContainer = createAppContainer(MyApp);
export default AppContainer;
