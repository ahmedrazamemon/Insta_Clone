import { Pressable,Text,StyleSheet } from "react-native";
function StandardButton({title,onpress,style}){

return(
    <Pressable style={style} onPress={onpress}>
    <Text style={{color: 'white'}}>{title}</Text>
  </Pressable>

)
}

 
export default StandardButton;