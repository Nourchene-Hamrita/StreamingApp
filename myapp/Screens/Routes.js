import React, { Component } from 'react';
import { Router,ActionConst, Stack, Scene } from 'react-native-router-flux';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Navigation from'../navigations/Navigation';

class Routes extends Component {
  render() {
    return (

      <Router>
        <Stack key="root" hideNavBar={'true'}>
          <Scene key="login" component={Login} title="Login" initial={'true'} />
          <Scene key="signup" component={SignUp} title="Register" />
          <Scene key="home" component={Navigation} title="Home" type={ActionConst.RESET}  />
        </Stack>
      </Router>

    )
  }
}
export default Routes;