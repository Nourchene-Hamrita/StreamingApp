import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { View, Text, Image, Animated, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import { styles } from '../Styles/style';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { LoginUser, getData,getInfo,getChannel} from "../services/apis";
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';


const { height } = Dimensions.get("screen");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      login: '',
      password: '',
      icon: 'eye-off-outline',
      showPassword: true,

    };
  }
  async getChannel(id) {
    getChannel(id).then((res) => {
      console.log({res})
       AsyncStorage.setItem("channel", JSON.stringify(res.data))
    }).catch(err => {
      console.log(err);
    });
  }
  async getInfo(id) {
    getInfo(id).then((res) => {
      
       AsyncStorage.setItem("user", JSON.stringify(res.data))
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Acceuil' })],
      });
      this.props.navigation.dispatch(resetAction);
    }).catch(err => {
      console.log(err);
    });
  }
  
  storeToken = async (Token, user) => {
    console.log(user)
    try {
      await AsyncStorage.setItem("token", Token)
      await this.getInfo(user),
      await this.getChannel(user)
    } catch (e) {

    }
  }
  getData() {
    getData().then((res) => {
      if (res == "e") {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Acceuil' })],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  UNSAFE_componentWillMount() {
    AndroidKeyboardAdjust.setAdjustPan()
    this.getData()
  }
  validation = () => {
    let { login, password } = this.state
    if (login == '') {
      alert('Please enter username')
      return false
    }
    else if (password == '') {
      alert('Please enter password')
      return false
    }
    else return true
  }
  handleLogin = () => {
    let { login, password } = this.state
    if (this.validation()) {
      LoginUser({
        login,
        password
      }).then((res) => {
        if (res.data.token != null || res.data.token != undefined) {
          this.storeToken(res.data.token, res.data.user)
        }
        else {
          if (res.data.errors.login == "Unknown login") {
            alert('Unknown login ')
          }
          else
            alert("Incorrect password")

        }
      }).catch(err => {
        console.log(err);
      });
    }

  };
  changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline',
      showPassword: !prevState.showPassword
    }));

  };


  render() {
    return (
      <ScrollView>

        <Image source={require('../components/img/logo2.jpg')} style={styles.logo} />

        <View style={[styles.centerAlign, { marginTop: 2, height: height }]}>

          <View style={styles.inputContainer}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", color: '#4169e1' }}>Sign In Now</Text>

            <View style={{ marginTop: 10, marginBottom: 30 }}>

              <Icon style={styles.inputIcon} name={'person'} size={25} color='#4169e1' />

              <TextInput placeholder="Username"

                style={styles.input} onChangeText={(text) => this.setState({ login: text })} />

              <View>
                <Icon style={styles.inputIcon} name={'ios-lock-closed'} size={25} color='#4169e1' />

                <TextInput secureTextEntry={this.state.showPassword} placeholder="Password"

                  style={styles.input} onChangeText={(text) => this.setState({ password: text })} />

              </View>

              <TouchableOpacity style={styles.eye} onPress={() => this.changeIcon()}>
                <Icon name={this.state.icon} size={20} color='#888' />
              </TouchableOpacity>

            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>

              <Checkbox style={{ width: 20, height: 20, borderColor: "#aaa" }} />
              <Text style={{ color: '#888', marginTop: 8 }}>Remember me</Text>


              <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 8 }}>
                <TouchableOpacity>
                  <Text style={{ color: "#fa8072" }}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center", marginBottom: 30 }}>


              <TouchableOpacity onPress={this.handleLogin}>
                <LinearGradient style={{ padding: 10, borderRadius: 20, marginTop: 20, height: 50, width: 300 }} colors={['#0000ff', '#4169e1', '#fa8072']} >
                  <Text style={{ color: 'white', textAlign: "center", fontWeight: 'bold', fontSize: 18 }}>SIGN IN</Text>
                </LinearGradient>
              </TouchableOpacity>


            </View>
            <View style={{ flex: 0.5, alignItems: "center" }}>
              <Text style={{ color: '#888', marginTop: 20 }}>Still not connected?</Text>
              <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={{ color: '#4169e1', fontWeight: 'bold' }}>Sign Up from here</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </ScrollView>


    )

  }
}





