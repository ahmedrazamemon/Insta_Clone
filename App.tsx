import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
import NewPostScreen from "./Screens/NewPostScreen";
import LoginScreen from "./Screens/LoginScreen";
import AppNavigator from "./Screens/AppNavigator";
import SignupScreen from "./Screens/SignupScreen";

export default function App(){

  return(

    <SafeAreaView style={style.container}>
    {/* <StatusBar backgroundColor={"white"}/> */}
   {/* <HomeScreen/> */}
    {/* <LoginScreen/> */}
    <AppNavigator/>
{/* <SignupScreen/>  */}
  {/* <NewPostScreen/> */}
   </SafeAreaView>
  )
  
}
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"rgb(238 241 249)"
   }
  })
  