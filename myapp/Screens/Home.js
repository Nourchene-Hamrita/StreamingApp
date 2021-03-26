import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from '../Styles/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';


class CustomHeader extends Component {

  render() {
    let { title, isHome } = this.props
    return (
      <Header>
        <Left>{
          isHome ?
            <Button transparent>
              <Icon name='menu' />
            </Button> :
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
        }
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='search' />
          </Button>
          <Button transparent>
            <Icon name='heart' />
          </Button>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>


    );
  }
}
class HomeScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Home' isHome={true} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button onPress={() => this.props.navigation.navigate('Homedetails')}>
            <Text>go to home</Text>
          </Button>

          <Text>Home!</Text>
        </View>
      </View>
    );
  }

}
class RecommandationScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Recommandations' isHome={true} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button onPress={() => this.props.navigation.navigate('Recommdetails')}>
            <Text>go to recommandations</Text>
          </Button>
          <Text>Recommandations!</Text>
        </View>
      </View>
    );
  }

}
class LibraryScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Library' isHome={true} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button onPress={() => this.props.navigation.navigate('Librarydetails')}>
            <Text>go to Library</Text>
          </Button>
          <Text>Library!</Text>
        </View>
      </View>
    );
  }

}
class Homedetails extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Homedetails' navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Homedetails!</Text>
        </View>
      </View>
    );
  }

}
class Recommdetails extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Recommdetails' navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Recommdetails!</Text>
        </View>
      </View>
    );
  }

}
class librarydetails extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='librarydetails' navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>librarydetails!</Text>
        </View>
      </View>
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
  Homedetails: {
    screen: Homedetails,
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
  Recommdetails: {
    screen: Recommdetails,
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
  Librarydetails: {
    screen: librarydetails,
    navigationOptions: {
      header: null,
    }
  },
})
const TabNavigator = createBottomTabNavigator({
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
          ? 'ios-information-circle'
          : 'ios-information-circle-outline';

      } else if (routeName === 'Recommandations') {
        iconName = focused ? 'ios-list-box' : 'ios-list';
      }
      else if (routeName === 'Library') {
        iconName = focused ? 'ios-list-box' : 'ios-list';
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
}
);

export default createAppContainer(TabNavigator);
