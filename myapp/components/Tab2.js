import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
export default class Tab2 extends Component {
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
        <Content >

          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../components/img/Profile.png')} />
                <Body>
                  <Text>channelname</Text>
                  <Text note>username</Text>
                </Body>
              </Left>
              <Right>
                <TouchableOpacity>
                  <LinearGradient style={{ flexDirection: 'row', height: 50, width: 80, padding: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
                    <Icon name='pencil' style={{ fontSize: 12, color: "white" }} />
                    <Text style={{ color: 'white', paddingLeft: 5, }}>Edit</Text>

                  </LinearGradient>
                </TouchableOpacity>
              </Right>
            </CardItem>
            <CardItem cardBody >

            </CardItem>
            <CardItem>
              <Text>title</Text>

            </CardItem>
            <CardItem>
              <Text note>description</Text>
              <Right>
                <Text style={{ color: '#aaa' }} >date</Text>
              </Right>
            </CardItem>
          </Card>

        </Content>



      </View>
    );
  }
}