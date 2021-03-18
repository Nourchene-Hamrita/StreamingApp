import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from '../Screens/Search';

export default class Header extends Component {


  componentDidMount() {
  }

  render() {
    return (
      <View style={{
      }}>
        <View style={{elevation:4,
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: 180,
          marginLeft: 180,
          margin: 5
        }}>
          <TouchableOpacity>
            <Icon name='video-plus' size={35} color='#4169e1' />
          </TouchableOpacity>
          <TouchableOpacity>
          <Ionicon name='search' size={30} color='#4169e1'  />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicon name='bookmark-outline' size={30} color='#4169e1' />
          </TouchableOpacity>
          
        </View>

      </View>
    );
  }
}