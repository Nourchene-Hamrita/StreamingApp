import React, { Component } from 'react';
import { View } from 'react-native';
import CustomHeader from'../components/CustomHeader';
import { Container,Item,Input, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    AndroidKeyboardAdjust.setAdjustPan();
  }

   render() {
     return (
       <View style={{ flex: 1 }}>
            <CustomHeader title='Add Comment' navigation={this.props.navigation} />
            <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../components/img/Profile.png')} />
                <Body>
                  <Text>username</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
               
            <Text>COMMENT</Text>
              </Body>
            </CardItem>
          </Card>
          <Item rounded>
            <Input placeholder='Rounded Textbox'/>
          </Item>
        </Content>
      </Container>
     
       </View>
     );
   }
}