import { Pressable,Text,StyleSheet } from "react-native";
function StandardButton({title,onPress,style}){

return(
    <Pressable style={style} onPress={onPress}>
    <Text style={{color: 'white'}}>{title}</Text>
  </Pressable>

)
}

 
export default StandardButton;