import React, { Component } from 'react';
import { View, } from 'react-native';
import { Text } from 'native-base';
import { IconButton, Colors } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
  }
  ChooseVideo() {
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
      console.log(video);
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

        <IconButton
          icon="video-plus"
          color={Colors.red300}
          size={200}
          onPress={() => this.ChooseVideo()}
        />
        <Text note>Add video</Text>


      </View>
    );
  }
}