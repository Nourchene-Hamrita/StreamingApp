import React, { Component } from 'react';
import { View, Image, Touchable, TouchableOpacity,ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Container, Content, Form, Label, Item, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import FontAwesome5 from'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import  {getInfoUser} from '../services/apis'
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile:null


    };
  }
  async componentDidMount() {
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
  }



  render() {
    let { profile } = this.state
    return (
      <ScrollView style={{ flex: 1 }}>
         {
          profile != null ?
          <View>
        <CustomHeader title='Profile' navigation={this.props.navigation} />
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{uri:profile.picture}} style={{ height: 120, width: 120, borderRadius: 60 }} />
        </View>
        <Container>
          <Content>
            <Form>
            <Item stackedLabel>
                <Label>Username</Label>
                <Input> {profile.login}</Input>
              </Item>
              <Item stackedLabel>
                <Label>Firstname</Label>
                <Input> {profile.fisrtname}</Input>
              </Item>
              <Item stackedLabel>

                <Label>Lastname</Label>
                <Input> {profile.lastname}</Input>
              </Item>
              <Item stackedLabel >
                <Label>Age
                    </Label>
                <Input keyboardType="numeric" />
              </Item>
              <Item stackedLabel >
                <Label>Country
                    </Label>
                <Input/>
              </Item>
              <Item stackedLabel>

                <Label>Email</Label>
                <Icon active name='mail' style={{ color: "#4169e1" }} /> 
                <Input keyboardType="email-address">{profile.email}</Input>
               
              </Item>
              <Item stackedLabel last >
                <Label  >Password</Label>
                <Icon active name='ios-lock-closed' style={{ color: "#4169e1" }} />
                <Input>{profile.password}</Input>
              </Item>
              
            </Form>
            <View style={{ marginTop:40,justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity>
            <LinearGradient style={{ flexDirection:'row', height: 50, width: 150 ,padding:10, borderRadius: 30,justifyContent:'center',alignItems:'center'}} colors={['#4169e1', '#fa8072']}> 
                <FontAwesome5 name='user-edit'style={{color:'white',fontSize:15}} />
                <Text style={{color:'white',fontSize:20,paddingLeft:5}}>Edit</Text>
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