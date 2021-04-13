import React,{ Component } from 'react';
import {StyleSheet,TouchableOpacity} from'react-native';
import CustomHeader from'../components/CustomHeader';
import { Container, Header, Right, Button, DeckSwiper, Card, View, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
const cards = [
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
]
class Playlist extends Component {
 


 
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount() {
    let isLoading = []
    let paused = []
    let isFullScreen = []
    let currentTime = []
    let duration = []
    let playerState = []
    let screenType = []
  }

  render() {
    return (
      <Container>
        <CustomHeader title='Playlists' isHome={true} navigation={this.props.navigation} />
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
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

               <Text>HHH</Text>
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
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



  export default Playlist;