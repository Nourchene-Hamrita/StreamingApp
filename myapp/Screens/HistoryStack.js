import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import history from'../Screens/history';
const HistoryStack = createStackNavigator();
const HistoryStackScreen = () => {
    return (
      <HistoryStack.Navigator>
        <HistoryStack.Screen name="History" component={history} />
      </HistoryStack.Navigator>)
  };
























export default HistoryStackScreen;