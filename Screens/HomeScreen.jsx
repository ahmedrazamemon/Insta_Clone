import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import Header from "../Components/Home/Header";
import Stories from "../Components/Home/Stories";
import Posts from "../Components/Home/Post";
import { PostData } from "../data/PostData";
import BottomTabs, { BottomTabIcons } from "../Components/Home/BottomTabs";
import firestore from '@react-native-firebase/firestore'
function HomeScreen({navigation}){

//     useEffect(()=>{

// firestore().collectionGroup('posts').onSnapshot(snapshot=>{
//     console.log(snapshot.docs.map(doc=>doc.data()))
// })

//     },[])
    return(
        <View style={style.container}>
            <Header navigation={navigation}/>
            <Stories/>
            <ScrollView >
            {PostData.map((post,index)=>(
                <Posts post={post} key={index}/>

            ))}
            </ScrollView>
            <BottomTabs icons={BottomTabIcons}/>
        </View>
    )
}
export default HomeScreen;

const style = StyleSheet.create({
    container:{
        backgroundColor:"black",
        flex:1
    }
})


