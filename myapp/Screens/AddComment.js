import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Container, Header, Item, Input, Icon, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { getComments, CommentVideo, getInfoUser } from '../services/apis';
import { dateParser } from '../components/utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
export default class AddComment extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    console.log(navigation.getParam('comments', null))
    this.state = {
      loading: true,
      comments: navigation.getParam('comments', null),
      dataSource: navigation.getParam('dataSource', null),
      text: '',
      profile: null,

    };

  }
  Item(commenterPseudo, text, PublishedAt, picture) {
    return (
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: picture }} />
            </Left>
            <Body>
              <Text style={{ color: "#4169e1" }}>{commenterPseudo}</Text>
              <Text style={{ marginTop: 10, color: "#fa8072" }}>{text}</Text>
            </Body>
            <Right>
              <Text note>{dateParser(PublishedAt)}</Text>
            </Right>
          </ListItem>
        </List>

      </Content>


    )

  }

  renderItem = ({ item, index }) => (
    this.Item(item.commenterPseudo, item.text, item.PublishedAt, item.picture)
  );
   UNSAFE_componentWillMount() {

  }

  async componentDidMount() {
    AndroidKeyboardAdjust.setAdjustPan();
    await this.getData();
  };
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
  commentVideo(id) {
    getComments(id).then((res) => {
      console.log({ res })
      this.setState({
        comments: res.data
      })
      
    }).catch(err => {
      console.log(err);
    });
  }
  AddComment(id) {
    let { text, profile} = this.state
    console.log({
      id,
      CommenterId:profile._id,
      commenterPseudo:profile.login,
      picture:profile.picture,
      text,
    })
    CommentVideo(id, { CommenterId: profile._id, commenterPseudo: profile.login, picture: profile.picture, text })
      .then((res) => {
        console.log(res);
        this.commentVideo(id)
        alert("The comment has been successfully added")
      }
      ).catch(err => {
        console.log(err);

      });

  }

  render() {
    let { comments,dataSource } = this.state
    console.log({ comments })
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader title='Add Comment' navigation={this.props.navigation} />

        <FlatList
          data={comments}
          renderItem={this.renderItem}

          keyExtractor={item => item._id}
        />
        <Item rounded style={{ marginBottom: 10 }} >
          <Input placeholder='Add a comment' onChangeText={(text) => this.setState({ text: text })} />
          <Icon style={{ color: "#fa8072" }} active name='send' onPress={() => this.AddComment(comments[0].videoId)} />
        </Item>

      </SafeAreaView>
    );
  }
}