import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import styles from './style';
import  Ionicons from'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'


export default class Post extends Component {
  videoPlayer;


  state = {
    currentTime: 0,
    duration: 0,
    isFullScreen: false,
    isLoading: true,
    paused: false,
    playerState: PLAYER_STATES.PLAYING,
    screenType: 'content',

  };
  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };
  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
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
      <View style={styles.container}>

        <Video onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen} volume={10} source={require('../../components/videos/video.mp4')} 
          style={styles.video} resizeMode={'cover'}
          repeat={true} />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}>
        </MediaControls>

      <View style={styles.uiContainer}>
        <View style={styles.rightContainer}>
          <View style={styles.iconContainer}>
           
          <EvilIcons name='heart' size={40} color='white'/>
            <Text style={styles.statsLabel}>123</Text>
            <Ionicons name='ios-heart-dislike-outline' size={30} color='white'/>
            <Text style={styles.statsLabel}>123</Text>
            <EvilIcons name='comment' size={40} color='white'/>
            <Text style={styles.statsLabel}>123</Text>
           
          </View>
        </View>
        <View style={styles.bottomContainer}>
        <Text style={styles.handle}>Title</Text>
        <Text style={styles.description}>Description</Text>
        </View>
      </View>

      </View>
    );
  }
}