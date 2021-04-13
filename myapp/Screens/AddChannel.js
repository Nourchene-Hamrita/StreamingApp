import React, { Component } from 'react';
import { View,ScrollView,TouchableOpacity,Image } from 'react-native';
import CustomHeader from'../components/CustomHeader';
import { Container, Content, Form, Label, Item, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
export default class AddChannel extends Component {
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
       <ScrollView style={{ flex: 1 }}>
            <CustomHeader title='Create Channel' navigation={this.props.navigation} />
              <Container>
                <Content>
                  <Form>
                    <Item floatingLabel>
                      <Label>Channel Name</Label>
                      <Input/>
                      <Icon active name='pencil' style={{ color: "#4169e1", fontSize: 20 }} />
                    </Item>
                    <Item floatingLabel>
                      <Label>Theme</Label>
                      <Input/>
                      <Icon active name='pencil' style={{ color: "#4169e1", fontSize: 20 }} />
                    </Item>
                  </Form>
                  <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Channel')}>
                      <LinearGradient style={{ flexDirection: 'row', height: 50, width: 150, padding: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }} colors={['#4169e1', '#fa8072']}>
                        <FontAwesome5 name='plus' style={{ color: 'white', fontSize: 15 }} />
                        <Text style={{ color: 'white', fontSize: 20, paddingLeft: 5 }}>Create</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </Content>
              </Container>

            
        
       </ScrollView>
     );
   }
}