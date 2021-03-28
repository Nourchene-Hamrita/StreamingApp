import React,{ Component } from 'react';
import {StyleSheet,View} from'react-native';
import CustomHeader from'../components/CustomHeader';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

class Search extends Component {
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
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-videocam" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
      
      </View>
    );
  }

}
export default Search;