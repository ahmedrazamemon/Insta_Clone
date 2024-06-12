import React from "react";
import { StyleSheet, View ,Image} from "react-native";
import Logo from '../Assets/Images/instalogo.webp'
import LoginForm from "../Components/loginScreen/LoginForm";
function LoginScreen({navigation}){


    return(
        <View style={Styles.container}>
           
           <View style={Styles.logoConatiner}>
            <Image source={Logo} style={{width:100,height:100}}/>
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