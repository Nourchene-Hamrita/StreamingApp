import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import { IconButton, Colors } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fileUri: ''
    };
  }

  componentDidMount() {
  }
  /*ChooseVideo() {
    ImagePicker.openPicker({
      mediaType: "any",
    }).then((video) => {
      console.log(video);
    });
  }*/
  launchImageLibrary = () => {
    let options = {
      title: 'Image Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'videos'
      },
      
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      }
      else if (response.error) {
        console.log('image picker error', response.error);

      } else if (response.customButton) {
        console.log('user tapped custom button', response.customButton);
      }
      else {
         console.log({response})
        this.setState({ fileUri: response.uri });
        console.log(this.state.fileUri)
      }

    })
  };
  renderFileUri() {
    if (this.state.fileUri) {
      return (
        <View>
          <Image source={{ uri: this.state.fileUri }} />
        </View>
      )
    }
  }



  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

        <IconButton
          icon="video-plus"
          color={Colors.red300}
          size={200}
          onPress={() => this.launchImageLibrary()}
        />
        <Text note>Add video</Text>
        {this.renderFileUri()}

      </View>
    );
  }
}