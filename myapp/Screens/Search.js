import React,{ Component } from 'react';
import {StyleSheet,View,Text} from'react-native';
import CustomHeader from'../components/CustomHeader';

class Search extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title='Search' navigation={this.props.navigation} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Search!</Text>
        </View>
      </View>
    );
  }

}
export default Search;