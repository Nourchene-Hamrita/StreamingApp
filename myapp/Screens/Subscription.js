import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity ,Alert} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import {unfollowChannel,getInfoUser} from'../services/apis';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Button, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    console.log(navigation.getParam('following', null))
    this.state = {
      loading: true,
      dataSource: [],
      profile:null,
      following: navigation.getParam('following', null)
    };
  }
  Item(channelId,userId,channelname, theme, picture) {
    return (
      <Content>
        <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{ uri: picture }} />
            </Left>
            <Body>
              <Text>{channelname}</Text>
              <Text note numberOfLines={1}>{theme}</Text>
            </Body>
            <Right>
              <TouchableOpacity onPress={()=>this.Unfollow(userId,channelId,userId)}>
                <LinearGradient style={{ padding: 10, borderRadius: 20, }} colors={['#4169e1', '#fa8072']}>
                  <Text style={{ color: 'white' }} >Unfollow</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Right>
          </ListItem>
        </List>
      </Content>
    )
  }
  renderItem = ({ item, index }) => (
    this.Item(item.channelId,item.userId,item.channelname,item.theme, item.picture)
  );

  async componentDidMount() {
    await this.getData();
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
  };

  Unfollow(id,idToUnFollow,userId){
    unfollowChannel(id,{idToUnFollow,userId}).then((res) => {
      this.setState({
        following:this.state.following.filter(item=>item.channelId!==idToUnFollow) 
      })
      Alert.alert('Unfollow','This channel has been removed from your followings')
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    let { following } = this.state
    console.log({ following })
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Subscription' navigation={this.props.navigation} />
        {
         this.state.following.length>0?
        <FlatList
          data={following}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
        />
        :
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
           <MaterialCommunityIcons name="video-vintage" style={{fontSize:40,color:'#fa8072'}}/>
        <Text note style={{fontSize:20,color:'#fa8072'}} >No followings yet !</Text>
        </View>
    }


      </View>
    );
  }

}
export default SubscriptionScreen;