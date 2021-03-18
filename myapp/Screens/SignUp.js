import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { View, Text, Image, Animated, Dimensions, TextInput, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { styles } from '../Styles/style';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';



const { height } = Dimensions.get("screen");


const SignUp = (props) => {
  const [login, setlogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  createAccount = () => async (props) => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "login": login,
        "email":email,
        "password": password
      })
    })
      .then(res => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem('token', data.token)
          props.navigation.replace("home")
        } catch (e) {
          console.log("error", e)
        }
      })
  }



  goback = () => {
    Actions.pop();

  }


  return (<View>
    <Image source={require('../components/img/logo2.jpg')} style={styles.logo} />

    <View style={[styles.centerAlign, {
      marginTop: 2
      , height: height
    }]}>

      <View style={styles.inputContainer}>

        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", color: '#4169e1' }}>Create Your Account</Text>

        <View style={{ flex: 1, marginTop: 5, marginBottom: 5 }}>
          <Icon style={styles.inputIcon} name={'person'} size={20} color='#4169e1' />

          <TextInput placeholder="Username" style={styles.input} value={login} onChangeText={(text) => setlogin(text)} />
          <View>
            < Icon style={styles.inputIcon} name={'mail'} size={20} color='#4169e1' />
            <TextInput selectionColor='#4169e1' placeholder="Email" keyboardType='email-address' style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />

            <View>
              <Icon style={styles.inputIcon} name={'ios-lock-closed'} size={20} color='#4169e1' />
              <TextInput secureTextEntry={true} placeholder="Password" style={styles.input} value={password} onChangeText={(text) => setpassword(text)} />

              <View>
                <Icon style={styles.inputIcon} name={'ios-lock-closed'} size={20} color='#4169e1' />
                <TextInput secureTextEntry={true} placeholder="Repeat password" style={styles.input} value={password} onChangeText={(text) => setpassword(text)} />
              </View>
              <TouchableOpacity style={styles.eye}>
                <Icon name={'eye-off-outline'} size={20} color='#888' />
              </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.eye}>
              <Icon name={'eye-off-outline'} size={20} color='#888' />
            </TouchableOpacity>

          </View>
        </View>

        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <TouchableOpacity onPress={() => this.createAccount()}>
            <LinearGradient style={{ padding: 10, borderRadius: 20, marginTop: 20, height: 50, width: 300 }} colors={['#0000ff', '#4169e1', '#fa8072']} >
              <Text style={{ color: 'white', textAlign: "center", fontWeight: 'bold', fontSize: 18 }}>SIGN UP</Text>
            </LinearGradient>
          </TouchableOpacity>




        </View>
        <View style={{ flex: 0.5, alignItems: "center" }}>
          <Text style={{ color: '#888', marginLeft: 10 }}>Already have an account?</Text>
          <TouchableOpacity style={{}} onPress={this.goback}>
            <Text style={{ color: '#4169e1', fontWeight: 'bold' }}>Sign In from here</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  </View>

  );
}
export default SignUp;
