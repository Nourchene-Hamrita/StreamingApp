import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp'
import HomeScreen from './Screens/Home';
import LibraryScreen from './Screens/Library';
import Search from './Screens/Search';
import ProfileScreen from './Screens/Profile';
import HistoryScreen from './Screens/History';
import SubscriptionScreen from './Screens/Subscription';
import RecommandationScreen from './Screens/Recommandation';
import Notifications from './Screens/Notifications';
import Playlist from './Screens/Playlist';
import SideBar from './components/SideBar';
import SavedScreen from './Screens/Saved';
import FirstTab from './Screens/FirstTab';
import {Provider} from'react-redux';
import { createStore } from 'redux';
import rootReducer from'./reducers';
import AddComment from './Screens/AddComment';
import AddChannel from'./Screens/AddChannel';
import Channel from './Screens/Channel';
import Tab2 from './components/Tab2';
import EditPost from './components/Posts/EditPost';
import Result from'./Screens/Result';


/*const store=createStore({
  rootReducer,
})*/

class App extends Component {
  render() {
    return (
      
      <AppContainer/>
    
    );
  }
}

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      header: null,
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      header: null,
    }
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      header: null,
    }
  },
  Playlist: {
    screen: Playlist,
    navigationOptions: {
      header: null,
    }
  },
  AddComment: {
    screen: AddComment,
    navigationOptions: {
      header: null,
    }
  },
  videosList: {
    screen: Tab2,
    navigationOptions: {
      header: null,
    }
  },
  EditVideo: {
    screen: EditPost,
    navigationOptions: {
      header: null,
    }
  },

})
const RecommandationStack = createStackNavigator({
  Recommandations: {
    screen: RecommandationScreen,
    navigationOptions: {
      header: null,
    }
  },

})
const LibraryStack = createStackNavigator({
  Library: {
    screen: LibraryScreen,
    navigationOptions: {
      header: null,
    }
  },

})
const MainTabs = createBottomTabNavigator({
  Home: HomeStack,
  Recommandations: RecommandationStack,
  Library: LibraryStack,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = focused
          ? 'home'
          : 'home-outline';

      } else if (routeName === 'Recommandations') {
        iconName = focused ? 'flash-sharp' : 'flash-outline';
      }
      else if (routeName === 'Library') {
        iconName = focused ? 'library-sharp' : 'library-outline';
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#4169e1',
    inactiveTintColor: 'gray',
  },
}
);
const MainStack = createStackNavigator({
  Home: {
    screen: MainTabs,
    navigationOptions: {
      header: null,
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    }
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      header: null,
    }
  },
  Saved: {
    screen: SavedScreen,
    navigationOptions: {
      header: null,
    }
  },
  Subscription: {
    screen: SubscriptionScreen,
    navigationOptions: {
      header: null,
    }
  },
 AddChannel: {
    screen: AddChannel,
    navigationOptions: {
      header: null,
    }
  },
  Channel: {
    screen:Channel,
    navigationOptions: {
      header: null,
    }
  },
  EditVideo: {
    screen: EditPost,
    navigationOptions: {
      header: null,
    }
  },
  
}, { initialRouteName: 'Home' })
const appDrawer = createDrawerNavigator({
  drawer: MainStack
},
  {
    contentComponent: SideBar,
    drawerWidth: Dimensions.get('window').width * 3 / 4

  }



)

const MainApp = createStackNavigator({

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
  Acceuil: {
    screen: appDrawer,
    navigationOptions: {
      header: null
    }
  },

});

const AppContainer = createAppContainer(MainApp);
export default App;
