import React, { Component } from 'react';
import { View,SafeAreaView,ScrollView ,Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text,List,ListItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  MaterialCommunityIcons from'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
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
           <Text>Username</Text>
         </View>
         <ScrollView>
           <List  style={{marginLeft:5}}>
             <ListItem onPress={()=>this.props.navigation.navigate('Profile')}>
             <Ionicons  name={'person'} size={20} color='#4169e1' />
               <Text style={{color:'#4169e1',padding:5}}>Profile</Text>
             </ListItem>
             <ListItem  onPress={()=>this.props.navigation.navigate('History')} >
               < MaterialCommunityIcons name={'history'} size={25} color='#4169e1'/>
               <Text style={{color:'#4169e1',padding:5}}>History</Text>
             </ListItem>
             <ListItem  onPress={()=>this.props.navigation.navigate('Saved')}>
             <Ionicons  name={'md-star-sharp'} size={20} color='#4169e1' />
               <Text style={{color:'#4169e1',padding:5}}>Saved</Text>
             </ListItem>
             <ListItem onPress={()=>this.props.navigation.navigate('Subscription')}>
             < MaterialCommunityIcons name={'clipboard-play-multiple'} size={20} color='#4169e1'/>
               <Text style={{color:'#4169e1',padding:5}}>Subscription</Text>
             </ListItem>
           </List>
         </ScrollView>
         <List>
           <ListItem  >
             <SimpleLineIcons  name={'logout'} size={20} color='#4169e1'/>
             <Text style={{color:'#4169e1',padding:5}}>LogOut</Text>
           </ListItem>
         </List>
       </SafeAreaView>
     );
   }
}