import React from "react";
import { StyleSheet, Text, View ,Image, StatusBar} from "react-native";
import Logo from '../Assets/Images/logo.png'
import LoginForm from "../Components/loginScreen/LoginForm";
function LoginScreen({navigation}){

const InstaLogo = "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/62-instagram-512.png"

    return(
        <View style={Styles.container}>
           
           <View style={Styles.logoConatiner}>
            <Image source={{uri:InstaLogo}} style={{width:100,height:100}}/>
           </View>
           <LoginForm navigation={navigation}/>
           </View>
    )
}
export default LoginScreen;

const Styles= StyleSheet.create({

    container:{
        flex:1,
        marginTop:30,
        paddingHorizontal:12,
        backgroundColor:"rgb(238 241 249)"
      

    },
    logoConatiner:{
        alignItems:"center",
        marginTop:100
    }
})