import { StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({
    container:{
     width:'100%',
     height:Dimensions.get('window').height-129 
    },
    video:{
       height:200,
       width:'100%'
    },
    uiContainer:{
        height:'100%',
        justifyContent:'flex-end'


    },
    rightContainer:{
       alignSelf:'flex-end',
       height:300,
       justifyContent:'space-between',
       marginRight:10
    },
    bottomContainer:{
        padding:10
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      mediaPlayer: {
      
        backgroundColor: 'black',
      },
      handle:{
        color:'white',
        fontSize:16,
        fontWeight:'700',
        marginBottom:5

      },
      description:{
        color:'white',
        fontSize:16,
        fontWeight:'300',
        marginBottom:10


      },
      iconContainer:{
        alignItems:'center'
      },
      statsLabel:{
        color:'white',
        fontSize:15,
        marginTop:5
        

      }
   
})
export default styles ;