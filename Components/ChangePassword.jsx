import React from "react";
import { Pressable, View } from "react-native";
import auth from '@react-native-firebase/auth'
import { Text } from "react-native-elements";
function ChangePassword(){

const changepassword=()=>{

    auth().sendPasswordResetEmail(auth().currentUser.email).then(()=>{

        console.log("Mail has been sent!")
    }).catch((e)=>{

        console.log(e,"error")
    })
}

    return(
        <View style={{marginTop:60}}>
<Text>Cjange Password</Text>
<Pressable onPress={()=>changepassword()}>
    <Text>Change Password</Text>
</Pressable>
        </View>
    )
}
export default ChangePassword;