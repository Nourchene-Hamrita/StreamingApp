import React, { Component } from 'react';
import { View ,FlatList,TouchableOpacity} from 'react-native';
import CustomHeader from'../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header,Button, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
const cards = [
  {  id:'1',
    text: 'Card One',
    name: 'One',
    video: require('../components/videos/video.mp4'),
  },
  {id:'2',
    text: 'Card two',
    name: 'One',
    video: require('../components/videos/video.mp4'),
  },
  { id:'3',
    text: 'Card three',
    name: 'One',
    video: require('../components/videos/video.mp4'),
  },]
class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    console.log(navigation.getParam('following', null))
    this.state = {
      loading: true,
      dataSource:[],
      following: navigation.getParam('following', null),
    };
  }
  Item(channelname,followers,picture){
    return (
      <Content>
        <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{uri:picture}} />
            </Left>
            <Body>
              <Text>{channelname}</Text>
              <Text note numberOfLines={1}>{followers} followers</Text>
            </Body>
            <Right>
              <TouchableOpacity>
            <LinearGradient style={{ padding: 10, borderRadius: 20, }} colors={['#4169e1', '#fa8072']}>
            <Text style={{ color: 'white' }} >Unfollow</Text>
            </LinearGradient>
            </TouchableOpacity>
            </Right>
          </ListItem>
        </List>
      </Content>
    )}
    renderItem = ({ item, index }) => (
      this.Item(item.channelname, item.followers.length,item.picture)
    );

  componentDidMount() {
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