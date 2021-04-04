import React, { Component } from 'react';
import { View ,FlatList,TouchableOpacity} from 'react-native';
import CustomHeader from'../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header,Button, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    video: require('../components/videos/video.mp4'),
  },
  {
    text: 'Card two',
    name: 'One',
    video: require('../components/videos/video.mp4'),
  },
  {
    text: 'Card three',
    name: 'One',
    video: require('../components/videos/video.mp4'),
  },]
class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[],
    };
  }
  Item(link, title, description, PublishedAt, index) {
    return (
      <Content>
        <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../components/img/Profile.png')} />
            </Left>
            <Body>
              <Text>Channelname</Text>
              <Text note numberOfLines={1}>Its time to build a difference . .</Text>
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
      this.Item(item.link, item.title, item.description, item.PublishedAt, index)
    );

  componentDidMount() {
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
         <CustomHeader title='Subscription' navigation={this.props.navigation} />
         <FlatList
          data={cards}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />


      </View>
    );
  }

}
export default SubscriptionScreen;