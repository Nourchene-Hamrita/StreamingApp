import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import Header from '../Screens/Header';
const SubStack = createStackNavigator();
const SubStackScreen = () => {
    return (
        <SubStack.Navigator>
            <SubStack.Screen name="Home" component={Subscription} options={({ navigation }) => ({
                headerTitle: () => (<Header navigation={navigation} title='Subscription' />)
            })} />
        </SubStack.Navigator>)
}
 class Subscription extends Component {
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
export default SubStackScreen;