import React, { useEffect, useState } from "react";
import { View,Text, StyleSheet } from "react-native";
import StandardButton from "../Button";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ImageComponent from "../Images";
import  {AlertNotificationRoot,ALERT_TYPE,Toast} from 'react-native-alert-notification'
function Profile(){
const [userdata,setuserdata]=useState([])

const userProfileData=()=>{
    const user = auth().currentUser;
    const unSubscribe = firestore()
    .collection('users')
    .where('userid', '==', user.uid)
    .limit(1)
    .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
            setuserdata({
                username: doc.data().username,
                profilePicture: doc.data().profilePicture, 
                email:doc.data().email
            });
        });
    });
    
    
}
    const changePassword=()=>{
    auth().sendPasswordResetEmail(userdata.email)
Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Email Sent',
    textBody: 'Please check your email to reset your password',
    autoClose: 1000,
  });
    }
        
    useEffect(()=>{
    userProfileData();
    },[])

    return(
        <AlertNotificationRoot>

        <View style={{backgroundColor:"black",flex:1}}>
            <View style={{marginTop:100}}>
                <ImageComponent source={{uri:userdata.profilePicture}} style={style.image}/>
        <Text style={{color:"white"}}>
           Name: {userdata.username}
        </Text>
        <Text style={{color:"white"}}>Email: {userdata.email}</Text>
            </View>
<View style={{display:"flex",flexDirection:"column",justifyContent:"space-around",padding:30,height:200}}>

            <StandardButton  title={"Reset Password"} onpress={()=>changePassword()}/>
                <StandardButton  title={"Logout"} onpress={()=>auth().signOut()}/>
</View>
        </View>
        </AlertNotificationRoot>
    )
}
export default Profile;

const style = StyleSheet.create({

        image: {
            width: 150,
           height: 150,
           borderRadius: 150,
           marginLeft: 11,
           borderWidth: 3,
           borderColor: '#FF8501'}
})