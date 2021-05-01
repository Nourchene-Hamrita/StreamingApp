import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { deleteData, getInfoUser, getFollowing } from '../services/apis';
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: null,
      following: [],
      saved:[],
    };
  }

  async componentDidMount() {
    await this.getData()
  }
  getData() {
    getInfoUser().then((res) => {
      console.log(res)
      this.setState({
        profile: res
      })
    }).catch(err => {
      console.log(err);
    });
  }
  logout = () => {
    deleteData().then((res) => {
      console.log(res);
      this.props.navigation.navigate('Login');
    })
      .catch((err) => {
        console.log(err)
      })

  };
  userFollowing(id) {
    getFollowing(id).then((res) => {
      console.log({ res })
      this.setState({

        following: res.data
      })
      this.props.navigation.navigate('Subscription', { following: res.data })
    }).catch(err => {
      console.log(err);
    });
  };
 

  render() {
    let { profile } = this.state
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {
          profile != null ?
            <ScrollView>
              <View style={{padding:10, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: profile.picture }} style={{ height: 100, width: 100, borderRadius: 60 }} />
                <Text style={{padding: 5, color: '#4169e1' }}
                >{profile.login}</Text>
                 <Text style={{  color: '#fa8072' }}
                >{profile.email}</Text>
              </View>

              <List style={{ marginLeft: 5 }}>
              <ListItem onPress={() => this.props.navigation.navigate('Home')}>
                  <MaterialCommunityIcons name={'home'} size={25} color='#4169e1' />
                  <Text style={{ color: '#4169e1', padding: 5 }}>Home</Text>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('Profile')}>
                  <Ionicons name={'person'} size={20} color='#4169e1' />
                  <Text style={{ color: '#4169e1', padding: 5 }}>Profile</Text>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('Channel')}>
                  <MaterialCommunityIcons name={'video-plus'} size={25} color='#4169e1' />
                  <Text style={{ color: '#4169e1', padding: 5 }}>Create My Channel</Text>
                </ListItem>
               
                <ListItem onPress={() => this.userFollowing(profile._id)}>
                  < MaterialCommunityIcons name={'clipboard-play-multiple'} size={20} color='#4169e1' />
                  <Text style={{ color: '#4169e1', padding: 5 }}>Subscription</Text>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('Saved')}>
                  <Ionicons name={'md-star-sharp'} size={20} color='#4169e1' />
                  <Text style={{ color: '#4169e1', padding: 5 }}>Saved</Text>
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate('History')} >
                  < MaterialCommunityIcons name={'history'} size={25} color='#4169e1' />
                  <Text style={{ color: '#4169e1', padding: 5 }}>History</Text>
                </ListItem>
              

              </List>
              <List>
                <ListItem noBorder onPress={() => this.logout()} >
                  <SimpleLineIcons name={'logout'} size={20} color='#fa8072' />
                  <Text style={{ color: '#fa8072', padding: 5 }}>LogOut</Text>
                </ListItem>
              </List>
              <View style={{ marginTop: 200 }}>

              </View>
            </ScrollView>


            :
            null
        }
      </SafeAreaView>

    );
  }
}