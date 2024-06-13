import React from "react";
import { View,Text } from "react-native";
import StandardButton from "../Button";
import auth from '@react-native-firebase/auth'
function Profile(){

    return(
        <View style={{backgroundColor:"black",flex:1}}>
            <View style={{marginTop:200}}>

                <StandardButton  title={"Logout"} onpress={()=>auth().signOut()}/>
            </View>
        </View>
    )
}
export default Profile;