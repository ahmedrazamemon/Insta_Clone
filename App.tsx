import React,{useEffect} from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import AuthNavigation from "./Screens/AuthNavigation";
import COLORS from './Colors';
import BottomNavigation from "./Screens/BottomNavigation";

export default function App(){
  useEffect(() => {
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    }
  }, []);	

  return(
    <SafeAreaView style={style.container}>
            <StatusBar
          barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={COLORS.primary}
          />
          {/* <BottomNavigation/> */}
          <AuthNavigation/>
   </SafeAreaView>
  )
  
}
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.primary
  }
  })
  