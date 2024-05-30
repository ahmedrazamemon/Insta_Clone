import React from "react";
import { StyleSheet, Text, View ,Image, StatusBar} from "react-native";
import SignupForm from "../Components/SignupScreen/SignupForm";
import { ScrollView } from "react-native";

function SignupScreen(){

    
const InstaLogo = "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/62-instagram-512.png"

    return(
        <View style={Styles.container}>
            <StatusBar backgroundColor={"rgb(238 241 249)"} barStyle={"dark-content"}/>
           
           <ScrollView showsVerticalScrollIndicator={false}>
           <View style={Styles.logoConatiner}>
            <Image source={{uri:InstaLogo}} style={{width:100,height:100}}/>
           </View>

           <SignupForm/>
           </ScrollView>
           </View>
    )
}
export default SignupScreen;

const Styles= StyleSheet.create({

    container:{
        flex:1,
        marginTop:30,
        paddingHorizontal:12,
        backgroundColor:"rgb(238 241 249)"
      

    },
    logoConatiner:{
        alignItems:"center",
        marginTop:50
    }
})