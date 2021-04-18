import React, { Component } from 'react';
import { View } from 'react-native';
import CustomHeader from'../components/CustomHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import Tab1 from'../components/Tab1';
import Tab2 from '../components/Tab2';
import Tab3 from '../components/Tab3';
import { getInfoChannel } from '../services/apis';


export default class Channel extends Component {
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
            <CustomHeader title='My Channel' isHome={true} navigation={this.props.navigation} />
            <Container >
        
        <Tabs >
          <Tab  heading={ <TabHeading style={{backgroundColor:'#4169e1'}}><MaterialCommunityIcons name='video-plus' size={26} style={{color:'white'}}/><Text>Create</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor:'#4169e1'}}><Icon name="apps" style={{fontSize:18}} /><Text>My Videos</Text></TabHeading>}>
            <Tab2 />
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor:'#4169e1'}}><Icon name="pencil" style={{fontSize:15}} /><Text>Edit</Text></TabHeading>}>
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    
       </View>
     );
   }
}