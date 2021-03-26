import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import History from '../Screens/History';
import Home from '../Screens/Home';
import Subscription from '../Screens/Subscription';
import Library from '../Screens/Library';
import Profile from '../Screens/Profile';
import FirstTab from '../Screens/FirstTab';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


const StackNavigator = createStackNavigator({

    Home: {
        screen: Home,
        navigationOptions:  
        {header: null}
           
    },
    Recommandations: {
        screen: FirstTab,
        navigationOptions: {
            header: null
        }
    },
    Library: {
        screen: Library,
        navigationOptions: {
            header: null
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    }

});

const Container = createAppContainer(StackNavigator);
export default Container;

/*export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={({ navigation }) => ({
                headerTitle: () => (<Header navigation={navigation} title='Home' />)
            })} />
        </HomeStack.Navigator>)
};

export const HistoryStackScreen = () => {
    return (
        <HistoryStack.Navigator>
            <HistoryStack.Screen name="History" component={History} options={({ navigation }) => ({
                headerTitle: () => (<Header navigation={navigation} title='History' />)
            })} />
        </HistoryStack.Navigator>)
};

export const SubStackScreen = () => {
    return (
        <SubStack.Navigator>
            <SubStack.Screen name="Subscription" component={Subscription} options={({ navigation }) => ({
                headerTitle: () => (<Header navigation={navigation} title='Subscription' />)
            })} />
        </SubStack.Navigator>)
};*/
