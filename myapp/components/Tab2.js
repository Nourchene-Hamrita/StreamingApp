import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Button, Item, Input, Icon, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Posts/style';
import { getInfoChannel, getInfoUser, CommentVideo, getVideosList, getComments, getInfoVideo, dislikeVideo, likeVideo } from '../services/apis';
import { dateParser } from './utils';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
export default class Tab2 extends Component {
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
      loading: true,
      channel: null,
      profile: null,
      videos: [],
      comments: [],
      video: [],
      likers: [],
      dislikers: [],
      text: ''
    };
  };
  Item(id, channelname, link, title, description, picture, theme, PublishedAt, likers, dislikers, comments,tags, index) {
    return (<Content >

      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: picture }} />
            <Body>
              <Text>{channelname}</Text>
              <Text note>{theme}</Text>
            </Body>
          </Left>
          <Right>
            <TouchableOpacity onPress={() => this.getVideo(id)}>
              <LinearGradient style={{ flexDirection: 'row', height: 40, width: 80, padding: 5, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
                <Icon name='pencil' style={{ fontSize: 12, color: "white" }} />
                <Text style={{ color: 'white', paddingLeft: 5, }}>Edit</Text>

              </LinearGradient>
            </TouchableOpacity>
          </Right>
        </CardItem>
        <CardItem cardBody >
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
            mainColor="#332"
            onFullScreen={this.onFullScreen}
            onPaused={() => this.onPaused(index)}
            onReplay={this.onReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}
            toolbar={this.renderToolbar()} />
        </CardItem>
        <CardItem>
          <Text numberOfLines={1} style={{ color: "#fa8072" }}>{tags}</Text>
          </CardItem>
        <CardItem>
          <Text>{title}</Text>

        </CardItem>
        <CardItem>
          <Text note>{description}</Text>
        </CardItem>
        <CardItem >

          <Left>

            <Button transparent onPress={() => this.like(id)}>
              <Icon active name="thumbs-up" />
              <Text style={{ marginLeft: 5 }}>{likers}</Text>
            </Button>


          </Left>
          <Left>

            <Button transparent onPress={() => this.dislike(id)}>
              <Icon active name="thumbs-down" />
              <Text style={{ marginLeft: 5 }}>{dislikers}</Text>
            </Button>


          </Left>
          <Body>

            <Button transparent onPress={() => this.commentVideo(id)}>
              <Icon active name="chatbubbles" />
              <Text>{comments}</Text>
            </Button>

          </Body>
          <Right>
            <Text style={{ color: '#aaa' }} >{dateParser(PublishedAt)}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Item rounded style={{ marginBottom: 10 }} >
            <Input style={{ fontSize: 15 }} placeholder='Add a comment' onChangeText={(text) => this.setState({ text: text })} />
            <Icon style={{ color: "#fa8072" }} active name='send' onPress={() => this.AddComment(id)} />
          </Item>

        </CardItem>
      </Card>

    </Content>



    )
  }
  renderItem = ({ item, index }) => (
    this.Item(item._id, item.channelname, item.link, item.title, item.description, item.picture, item.theme, item.PublishedAt, item.likers.length, item.dislikers.length, item.comments.length,item.tags,index)
  );


  async componentDidMount() {
    await this.getData(),
      await this.VideoList(this.state.channel._id)
    await this.getUser()
  };
  async getData() {
    await getInfoChannel().then((res) => {
      console.log({ res })
      this.setState({
        channel: res[0]
      })
    }).catch(err => {
      console.log(err);
    });
  };
  getUser() {
    getInfoUser().then((res) => {
      console.log(res)
      this.setState({
        profile: res
      })
    }).catch(err => {
      console.log(err);
    });
  };
  async VideoList(id) {
    let paused = []
    await getVideosList(id).then((res) => {
      console.log({ res })
      res.data.map((t) => {
        paused.push(true)
      })
      this.setState({
        paused: paused,
        videos: res.data
      })
    }).catch(err => {
      console.log(err);
    });
  };
  getVideo(id) {
    getInfoVideo(id).then((res) => {
      console.log({ res })
      this.setState({
        video: res.data
      })
      this.props.navigation.navigate('EditVideo', { video: res.data })
    }).catch(err => {
      console.log(err);
    });
  };
  like(id) {
    likeVideo(id, { id: this.state.profile._id }).then((res) => {

      this.setState({
        likers: res.data
      })
    }).catch(err => {
      console.log(err);
    });
  }
  dislike(id) {
    dislikeVideo(id, { id: this.state.profile._id }).then((res) => {

      this.setState({
        dislikers: res.data
      })
    }).catch(err => {
      console.log(err);
    });
  }

  commentVideo(id) {
    getComments(id).then((res) => {
      console.log({ res })

      this.setState({

        comments: res.data
      })
      this.props.navigation.navigate('AddComment', { comments: res.data })
    }).catch(err => {
      console.log(err);
    });
  }
  AddComment(id) {
    let { text, profile } = this.state
    console.log({
      id,
      CommenterId: profile._id,
      commenterPseudo: profile.login,
      picture: profile.picture,
      text,
    })
    CommentVideo(id, { CommenterId: profile._id, commenterPseudo: profile.login, picture: profile.picture, text })
      .then((res) => {
        console.log(res);
      }
      ).catch(err => {
        console.log(err);

      });

  }
  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };
  onPaused = (index) => {
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



  renderToolbar = () => (
    <View >
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });



  render() {
    let { videos } = this.state
    console.log({ videos })
    return (
      <SafeAreaView style={{ flex: 1 }}>
         {
         this.state.videos.length>0?
        <FlatList
          data={videos}
          renderItem={this.renderItem}

          keyExtractor={item => item._id}
        />
        :
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
        <Text note style={{fontSize:20,color:'#fa8072'}} >You haven't added content yet!</Text>
        </View>
    }
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