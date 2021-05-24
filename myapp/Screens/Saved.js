import React, { Component } from 'react';
import { View,FlatList,TouchableOpacity } from 'react-native';
import CustomHeader from'../components/CustomHeader';
import {getInfoUser, getSavedVideos,DeleteFromSave} from'../services/apis';
import styles from '../components/Posts/style';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SavedScreen extends Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
      saved: [],
      newSaved:[],
      profile:null,
    };
  }
 
  async componentDidMount() {
    await this.getData();
    await this.SavedVideo(this.state.profile._id)
  }
  Item(id, channelname, picture, theme, link, title, description,index) {
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
            <TouchableOpacity onPress={()=>this.DeleteSaved(id)} >
                <LinearGradient style={{ padding: 10, flexDirection: 'row', height: 40, width: 90, padding: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}} colors={['#4169e1', '#fa8072']}>
                  <MaterialCommunityIcons name='delete'style={{ color: 'white', fontSize: 15 }}/>
                  <Text style={{ color: 'white' }}>Delete</Text>
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
              <Right style={{ marginLeft: 260 }}>
                <TouchableOpacity onPress={() => this.DeleteSaved(id)}>
                  <Ionicons name='bookmark' size={25} style={{ color: "#fa8072" }} />
                </TouchableOpacity>
              </Right>
            </CardItem>
          <CardItem>
            <Text>{title}</Text>
          </CardItem>
          <CardItem>
            <Text note numberOfLines={2}>{description}</Text>
          </CardItem>
          
          </Card>
      </Content>
    )
  }

  renderItem = ({ item, index }) => (
    this.Item(item._id,item.channelname, item.picture, item.theme, item.link, item.title, item.description,item.tags,index)
  );
 async getData() {
   await getInfoUser().then((res) => {
      console.log(res)
      this.setState({
        profile: res
      })
    }).catch(err => {
      console.log(err);
    });
  };
 async SavedVideo(id) {
  let paused = []
    await  getSavedVideos(id).then((res) => {
      console.log({ res} )
      res.data.map((t) => {
        paused.push(true)})
      this.setState({
        paused: paused,
        saved: res.data
      })
     
    }).catch(err => {
      console.log(err);
    });
  };
  DeleteSaved(id){
   DeleteFromSave(id).then((res) => {
    console.log({ res })
    this.setState({
      saved:this.state.saved.filter(item=>item._id!==id)  
    })
    alert('Successfully deleted !')
  }).catch(err => {
    console.log(err);
  });
};

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
       <View style={{ flex: 1 }}>
             <CustomHeader title='Saved' navigation={this.props.navigation}  />
             {
         this.state.saved.length>0?
             <FlatList
          data={this.state.saved}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
        />
        :
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
        <Text note style={{fontSize:20,color:'#fa8072'}} >There are no saved yet!</Text>
        </View>
    }
       </View>
     );
   }
}