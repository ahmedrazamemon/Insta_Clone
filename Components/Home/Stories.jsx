import React, { useEffect,useState } from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
// import {Users} from '../../data/Users'/;
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather'
import ImageComponent from '../Images';
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native';
function Stories() {

  const [userslist, setuserslist] = useState([]);
  useEffect(() => {
    firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        setuserslist(
          snapshot.docs.map(data => ({id: data.id, ...data.data()})),
        );
      });
  },[])
  return (
    <View>
   
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",marginBottom:9}}>
          
        <View style={style.mystory}>
            <View style={style.unreadBadge}>
   <Icon1 name='plus' size={20} color={"black"}/>
            </View>
   <Icon name="user-o" size={50} color={"white"} style={{marginTop:10,zIndex:-100}}/>
</View>
       <Text style={{color:"white",textAlign:"center",marginTop:-3,padding:4}}>Your story</Text>
        </View>
        {userslist.map((value,index) => (
          <View key={index} style={{alignItems:"center"}}>
            <ImageComponent source={{uri:value.profilePicture}} style={style.image} />
            <Text style={{color:"white",textAlign:"center",marginBottom:9,marginLeft:10}}>
                {value.username.length>6?value.username.slice(0,5).toLowerCase()+'..'
                :value.username.toLowerCase()
            }</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default Stories;

const style = StyleSheet.create({
  image: {
    width: 70,
   height: 70,
   borderRadius: 50,
   marginLeft: 11,
   borderWidth: 3,
   borderColor: '#FF8501'
  }
  ,mystory:{
    marginRight:10,
    // marginTop:4,
    alignItems:"center",
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 11,
    backgroundColor:"rgb(219 219 219)",
    borderColor: 'white' 
  },
  unreadBadge: {
    backgroundColor: 'rgb(254 255 255)',
  position: 'absolute',
  left: 47,
  top:47,
  borderWidth:2,
  borderColor:"black",
  borderRadius: 15,
  width: 25,
  height: 25,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
},

});
