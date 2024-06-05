import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AddNewPost from "../Components/NewPost/AddNewPost";

function NewPostScreen({navigation}){
    return(
        <SafeAreaView style={{backgroundColor:"black",flex:1}}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}export default NewPostScreen;
