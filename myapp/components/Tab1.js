import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import styles from '../components/Posts/style';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { Content, Card, CardItem, Thumbnail, Text, Button, Input, Item, Icon, Form, Label, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Tab1 extends Component {
  videoPlayer
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fileUri: '',
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
      title: '',
      description: '',
      tags: []
    };
  }
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

  renderToolbar = () => (
    <View >
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });

  componentDidMount() {
  }
  /*ChooseVideo() {
    ImagePicker.openPicker({
      mediaType: "any",
    }).then((video) => {
      console.log(video);
    });
  }*/
  launchImageLibrary = () => {
    let options = {
      title: 'Image Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'videos'
      },

    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      }
      else if (response.error) {
        console.log('video picker error', response.error);

      } else if (response.customButton) {
        console.log('user tapped custom button', response.customButton);
      }
      else {
        console.log({ response })
        this.setState({ fileUri: response.uri });
        console.log(this.state.fileUri)
      }

    })
  };
  /* renderFileUri() {
     if (this.state.fileUri) {
       return (
         <View>
           <Image source={{ uri: this.state.fileUri }} />
         </View>
       )
     }
   }*/



  render() {

    return (

      <View >
        {
          this.state.fileUri != '' ?
            <View>

              <CardItem cardBody >
                <Video
                  onEnd={this.onEnd}
                  onLoad={this.onLoad}
                  onLoadStart={this.onLoadStart}
                  onProgress={this.onProgress}
                  paused={this.state.paused}
                  ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                  resizeMode={this.state.screenType}
                  onFullScreen={this.state.isFullScreen}
                  source={{ uri: this.state.fileUri }}
                  style={styles.video}
                  volume={10} />

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
              </CardItem>

              <Form>
                <Item stackedLabel >
                  <Label>Title</Label>
                  <Input onChangeText={(text) => this.setState({ title: text })}>{this.state.title}</Input>
                  <Icon name='pencil' style={{ fontSize: 15, color: "#4169e1" }} />
                </Item>
                <Item stackedLabel >
                  <Label>Description</Label>
                  <Input onChangeText={(text) => this.setState({ description: text })} numberOfLines={2}>{this.state.description}</Input>
                  <Icon name='pencil' style={{ fontSize: 15, color: "#4169e1" }} />
                </Item>
                <Item stackedLabel >
                  <Label>Tags</Label>
                  <Input onChangeText={(text) => this.setState({ tags: text })} numberOfLines={2}>{this.state.tags}</Input>
                  <Icon name='pencil' style={{ fontSize: 15, color: "#4169e1" }} />
                </Item>
              </Form>
              <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.Updatevideo(video._id)} >
                  <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, marginTop: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
                    <MaterialCommunityIcons name="video-plus" style={{ color: 'white', fontSize: 30 }} />
                    <Text style={{ color: 'white', fontSize: 20, paddingLeft: 5 }}>Publish</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>


            </View> :
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
              <IconButton
                icon="video-plus"
                color={Colors.red300}
                size={200}
                onPress={() => this.launchImageLibrary()}
              />
              <Text note>Add video</Text>
            </View>

        }
      </View>

    );

  }
}