import { StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({
    container:{
     width:'100%',
     height:Dimensions.get('window').height-129  
    },
    video:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0
    },
    uiContainer:{
        height:'100%',
        justifyContent:'flex-end'


    },
    rightContainer:{
       alignSelf:'flex-end'
    },
    bottomContainer:{
        
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
      },
   
})
export default styles ;