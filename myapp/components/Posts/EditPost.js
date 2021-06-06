import React, { Component } from 'react';
import { View, TouchableOpacity,Alert } from 'react-native';
import CustomHeader from '../CustomHeader';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { Content, Card, CardItem, Thumbnail, Text, Button, Input, Item, Icon, Form, Left, Body, Right, Label } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import styles from './style';
import { dateParser, ChanneldateParser } from '../utils';
import { DeleteVideo, UpdateVideo } from '../../services/apis';
export default class EditPost extends Component {
    videoPlayer;
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        console.log(navigation.getParam('video','title','description', null))
        this.state = {
            loading: true,
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'content',
            video: navigation.getParam('video', null),
            newvideo: [],
            title: navigation.getParam('title', null),
            description: navigation.getParam('description', null)
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
        AndroidKeyboardAdjust.setAdjustPan();
    };
    Updatevideo(id) {
        let { title, description,video } = this.state
        console.log({
            title, description
        })
        UpdateVideo(id, { title, description })
            .then((res) => {
                console.log(res);
                this.setState({
                    video: res.data
                })
                Alert.alert('Updating','Successfully Updated !')
            }
            ).catch(err => {
                console.log(err);

            });

    }
    DeleteVideo(id) {
        DeleteVideo(id).then((res) => {
            console.log({ res })
            this.setState({
                video: res.data
            })
            alert('Successfully deleted !');
            this.props.navigation.navigate('Channel')
        }).catch(err => {
            console.log(err);
        });
    };


    render() {
        let { video,title,description } = this.state
        console.log({ video })
        return (
            <View style={{ flex: 1 }}>
                <CustomHeader title='Edit' navigation={this.props.navigation} />
                <Content >
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: video.picture }} />
                                <Body>
                                    <Text>{video.channelname}</Text>
                                    <Text note>{video.theme}</Text>

                                </Body>

                            </Left>
                            <Right>
                                <TouchableOpacity onPress={() => this.DeleteVideo(video._id)} >
                                    <MaterialCommunityIcons name='delete' style={{ color: '#fa8072', fontSize: 35 }} />
                                </TouchableOpacity>

                            </Right>

                        </CardItem>
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
                  source={{ uri:video.link }}
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
                                <Input onChangeText={(text) => this.setState({ title: text })}>{title}</Input>
                                <Icon name='pencil' style={{ fontSize: 15, color: "#4169e1" }} />
                            </Item>
                            <Item stackedLabel>
                                <Label>Description</Label>
                                <Input onChangeText={(text) => this.setState({ description: text })} numberOfLines={2}>{description}</Input>
                                <Icon name='pencil' style={{ fontSize: 15, color: "#4169e1" }} />
                            </Item>
                        </Form>
                        <CardItem>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
                                <Text note >Published At : {ChanneldateParser(video.PublishedAt)}</Text>
                            </View>
                        </CardItem>
                        <View style={{ marginBottom: 35, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.Updatevideo(video._id)} >
                                <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, marginTop: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
                                    <Icon name="pencil" style={{ color: 'white', fontSize: 20 }} />
                                    <Text style={{ color: 'white', fontSize: 20, paddingLeft: 5 }}>Edit</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </Content>

            </View>
        );
    }
}