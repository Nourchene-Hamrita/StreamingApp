import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import {unfollowChannel,getInfoUser} from'../services/apis';
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
              <TouchableOpacity onPress={()=>this.Unfollow(this.state.profile._id,channelId,userId)}>
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
        following: res.data
      })
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
        <FlatList
          data={following}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
        />


      </View>
    );
  }

}
export default SubscriptionScreen;