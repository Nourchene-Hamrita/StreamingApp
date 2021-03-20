import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { View, Text, Image, Animated, Dimensions, TextInput, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { styles } from '../Styles/style';
import LinearGradient from 'react-native-linear-gradient';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { registerUser } from "../service/apis";


const { height } = Dimensions.get("screen");

export default class signUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      login: '',
      password: '',
      email: ''
    };
  }

  componentDidMount() {
    AndroidKeyboardAdjust.setAdjustPan()
  }
  handleRegister = () => {
    let { login, email, password } = this.state

    registerUser({
      login,
      email,
      password
    }).then((res) => {
      console.log(res)
    }).catch(err => {
      console.log(err);

    });


  }



  goback = () => {
    Actions.pop();

  }

  render() {
    return (
      <View>
        <Image source={require('../components/img/logo2.jpg')} style={styles.logo} />

        <View style={[styles.centerAlign, {
          marginTop: 2
          , height: height
        }]}>

          <View style={styles.inputContainer}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: "center", color: '#4169e1' }}>Create Your Account</Text>

            <View style={{ flex: 1, marginTop: 5, marginBottom: 5 }}>
              <Icon style={styles.inputIcon} name={'person'} size={20} color='#4169e1' />

              <TextInput placeholder="Username" style={styles.input} onChangeText={(text) => this.setState({ login: text })} />
              <View>
                < Icon style={styles.inputIcon} name={'mail'} size={20} color='#4169e1' />
                <TextInput selectionColor='#4169e1' placeholder="Email" keyboardType='email-address' style={styles.input} onChangeText={(text) => this.setState({ email: text })} />

                <View>
                  <Icon style={styles.inputIcon} name={'ios-lock-closed'} size={20} color='#4169e1' />
                  <TextInput secureTextEntry={true} placeholder="Password" style={styles.input} onChangeText={(text) => this.setState({ password: text })} />

                  <View>
                    <Icon style={styles.inputIcon} name={'ios-lock-closed'} size={20} color='#4169e1' />
                    <TextInput secureTextEntry={true} placeholder="Repeat password" style={styles.input} onChangeText={(text) => this.setState({ password: text })} />
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

            <View style={{ alignItems: "center", marginBottom: 20}}>
              <TouchableOpacity onPress={this.handleRegister}>
                <LinearGradient style={{ padding: 10, borderRadius: 20, marginTop: 20, height: 50, width: 300 }} colors={['#0000ff', '#4169e1', '#fa8072']} >
                  <Text style={{ color: 'white', textAlign: "center", fontWeight: 'bold', fontSize: 18 }}>SIGN UP</Text>
                </LinearGradient>
              </TouchableOpacity>




            </View>
            <View style={{ flex: 0.5, alignItems: "center" }}>
              <Text style={{ color: '#888', marginLeft: 10 }}>Already have an account?</Text>
              <TouchableOpacity style={{}} onPress={() => this.goback()}>
                <Text style={{ color: '#4169e1', fontWeight: 'bold' }}>Sign In from here</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>



    )
  }
}


