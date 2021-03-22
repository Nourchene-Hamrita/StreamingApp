import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import history from'../Screens/History';
import Header from '../Screens/Header';
const HistoryStack = createStackNavigator();
const HistoryStackScreen = () => {
    return (
      <HistoryStack.Navigator>
        <HistoryStack.Screen name="History" component={History}options={({ navigation }) => ({
                headerTitle: () => (<Header navigation={navigation} title='History' />)
            })}  />
      </HistoryStack.Navigator>)
  };

 class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
  }

   render() {
     return (
       <View style={{ flex: 1 }}>
         <Text>MyScreen</Text>
       </View>
     );
   }
}
export default HistoryStackScreen;