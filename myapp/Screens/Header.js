import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons';
import Search from '../Screens/Search';
import { styles } from '../Styles/style';

export default function Header({ navigation }) {


  const openMenu = () => {
    navigation.openDrawer();

  }
  return (
    <View style={styles.header}
    >

      <Icon style={styles.menu} name='menu' size={30} color='#4169e1' onPress={openMenu} />

      <View style={{
        position:"relative",
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:150,
        marginLeft:200,
        
      }}>

        <TouchableOpacity>
          <Icon name='video-plus' size={35} color='#4169e1' />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicon name='search' size={30} color='#4169e1' />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicon name='bookmark-outline' size={30} color='#4169e1' />
        </TouchableOpacity>

      </View>

      <Text style={styles.headerText}>Home</Text>


    </View>
  );
};

