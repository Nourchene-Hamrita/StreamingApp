import React, { Component } from 'react';
import { View, Image, FlatList,StyleSheet,SafeAreaView,StatusBar  } from 'react-native';
import { Button, Text } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import Post from '../components/Posts/Post'
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
   
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Post/>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const renderItem = ({ item }) => (
  <Item title={item.title} />
);
class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data:[]
    };
  }

  componentDidMount() {
  }

  
render(){
  return (
    <View style={{flex:1}}>
       <CustomHeader title='Home' isHome={true} navigation={this.props.navigation}  />
      <Post navigation={this.props.navigation}/>
      </View>)
}}



export default HomeScreen;








