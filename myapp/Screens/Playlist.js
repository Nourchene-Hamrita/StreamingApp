import React,{ Component } from 'react';
import {StyleSheet,View,Text} from'react-native';
import CustomHeader from'../components/CustomHeader';
class Playlist extends Component {

    render() {
      return (
        <View style={{ flex: 1 }}>
          <CustomHeader title='Playlists' navigation={this.props.navigation} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Playlists!</Text>
          </View>
        </View>
      );
    }
  
  }
  export default Playlist;