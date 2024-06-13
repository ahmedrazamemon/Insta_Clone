import React from "react";
import { ActivityIndicator,StyleSheet } from "react-native";

function Loader({color,size}){

return(

    <ActivityIndicator color={color} size={size} style={Styles.loader}/>
)

}export default Loader;
const Styles=StyleSheet.create({
    loader: {
        backgroundColor: '#6AA0F5',
        minHeight: 43,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // borderWidth:1
}      })
