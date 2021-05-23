import React, { Component } from 'react';
import { View, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Container, Content, Form, Label, Item, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { getInfoUser, UpdateUser, UploadImage } from '../services/apis';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import ImagePicker from 'react-native-image-crop-picker';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: null,
      newProfile: [],
      login: '',
      email: '',
      country: '',
      age: 0,
      firstname: '',
      lastname: ''




    };
  }
  async componentDidMount() {
    AndroidKeyboardAdjust.setAdjustPan();
    await this.getData()
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
  UpdateProfile(id) {
    let { login,
      email,
      country,
      age,
      firstname,
      lastname } = this.state
    console.log({
      login,
      email,
      country,
      age,
      firstname,
      lastname

    })
    UpdateUser(id, {
      login,
      email,
      country,
      age,
      firstname,
      lastname
    })
      .then((res) => {
        console.log(res);
        this.setState({
          newProfile: res.data
        })
        alert('Successfully Updated !')
      }
      ).catch(err => {
        console.log(err);

      });

  };
  ChoosePhoto() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      UploadImage(image)
    });
  }




  render() {
    let { profile } = this.state
    return (
      <ScrollView style={{ flex: 1 }}>
        {
          profile != null ?
            <View>
              <CustomHeader title='Profile' navigation={this.props.navigation} />
              <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: profile.picture }} style={{ height: 120, width: 120, borderRadius: 60 }} />
                <TouchableOpacity onPress={() => this.ChoosePhoto()}>
                  <Text style={{ color: "#4169e1", padding: 10 }}><Icon active name='camera' style={{ color: "#4169e1", fontSize: 20 }} />Change Image</Text>
                </TouchableOpacity>
              </View>
              <Container>
                <Content>
                  <Form>
                    <Item stackedLabel>
                      <Label>Username</Label>
                      <Icon active name='person' style={{ color: "#4169e1", fontSize: 20 }} />
                      <Input onChangeText={(text) => this.setState({ login: text })}> {profile.login}</Input>
                    </Item>
                    <Item stackedLabel>
                      <Label>Firstname</Label>
                      <Icon active name='pencil' style={{ color: "#4169e1", fontSize: 20 }} />
                      <Input onChangeText={(text) => this.setState({ firstname: text })}> {profile.firstname}</Input>
                    </Item>
                    <Item stackedLabel>
                      <Label>Lastname</Label>
                      <Icon active name='pencil' style={{ color: "#4169e1", fontSize: 20 }} />
                      <Input onChangeText={(text) => this.setState({ lastname: text })}> {profile.lastname}</Input>
                    </Item>
                    <Item stackedLabel >
                      <Label>Age
                    </Label>
                      <Icon active name='pencil' style={{ color: "#4169e1", fontSize: 20 }} />
                      <Input keyboardType="numeric" onChangeText={(text) => this.setState({ age: text })} >{profile.age}</Input>
                    </Item>
                    <Item stackedLabel >
                      <Label>Country
                    </Label>
                      <Icon active name='flag' style={{ color: "#4169e1", fontSize: 20 }} />
                      <Input onChangeText={(text) => this.setState({ country: text })}> {profile.country}</Input>
                    </Item>
                    <Item stackedLabel>

                      <Label>Email</Label>
                      <Icon active name='mail' style={{ color: "#4169e1", fontSize: 20 }} />
                      <Input onChangeText={(text) => this.setState({ email: text })} keyboardType="email-address">{profile.email}

                      </Input>
                    </Item>
                  </Form>
                  <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.UpdateProfile(profile._id)}>
                      <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
                        <FontAwesome5 name='user-edit' style={{ color: 'white', fontSize: 15 }} />
                        <Text style={{ color: 'white', fontSize: 20, paddingLeft: 5 }}>Edit</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </Content>
              </Container>

            </View>
            :
            null
        }
      </ScrollView>
    );
  }

}
export default ProfileScreen;
/*<Item stackedLabel last >
                      <Label  >Password</Label>
                      <Icon active name='ios-lock-closed' style={{ color: "#4169e1", fontSize: 20 }} />
                      <Input>{profile.password}
                      </Input>
                    </Item>*/