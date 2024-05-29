import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AddNewPost from "../Components/NewPost/AddNewPost";

function NewPostScreen(){
    return(
        <SafeAreaView style={{backgroundColor:"black",flex:1}}>
            <AddNewPost/>
        </SafeAreaView>
    )
}export default NewPostScreen;
