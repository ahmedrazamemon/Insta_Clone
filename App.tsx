import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
import NewPostScreen from "./Screens/NewPostScreen";
import LoginScreen from "./Screens/LoginScreen";
import AppNavigator from "./Screens/AppNavigator";

export default function App(){

  return(

    <SafeAreaView style={style.container}>
    <StatusBar backgroundColor={"white"}/>
   {/* <HomeScreen/> */}
    <LoginScreen/>
  {/* <NewPostScreen/> */}
   </SafeAreaView>
  )
  
}
const style = StyleSheet.create({
  container:{
    flex:1,
   }
  })
  