import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import axios from 'axios';
import { View, Text, Image, Animated, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import { styles } from '../Styles/style';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { API_URL } from'@env';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';


const { height } = Dimensions.get("screen");

const Login = () => {

  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');

  handleLogin = () => {

    axios({
      method: 'post',
      url: `http://192.168.1.11:5000/users/login`,
      withCredentials: true,
      data: {
        login,
        password
      },
    }).then((res) => {
      console.log(res)


    }).catch(err => {
      console.log(err);

    });


  }

  signUp = () => {
    Actions.signup()

  }


  return (
    <View>

      <Image source={require('../components/img/logo2.jpg')} style={styles.logo} />

      <View style={[styles.centerAlign, { marginTop: 2, height: height }]}>

        <View style={styles.inputContainer}>

          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", color: '#4169e1' }}>Sign In Now</Text>

          <View style={{ marginTop: 10, marginBottom: 30 }}>

            <Icon style={styles.inputIcon} name={'person'} size={25} color='#4169e1' />

            <TextInput placeholder="Username"

              style={styles.input} value={login} onChangeText={(text) => setlogin(text)} />

            <View>
              <Icon style={styles.inputIcon} name={'ios-lock-closed'} size={25} color='#4169e1' />

              <TextInput secureTextEntry={true} placeholder="Password"

                style={styles.input} value={password} onChangeText={(text) => setpassword(text)} />

            </View>

            <TouchableOpacity style={styles.eye}>
              <Icon name={'eye-off-outline'} size={20} color='#888' />
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
            <TouchableOpacity style={{}} onPress={this.signUp}>
              <Text style={{ color: '#4169e1', fontWeight: 'bold' }}>Sign Up from here</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </View>


  )

}



export default Login;