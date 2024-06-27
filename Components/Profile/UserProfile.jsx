import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome6'
import Icon1 from 'react-native-vector-icons/Octicons'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from 'react-native-vector-icons/EvilIcons'
import auth from '@react-native-firebase/auth'
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
function UserProfile(){

    return(
        <View style={{flex:1,backgroundColor:"rgb(29 50 67)",}}>
<Header/>
<View style={{padding:8}}>

<View style={{marginTop: 10,flexDirection:"row",padding:2,backgroundColor:"rgb(28 42 51)",borderRadius:10}}>
         <View style={{padding:5}}>
            <Text></Text>
            <Icon3 name="user" size={70} color={"white"}/>
            <Text></Text>
         </View>
         <View>
         <Text style={{color:"white",fontSize:20,padding:3}}>Profile</Text>
         <Text style={Style.text}>{auth().currentUser.email}</Text>
         {/* <Text></Text> */}

         </View>
         <TouchableOpacity onPress={()=>navigation.navigate("UserProfile")} style={{justifyContent:"center"}}>
 <Icon2 name="arrow-right" size={20}  color={'#575555'} />
         </TouchableOpacity>
        </View>
</View>
       </View>
    )
}

const Header=()=>{

    return(
        <View>

        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:60,alignItems:"center",padding:10,}}>
           <Icon1 name="x" size={30} color={"white"}/>
            <Text style={Style.text}><Icon name='meta' color={"#858585"} size={15}/> Meta</Text>
            <Text></Text>
        </View>
        <View>
            <Text style={{textAlign:"center",fontSize:27,fontWeight:600,color:"white"}}>Accounts Center</Text>
        <Text style={{color:"white",textAlign:"center",padding:9,fontSize:16}}>Manage your connected experiences
             and account settings accross Meta
              technologies like Facebook, Instagram 
        and Meta Horizon.
        <Text onPress={()=>"https://help.instagram.com/1731078377046291/?locale=en_US&helpref=learn_more"} style={{color:"rgb(59 139 207)"}}>Learn more</Text>
        </Text>
        </View>
        </View>
    )
}

export default UserProfile;

const Style = StyleSheet.create({

    text:{
        color:"white"
    }
    ,
    items:{
        flexDirection:"row",
        borderColor:"rgb(28 42 51)",
        borderWidth:1,
        backgroundColor:"rgb(28 42 51)",
        height:80,
        borderRadius:10
    }
})