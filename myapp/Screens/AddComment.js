import React, { Component } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Container, Item, Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Form } from 'native-base';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { getComments } from '../services/apis';
import { dateParser } from '../components/utils';
export default class AddComment extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    console.log(navigation.getParam('comments', null))
    this.state = {
      loading: true,
      comments: navigation.getParam('comments', null),
    };

  }
  Item(commenterPseudo,text,PublishedAt) {
    return (
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={require('../components/img/Profile.png')} />
              <Body>
                <Text>{commenterPseudo}</Text>
                <Text note>{dateParser(PublishedAt)}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{text}</Text>
            </Body>
          </CardItem>
        </Card>
        <Item rounded>
          <Input placeholder='Add a comment' />
        </Item>
      </Content>


    )

  }

  renderItem = ({ item, index }) => (
    this.Item(item.commenterPseudo,item.text,item.PublishedAt)
  );
  
  async componentDidMount() {
    AndroidKeyboardAdjust.setAdjustPan();
  }
  commentVideo(id) {
    getComments(id).then((res) => {
      this.setState({
        comments: res.data
      })
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    let { comments } = this.state
    console.log({ comments })
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader title='Add Comment' navigation={this.props.navigation} />

        <FlatList
          data={comments}
          renderItem={this.renderItem}
          
          keyExtractor={item => item._id}
        />
      </SafeAreaView>
    );
  }
}