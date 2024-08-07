import React,{useEffect} from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import AuthNavigation from "./Screens/AuthNavigation";
import COLORS from './Colors';
import { LogBox } from "react-native";
import BottomNavigation from "./Screens/BottomNavigation";
import 'react-native-gesture-handler';
import EditProfile from "./Components/Profile/EditProfile";
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
  LogBox.ignoreAllLogs();//Ignore all log notifications
  // console.ignoredYellowBox
  return(
    <SafeAreaView style={style.container}>
            <StatusBar
          barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={COLORS.primary}
          />
{/* <EditProfile/> */}
          <AuthNavigation/>
          {/* <BottomNavigation/> */}
   </SafeAreaView>
  )
  
}
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.primary
  }
  })
  