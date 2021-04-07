import axios from'axios';
let endPoint = 'http://192.168.1.11:3000/'
export const GET_USER="GET_USER";
export const getUser=(userid)=>{
    return(dispatch)=>{
        return axios.get(`${endPoint}users/${userid}`).then((res)=>{
            dispatch({
                type:GET_USER,payload:res.data
            }).catch((err)=>console.log(err)

            )
        })
    }

}