import React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Header from '../Screens/Header';
import Home from '../Screens/Home';
import { styles } from '../Styles/style';
const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={({ navigation }) => ({
                headerTitle: () => (<Header navigation={navigation} />)
            })} />
        </HomeStack.Navigator>)
}
export default HomeStackScreen;
