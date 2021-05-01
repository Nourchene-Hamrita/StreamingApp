import React, { Component } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Item, Input, Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { SearchVideosTag, SearchVideos } from '../services/apis';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      videos: [],
      result: [],
      tag: '',
      category: "",
      channelname: '',
    };
  }

  componentDidMount() {
  }

  getVideo(tag) {

    console.log(tag)
    SearchVideosTag({ tag })
      .then((res) => {
        console.log({ res })
        this.setState({
          videos: res.data

        });

      }).catch((err) => {
        console.log(err);
      });



  };
  SearchVideo() {
    let { channelname, tag, category } = this.state
    console.log({ channelname })
    SearchVideos({ channelname, tag, category })
      .then((res) => {
        console.log({ res })
        this.setState({
          result: res.data

        });

        this.props.navigation.navigate('Result', { result: res.data })
      }).catch((err) => {
        console.log(err);
      });


  }
  selectTag() {
    return (
      <View>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Enter a tag" onChangeText={(text) => this.setState({ tag: text })} />
        </Item>
      </View>

    )
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container >
          <Header hasSegment style={{ backgroundColor: '#4169e1' }}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Search</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="search" />
              </Button>
            </Right>
          </Header>
          <Segment style={{ backgroundColor: '#4169e1' }}>
            <Button first >
              <Text>Category</Text>
            </Button>
            <Button onPress={() => this.selectTag()}>
              <Text>Tags</Text>
            </Button>
            <Button last >
              <Text>channel name</Text>
            </Button>
          </Segment>
          <Content padder>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
              <Item>
                <Icon name="ios-search" style={{ color: '#fa8072' }} />
                <Input placeholder="Enter a tag" onChangeText={(text) => this.setState({ tag: text })} />
              </Item>
              <Item>
                <Icon name="ios-search" style={{ color: '#fa8072' }} />
                <Input placeholder="Enter category" onChangeText={(text) => this.setState({ category: text })} />
              </Item>
              <Item>
                <Icon name="ios-search" style={{ color: '#fa8072' }} />
                <Input placeholder="Enter channelname" onChangeText={(text) => this.setState({ channelname: text })} />
              </Item>

              <TouchableOpacity onPress={() => this.SearchVideo()}>
                <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 50 }} colors={['#4169e1', '#fa8072']}>
                  <Icon name='ios-videocam' style={{ color: 'white', fontSize: 20 }} />
                  <Text style={{ color: 'white', fontSize: 20, paddingLeft: 5 }}>Search</Text>
                </LinearGradient>

              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </View>
    );
  }

}
export default Search;
/* */