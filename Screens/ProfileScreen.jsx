import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../Components/Profile/Header";
import Cards from "../Components/Profile/Cards";
import ProfileDetails from "../Components/Profile/ProfileDetails";

function ProfileScreen({navigation}){

   
    return(
        <View style={Styles.container} >
            <Header navigation={navigation}/>
            <ProfileDetails navigation={navigation}/>
      <Cards/>     
        </View>
    )
}export default ProfileScreen;

const Styles= StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"black"
    }
})