import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { Container, Content, Form, Label, Item, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';

export default class Tab3 extends Component {
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
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('./img/background.jpg')} style={{ height: 150, width: 360 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "#4169e1", padding: 10 }}><Icon active name='camera' style={{ color: "#4169e1", fontSize: 20 }} />Change Image</Text>
                    </TouchableOpacity>
                    <Text style={{ padding: 10, color: '#fa8072' }}>0 Followers</Text>
                </View>
                <Container style={{ padding: 20 }}>
                    <Content>
                        <Form>
                            <Item stackedLabel>
                                <Label>Channel Name</Label>
                                <Input>hh</Input>

                            </Item>
                            <Item stackedLabel>
                                <Label>Theme</Label>
                                <Input>hh</Input>

                            </Item>
                        </Form>
                        <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity>
                                <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, marginTop: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
                                    <FontAwesome5 name='user-edit' style={{ color: 'white', fontSize: 15 }} />
                                    <Text style={{ color: 'white', fontSize: 20, paddingLeft: 5 }}>Edit</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Container>
            </View>
        );
    }
}