import React, { Component } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { SearchVideos } from '../services/apis';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      videos: [],
      tag: ''
    };
  }

  componentDidMount() {
  }

  getVideo(tag) {
    
    console.log(tag)
    SearchVideos({ tag })
      .then((res) => {
        console.log({ res })
        this.setState({
          videos: res.data

        });
       
      }).catch((err) => {
        console.log(err);
      });



  }
  render() {
     let { tag } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Enter a tag" onChangeText={(text) => this.setState({ tag: text })} />

            </Item>

          </Header>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <TouchableOpacity onPress={() => this.getVideo(tag)}>
              <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
                <Icon name='ios-videocam' style={{ color: 'white', fontSize: 20 }} />
                <Text style={{ color: 'white', fontSize: 20, paddingLeft: 5 }}>Search</Text>
              </LinearGradient>

            </TouchableOpacity>
          </View>
        </Container>
      </View>
    );
  }

}
export default Search;