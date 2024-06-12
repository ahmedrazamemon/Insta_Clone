import react from "react";
import { Pressable,Text,StyleSheet } from "react-native";
function StandardButton({title,onpress}){

return(
    <Pressable style={Styles.button} onPress={onpress}>
    <Text style={{color: 'white'}}>{title}</Text>
  </Pressable>

)
}

const Styles=StyleSheet.create({
    button: {
        backgroundColor: '#6AA0F5',
        minHeight: 43,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // borderWidth:1
      }
})
export default StandardButton;