import React, { Component } from 'react';
import { ScrollView,View, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { ChanneldateParser } from './utils';
import { Container, Content, Form, Label, Item, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { getInfoChannel,UpdateChannel } from '../services/apis';
export default class Tab3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            channel:null,
            newchannel:[],
            channelname:'', theme:''
           
        };
    }

    async componentDidMount() {
        AndroidKeyboardAdjust.setAdjustPan();
        await this.getData()
    }
    async getData() {
        await getInfoChannel().then((res) => {
          console.log({res})
          this.setState({
            channel: res[0]
          })
        }).catch(err => {
          console.log(err);
        });
      };
      Updatechannel(id){let {channelname, theme} = this.state
      console.log({
        theme,channelname
      })
      UpdateChannel(id, {theme,channelname })
        .then((res) => {
          console.log(res);
        }
        ).catch(err => {
          console.log(err);
  
        });
  
    }

    render() {
        let { channel } = this.state
        console.log({channel})
        return (
            <ScrollView style={{ flex: 1 }}>
                 {
                  channel != null ?
                  <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{uri:channel.picture}} style={{ height: 150, width: 360 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "#4169e1", padding: 10 }}><Icon active name='camera' style={{ color: "#4169e1", fontSize: 20 }} />Change Image</Text>
                    </TouchableOpacity>
                    <Text style={{ padding: 10, color: '#fa8072' }}>{channel.followers.length} Followers</Text>
                    <Text note>Created At : {ChanneldateParser(channel.CreatedAt)}</Text>
                </View>
                <Container style={{ padding: 20 }}>
                <Content>
                <Form>
                  <Item stackedLabel>
                    <Label>Channel Name</Label>
                    <Input  onChangeText={(text) => this.setState({ channelname: text })}>{channel.channelname}</Input>
                  </Item>
                  <Item stackedLabel>
                    <Label>Theme</Label>
                    <Input  onChangeText={(text) => this.setState({ theme: text })}> {channel.theme}</Input>
                  </Item>
                        </Form>
                        <View style={{marginTop:20,justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={()=>this.Updatechannel(this.state.channel._id)}>
                                <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, marginTop: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
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