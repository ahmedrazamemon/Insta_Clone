import React from "react";
import { StyleSheet, Text, View ,Image, StatusBar} from "react-native";
import LoginForm from "../Components/loginScreen/LoginForm";

function LoginScreen(){

const InstaLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"

    return(
        <View style={Styles.container}>
            <StatusBar barStyle={"dark-content"}/>
           
           <View style={Styles.logoConatiner}>
            <Image source={{uri:InstaLogo}} style={{width:150,height:150}}/>
           </View>
           <LoginForm/>
           </View>
    )
}
export default LoginScreen;

const Styles= StyleSheet.create({

    container:{
        flex:1,
        marginTop:50,
        paddingHorizontal:12
      

    },
    logoConatiner:{
        alignItems:"center",
        marginTop:50
    }
})