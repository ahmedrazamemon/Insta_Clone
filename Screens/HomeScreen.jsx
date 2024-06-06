import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import Header from "../Components/Home/Header";
import Stories from "../Components/Home/Stories";
import Posts from "../Components/Home/Post";
import { PostData } from "../data/PostData";
import BottomTabs, { BottomTabIcons } from "../Components/Home/BottomTabs";

function HomeScreen({navigation}){
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


