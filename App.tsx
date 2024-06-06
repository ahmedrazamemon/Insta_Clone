import React,{useEffect} from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import AppNavigator from "./Screens/AppNavigator";
import { AvoidSoftInput } from "react-native-avoid-softinput";


export default function App(){
  useEffect(() => {
    // SplashScreen.hide()
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    }
  }, []);	

  return(
    // rgb(238 241 249)
    <SafeAreaView style={style.container}>
            <StatusBar backgroundColor={"#0000"} barStyle={"light-content"}/>
            {/* <StatusBar
          barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={COLORS.primary}
        /> */}
    <AppNavigator/>
   </SafeAreaView>
  )
  
}
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"rgb(238 241 249)"
   }
  })
  