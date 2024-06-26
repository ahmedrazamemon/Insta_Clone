import React, { useEffect,useState } from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Users} from '../../data/Users';
import ImageComponent from '../Images';
import firestore from '@react-native-firebase/firestore'
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
});
