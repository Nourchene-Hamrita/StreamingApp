import React, { Component } from 'react';
import { View,SafeAreaView,ScrollView ,Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text,List,ListItem } from 'native-base';
export default class SideBar extends Component {
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
       <SafeAreaView style={{ flex: 1 }}>
         <View style={{height:150,justifyContent:'center',alignItems:'center'}}>
           <Image  source={require('../components/img/Profile.png')}style={{height:120,width:120,borderRadius:60}}/>
         </View>
         <ScrollView>
           <List>
             <ListItem>
               <Text style={{color:'#4169e1'}}>Profile</Text>
             </ListItem>
             <ListItem >
               <Text style={{color:'#4169e1'}}>History</Text>
             </ListItem>
             <ListItem>
               <Text style={{color:'#4169e1'}}>Subscription</Text>
             </ListItem>
           </List>
         </ScrollView>
         <List>
           <ListItem >
             <Text style={{color:'#4169e1'}}>LogOut</Text>
           </ListItem>
         </List>
       </SafeAreaView>
     );
   }
}