import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import { getVideos } from "../services/apis";
import Video from 'react-native-video';
import styles from '../components/Posts/style';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { Container, Header, Right, Button, DeckSwiper, Card, View, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
/*const cards = [
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
  },
]*/
class RecommandationScreen extends React.Component {
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
      cards: []
    };
  }
  
  UNSAFE_componentWillMount() {
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
       /* resJson.data.map((t) => {
          paused.push(true)
        })*/
        this.setState({
          //paused: paused,
          cards: resJson.data
        })


      }).catch((err) => {
        console.log(err);
      });
  }
  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };
  onPaused = playerState => {
   
    paused = !this.state.paused
    this.setState({ paused ,playerState})

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
      <Container>
        <CustomHeader title='Recommended' isHome={true} navigation={this.props.navigation} />
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={this.state.cards}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>
            }
            renderItem={item =>
              <Card >
                <CardItem>
                  <Left>
                    <Thumbnail source={require('../components/img/Profile.png')} />
                    <Body>
                      <Text>Channelname</Text>
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
                <CardItem cardBody style={{ height: 280 }}>

                  <Video onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onProgress={this.onProgress}
                    paused={this.state.paused}
                    ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                    resizeMode={this.state.screenType}
                    onFullScreen={this.state.isFullScreen} volume={10} style={styles.video} resizeMode={'cover'} source={{uri:item.link}} />
                  <MediaControls
                    duration={this.state.duration}
                    isLoading={this.state.isLoading}
                    mainColor="#332"
                    onFullScreen={this.onFullScreen}
                    onPaused={() => this.onPaused}
                    onReplay={this.onReplay}
                    onSeek={this.onSeek}
                    onSeeking={this.onSeeking}
                    playerState={this.state.playerState}
                    progress={this.state.currentTime}
                    toolbar={this.renderToolbar()} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>saved</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 40, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <TouchableOpacity onPress={() => this._deckSwiper._root.swipeLeft()}>
            <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']} >
              <Icon style={{ color: 'white' }} name="arrow-back" />
              <Text style={{ color: 'white' }}>Swipe Left</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._deckSwiper._root.swipeRight()}>
            <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
              <Icon style={{ color: 'white' }} name="arrow-forward" />
              <Text style={{ color: 'white' }} >Swipe Right</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}



export default RecommandationScreen;