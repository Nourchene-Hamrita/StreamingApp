import axios from 'axios';
let endPoint = 'http://192.168.1.11:3000/'
import AsyncStorage from '@react-native-community/async-storage';
let user = "@user"
let userInfo = null
export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem(user)
    if (data !== null) {
      userInfo = JSON.parse(data)
      return JSON.parse(data)
    }
  } catch (e) {
    // error reading value
  }
}
export const getDataMenu = async () => {
  try {
    const data = await AsyncStorage.getItem(user)
    return JSON.parse(data)
  } catch (e) {
    // error reading value
  }
}
export const deleteData = async () => {
  try {
    await AsyncStorage.removeItem(user)
  } catch (e) {
    // error reading value
  }
}

export const getHeaders = async () => {
  const data = await getData()
  return { headers: { Authorization: `Bearer ${data.token}` } };
};

export const registerUser = async (user) => {
  return await axios.post(`${endPoint}users/register`, user);
}
export const LoginUser = async (user) => {
  return await axios.post(`${endPoint}users/login`, user);
}