import React from "react";
import { ActivityIndicator,StyleSheet } from "react-native";

function Loader({color,size,style}){

return(

    <ActivityIndicator color={color} size={size} style={style}/>
)

}export default Loader;
    