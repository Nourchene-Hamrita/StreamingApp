import React, { Component } from 'react';
import { View, Image } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Container, Content, Form, Label, Item, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import FontAwesome5 from'react-native-vector-icons/FontAwesome5';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,


    };
  }
  componentDidMount() {
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Profile' navigation={this.props.navigation} />
        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../components/img/Profile.png')} style={{ backgroundColor:'#4169e1',height: 120, width: 120, borderRadius: 60 }} />
          <Text>Username</Text>
        </View>
        <Container>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Firstname</Label>
                <Input />
              </Item>
              <Item floatingLabel>

                <Label>Lastname</Label>
                <Input />
              </Item>
              <Item floatingLabel >
                <Label>Age
                    </Label>
                <Input keyboardType="numeric" />
              </Item>
              <Item floatingLabel>

                <Label>Email</Label>
                <Icon active name='mail' style={{ color: "#4169e1" }} />
                <Input keyboardType="email-address" />
              </Item>
              <Item floatingLabel last >
                <Label  >Password</Label>
                <Icon active name='ios-lock-closed' style={{ color: "#4169e1" }} />
                <Input />
              </Item>
              
            </Form>
            <View style={{ marginTop:40,paddingLeft:140,justifyContent: 'center', alignItems: 'center' }}>
              <Button rounded iconLeft style={{ backgroundColor: "#4169e1" }}  >
                <FontAwesome5 name='user-edit'style={{color:'white',fontSize:15,paddingLeft:10}} />
                <Text style={{}}>Edit</Text>
              </Button>
              </View>
          </Content>
        </Container>


      </View>
    );
  }

}
export default ProfileScreen;