import axios from 'axios';
let endPoint = 'http://192.168.1.14:5000/'
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
export const getInfoChannel = async () => {
  try {
    const data = await AsyncStorage.getItem("channel")
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
export const UpdateUser = async (id,data) => {
  return await axios.put(`${endPoint}users/`+id,data);
};
export const UpdateVideo = async (id,data) => {
  return await axios.put(`${endPoint}videos/`+id,data);
};
export const UpdateChannel = async (id,data) => {
  console.log(data);
  return await axios.put(`${endPoint}channels/`+id,data);
};
export const getVideos = async () => {
  return await axios.get(`${endPoint}videos`);
};
export const SearchVideos = async (data) => {
  console.log(data);
  return await axios.get(`${endPoint}videos/search?tag=`+data.tag+`&category=`+data.category+`&channelname=`+data.channelname
  
);
};
export const SearchVideosTag = async (data) => {
  console.log(data);
  return await axios.get(`${endPoint}videos/search?tag=`+data.tag,
  
);
};
export const getSavedVideos = async (id) => {
 
  return await axios.get(`${endPoint}saved/savedvideos/`+id);
};
export const SaveVideos = async (data) => {
  console.log(data);
  return await axios.post(`${endPoint}saved/`,data
  
);
};
export const DeleteVideo = async (id) => {
  return await axios.delete(`${endPoint}videos/`+id,);
};
export const DeleteFromSave = async (id) => {
  return await axios.delete(`${endPoint}saved/`+id,);
};
export const getInfo = async (id) => {
  return await axios.get(`${endPoint}users/`+id,);
};
export const getInfoVideo = async (id) => {
  return await axios.get(`${endPoint}videos/`+id,);
};
export const getChannel = async (id) => {
  return await axios.get(`${endPoint}channels/userchannel/`+id,);
};
export const getComments = async (id) => {
  console.log(id)
  return await axios.get(`${endPoint}comments/`+id,);
};
export const getVideosList = async (id) => {
  console.log(id)
  return await axios.get(`${endPoint}videos/videolist/`+id,);
};
export const followChannel = async (id,data) => {
  console.log(data);
  return await axios.patch(`${endPoint}channels/follow/`+id,data);
};
export const unfollowChannel = async (id,data) => {
  console.log(data);
  return await axios.patch(`${endPoint}channels/unfollow/`+id,data);
};
export const likeVideo = async (id,data) => {
  console.log(data);
  return await axios.patch(`${endPoint}videos/like-video/`+id,data);
};
export const dislikeVideo = async (id,data) => {
  console.log(data);
  return await axios.patch(`${endPoint}videos/dislike-video/`+id,data);
};
export const CommentVideo = async (id,data) => {
  console.log(data);
  return await axios.patch(`${endPoint}videos/comment-video/`+id,data);
};
export const createChannel = async(data) => {
 console.log(data)
  return await axios.post(`${endPoint}channels/create-channel/`,data);
};
export const getFollowing = async (id) => {
  console.log(id)
  return await axios.get(`${endPoint}following/`+id,);
};
