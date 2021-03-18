import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

class Routes extends Component {
  render() {
    return (

      <Router>
        <Stack key="root" hideNavBar={'true'}>
          <Scene key="login" component={Login} title="Login" initial={'true'} />
          <Scene key="signup" component={SignUp} title="Register" />
        </Stack>
      </Router>

    )
  }
}
export default Routes;