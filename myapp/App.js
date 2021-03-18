import React, { Component } from 'react';
import { View, Text, StatusBar,} from 'react-native';
import Routes from './Screens/Routes';
import Home from './Screens/Home';
import Header from './Screens/Header';
import FirstTab from './Screens/FirstTab';
import Search from './Screens/Search';




export default class App extends Component {
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
      <>
       
        <StatusBar backgroundColor="#4169e1" barStyle="light-content" />
        <Routes />
        

      </>

    );
  }
}