import React,{ Component } from 'react';
import {StyleSheet,FlatList,View,TouchableOpacity} from'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from'../components/CustomHeader';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import {getVideosSearch} from '../services/apis';
import VideoItem from '../components/VideoItem';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      videos:[]
    };
  }

  componentDidMount() {
  }

loadVideo(){
  getVideosSearch().then

}
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-videocam" />
          </Item>
          
        </Header>
        <TouchableOpacity onPress={()=>this.loadVideo}>
            <LinearGradient style={{ justifyContent:'center',alignItems:'center',padding: 10, borderRadius: 20,marginTop:10,height:50,width:300,marginLeft:30 }} colors={['#4169e1', '#fa8072']}>
            <Text style={{ color: 'white' }} >Search</Text>
            </LinearGradient>
            </TouchableOpacity>
         
      </Container>
      </View>
    );
  }

}
export default Search;