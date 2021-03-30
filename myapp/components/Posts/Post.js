import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList,TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { getVideos } from "../../services/apis";
import LinearGradient from 'react-native-linear-gradient';
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';


export default class Post extends Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
      dataSource: []
    };
  }
  Item(link, title, description, PublishedAt, index) {
    return (
      <Content >
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={require('../img/Profile.png')} />
              <Body>
                <Text>Channel name</Text>
                <Text note>Username</Text>
              </Body>
            </Left>
            <Right>
              <TouchableOpacity>
                <LinearGradient style={{ padding: 10, borderRadius: 20, }} colors={['#4169e1', '#fa8072']}>
                  <Text style={{ color: 'white' }}>Follow</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Video onEnd={this.onEnd}
              onLoad={this.onLoad}
              onLoadStart={this.onLoadStart}
              onProgress={this.onProgress}
              paused={this.state.paused[index]}
              ref={videoPlayer => (this.videoPlayer = videoPlayer)}
              resizeMode={this.state.screenType}
              onFullScreen={this.state.isFullScreen} volume={10}
              source={{ uri: link }}
              style={styles.video} resizeMode={'cover'}
              repeat={true} />
            <MediaControls
              duration={this.state.duration}
              isLoading={this.state.isLoading}
              mainColor="#333"
              onFullScreen={this.onFullScreen}
              onPaused={() => this.onPaused(index)}
              onReplay={this.onReplay}
              onSeek={this.onSeek}
              onSeeking={this.onSeeking}
              playerState={this.state.playerState}
              progress={this.state.currentTime}
              toolbar={this.renderToolbar()}>
            </MediaControls>
          </CardItem>
          <CardItem>
            <Text>{title}</Text>
          </CardItem>
          <CardItem>
            <Text>{description}</Text>
          </CardItem>
          <CardItem >

            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text style={{ marginLeft: 5 }}>12</Text>
              </Button>

            </Left>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-down" />
                <Text style={{ marginLeft: 5 }}>12</Text>
              </Button>

            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4</Text>
              </Button>
            </Body>
            <Right>
              <Text >11h ago</Text>
            </Right>

          </CardItem>
        </Card>
      </Content>


      /*<View style={styles.uiContainer}>
        <View style={styles.rightContainer}>
          <View style={styles.iconContainer}>

            <EvilIcons name='heart' size={40} color='white' />
            <Text style={styles.statsLabel}>123</Text>
            <Ionicons name='ios-heart-dislike-outline' size={30} color='white' />
            <Text style={styles.statsLabel}>123</Text>
            <EvilIcons name='comment' size={40} color='white' />
            <Text style={styles.statsLabel}>123</Text>

          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.handle}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>


    </View>*/
    )
  }

  renderItem = ({ item, index }) => (
    this.Item(item.link, item.title, item.description, item.PublishedAt, index)
  );
  componentWillMount() {
    let isLoading = []
    let paused = []
    let isFullScreen = []
    let currentTime = []
    let duration = []
    let playerState = []
    let screenType = []
    getVideos()
      .then((resJson) => {
        console.log(resJson)
        resJson.data.map((t) => {
          paused.push(true)
        })
        this.setState({
          paused: paused,
          dataSource: resJson.data
        })


      }).catch((err) => {
        console.log(err);
      });

  }



  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };
  onPaused(index) {
    let { paused } = this.state
    paused[index] = !this.state.paused[index]
    this.setState({ paused })
  };
  onReplay = () => {
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };
  onProgress = data => {
    const { isLoading, playerState } = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  onLoad = data => this.setState({
    duration: data.duration, isLoading: false
  });
  onLoadStart = data => this.setState({
    isLoading: true
  });
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
  onError = () => alert('Oh! ', error);
  exitFullScreen = () => {
    alert("Exit full screen");
  };
  enterFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else
      this.setState({ screenType: 'content' });
  };


  componentDidMount() {
  }
  renderToolbar = () => (
    <View >
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />



      </SafeAreaView>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    height: 200,
    marginTop: 20
  },
  title: {
    fontSize: 32,
  },
});