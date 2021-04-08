import axios from 'axios';
let endPoint = 'http://192.168.137.133:3000/'
import AsyncStorage from '@react-native-community/async-storage';
let user = "token"
let userInfo = null
export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem(user)
      return data;
    
  } catch (e) {
    // error reading value
  }
}
export const getDataMenu = async () => {
  try {
    const data = await AsyncStorage.getItem(user)
    console.log(data)
    return JSON.parse(data)
  } catch (e) {
    // error reading value
  }
}



export const getHeaders = async () => {
  const data = await getData()
  return { headers: { Authorization: `Bearer ${data.token}` } };
};
export const deleteData = async () => {
  try {
    await AsyncStorage.removeItem(user)
  } catch (e) {
    // error reading value
  }
}
export const getInfoUser = async () => {
  try {
    const data = await AsyncStorage.getItem("user")
    console.log(data)
    return JSON.parse(data)
  } catch (e) {
    // error reading value
  }
}
export const registerUser = async (user) => {
  return await axios.post(`${endPoint}users/register`, user);
};
export const LoginUser = async (user) => {
  return await axios.post(`${endPoint}users/login`, user);
};
export const getVideos = async () => {
  return await axios.get(`${endPoint}videos`);
};
export const getInfo = async (id) => {
  return await axios.get(`${endPoint}users/`+id,);
};
export const likeVideo = async (id,data) => {
  console.log(data);
  return await axios.patch(`${endPoint}videos/like-video/`+id,data);
   

};
export const dislikeVideo = async (id) => {
  return await axios.patch(`${endPoint}videos/dislike-video/`+id,);
};

