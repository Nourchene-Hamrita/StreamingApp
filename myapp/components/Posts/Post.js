import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import styles from './style';
import { dateParser } from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { getVideos, likeVideo, getInfoUser, dislikeVideo, getComments, CommentVideo,followChannel,SaveVideos } from "../../services/apis";
import LinearGradient from 'react-native-linear-gradient';
import { Content, Card, CardItem, Thumbnail, Text, Button,Item,Input, Icon, Left, Body, Right } from 'native-base';


export default class Post extends Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
      dataSource: [],
      likers: [],
      dislikers: [],
      following:[],
      text: '',
      profile: null,
      comments: [],
      channel: [],
      saved:[],
      icon:'bookmark-outline'
    };
  }
  Item(id,channelId, channelname, picture, theme, link, title, description, PublishedAt, likers, dislikers, comments,category,index) {
    //console.log(id)
    return (

      <Content >
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
              <TouchableOpacity onPress={()=>this.follow(this.state.profile._id,channelId,channelname,this.state.profile._id,picture,theme)}>
                <LinearGradient style={{ padding: 10, borderRadius: 20, }} colors={['#4169e1', '#fa8072']}>
                  <Text style={{ color: 'white' }}>Follow</Text>
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
            <Text>{title}</Text>
            <Right style={{ marginLeft: 260 }}>
              <TouchableOpacity onPress={()=>this.SaveVideos(channelname,picture,theme,title,description,link,category)}>
                <Ionicons name={this.state.icon} size={25} style={{ color: "#fa8072" }} />
              </TouchableOpacity>
            </Right>
          </CardItem>
          <CardItem>
            <Text note numberOfLines={2}>{description}</Text>
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
              <Text note >{dateParser(PublishedAt)}</Text>
            </Right>
          </CardItem>
          <CardItem>
          <Item rounded style={{ marginBottom: 10 }} >
          <Input style={{fontSize:15}}placeholder='Add a comment' onChangeText={(text) => this.setState({ text: text })} />
          <Icon style={{ color: "#fa8072" }} active name='send' onPress={() => this.AddComment(id)} />
        </Item>

          </CardItem>
        </Card>

      </Content>
    )
  }

  renderItem = ({ item, index }) => (
    this.Item(item._id,item.channelId, item.channelname, item.picture, item.theme, item.link, item.title, item.description, item.PublishedAt,
      item.likers.length, item.dislikers.length, item.comments.length,item.category,index)
  );
  UNSAFE_componentWillMount() {

    this.getVideos()
  }
  async componentDidMount() {
    await this.getData();
    AndroidKeyboardAdjust.setAdjustPan();

  }
  getVideos() {
    let isLoading = []
    let paused = []
    let isFullScreen = []
    let currentTime = []
    let duration = []
    let playerState = []
    let screenType = []
    this.setState({ Loading: true })
    getVideos()
      .then((res) => {
        console.log({ res })
        res.data.map((t) => {
          paused.push(true)
        })
        this.setState({
          paused: paused,
          dataSource: res.data,
          Loading: false
        })


      }).catch((err) => {
        console.log(err);
      });

  }
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
  follow(id,idToFollow,channelname,userId,picture,theme){
    followChannel(id,{idToFollow,channelname,userId,picture,theme}).then((res) => {
      this.getVideos();
      this.setState({
        following: res.data
      })
    }).catch(err => {
      console.log(err);
    });
  }

  like(id) {
    likeVideo(id, { id: this.state.profile._id }).then((res) => {
      this.getVideos();
      this.setState({
        likers: res.data
      })
    }).catch(err => {
      console.log(err);
    });
  }
  dislike(id) {
    dislikeVideo(id, { id: this.state.profile._id }).then((res) => {
      this.getVideos();
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
      this.getVideos();
      this.setState({

        comments: res.data
      })
      this.props.navigation.navigate('AddComment',{comments:res.data,dataSource: res.data})
    }).catch(err => {
      console.log(err);
    });
  };
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
        this.getVideos();
      }
      ).catch(err => {
        console.log(err);

      });

  }
  SaveVideos(channelname,picture,theme,title,description,link,category){
    SaveVideos({ UserId: this.state.profile._id,channelname,picture,theme,title,description,link,category}).then((res) => {
      this.getVideos();
      this.setState(prevState => ({
        icon:prevState.icon === 'bookmark' ? 'bookmark-outline' : 'bookmark',
        saved:res.data
      }))
       
      this.props.navigation.navigate({saved:res.data}) 
    
    }).catch(err => {
      console.log(err);
    });
  }

  
  DisplayLoading() {
    if (this.state.Loading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
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
    return (
      <SafeAreaView style={Styles.container}>
        {this.DisplayLoading()}
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
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
