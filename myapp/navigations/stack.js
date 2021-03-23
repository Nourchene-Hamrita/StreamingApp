import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../Screens/Header';
import History from '../Screens/History';
import Home from '../Screens/Home';
import Subscription from '../Screens/Subscription';

const HistoryStack = createStackNavigator();
const HomeStack = createStackNavigator();
const SubStack = createStackNavigator();

export const HomeStackScreen = () => {
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
};
