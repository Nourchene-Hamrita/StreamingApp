import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import CustomHeader from '../CustomHeader';
import styles from './style';
import { dateParser } from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { getInfoChannel } from "../../services/apis";
import LinearGradient from 'react-native-linear-gradient';
import { Content, Card, CardItem, Thumbnail, Text, Button, Item, Input, Icon, Left, Body, Right } from 'native-base';
export default class UploadPost extends Component {
    videoPlayer;
    constructor(props) {
        super(props);
        const { navigation } = this.props;
       
        this.state = {
            loading: true,
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: true,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'content',
            title: '',
            description: '',
            channel: null,
        };
    }
  

    async componentDidMount() {
        AndroidKeyboardAdjust.setAdjustPan();
        await this.getData();
    };
    async getData() {
        await getInfoChannel().then((res) => {
            console.log({ res })
            this.setState({
                channel: res
            })
        }).catch(err => {
            console.log(err);
        });
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



    renderToolbar = () => (
        <View >
            <Text> toolbar </Text>
        </View>
    );
    onSeeking = currentTime => this.setState({ currentTime });


    render() {
        let { channel } = this.state
      
        return (
            <View style={{ flex: 1 }}>
                <CustomHeader title='Upload Video' navigation={this.props.navigation} />
                <Content >
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri:channel.picture }} />
                                <Body>
                                    <Text>{channel.channelname}</Text>
                                    <Text note>{channel.theme}</Text>

                                </Body>

                            </Left>
                        </CardItem>
                        <CardItem cardBody >
                            <Video onEnd={this.onEnd}
                                onLoad={this.onLoad}
                                onLoadStart={this.onLoadStart}
                                onProgress={this.onProgress}
                                paused={this.state.paused}
                                ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                                resizeMode={this.state.screenType}
                                onFullScreen={this.state.isFullScreen} volume={10}
                                source={{ uri: video.link }}
                                style={styles.video} resizeMode={'cover'}
                                repeat={true} />
                            <MediaControls
                                duration={this.state.duration}
                                isLoading={this.state.isLoading}
                                mainColor="#332"
                                onFullScreen={this.onFullScreen}
                                onPaused={() => this.onPaused()}
                                onReplay={this.onReplay}
                                onSeek={this.onSeek}
                                onSeeking={this.onSeeking}
                                playerState={this.state.playerState}
                                progress={this.state.currentTime}
                                toolbar={this.renderToolbar()} />

                        </CardItem>

                        <Form>
                            <Item >
                                <Input onChangeText={(text) => this.setState({ title: text })}>{this.state.title}</Input>
                                <Icon name='pencil' style={{ fontSize: 15, color: "#4169e1" }} />
                            </Item>
                            <Item >
                                <Input onChangeText={(text) => this.setState({ description: text })} numberOfLines={2}>{this.state.description}</Input>
                                <Icon name='pencil' style={{ fontSize: 15, color: "#4169e1" }} />
                            </Item>
                        </Form>
                    </Card>
                </Content>

            </View>
        );
    }
}
