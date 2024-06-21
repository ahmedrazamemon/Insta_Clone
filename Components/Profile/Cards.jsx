import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../Loader';
import ImageComponent from '../Images';
import StandardButton from '../Button';
import auth from '@react-native-firebase/auth'
function Cards() {
  const [userslist, setuserslist] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        setuserslist(
          snapshot.docs.map(post => ({id: post.id, ...post.data()})),
        );
      });
  }, []);
  return (
    <View style={{marginBottom: 210}}>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>

      <Text style={Styles.text}>Follow some accounts to get started</Text>
      <Text style={Styles.text}>See all</Text>
        </View>
      <ScrollView horizontal>
        {userslist.length == 0 ? (
          <Loader
            size={'large'}
            color={'#FFF'}
            style={{alignContent: 'center'}}
          />
        ) : (
          userslist.map((users, index) => (
            <View key={index} style={Styles.card}>
              <ImageComponent
                source={{uri: users.profilePicture}}
                style={Styles.image}
              />
              <Text style={Styles.text}>
              {users.email.length>8?users.email.slice(0,9).toUpperCase()+'...':users.email}
              </Text>
              <Text style={{color:"gray"}}>Popular</Text>
              <Pressable style={Styles.button}>
                <Text style={{color:"black",fontWeight:500}}>Follow</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
      <StandardButton title={"logout"} onpress={()=>auth().signOut()} style={Styles.lgbutton}/>
    </View>
  );
}
export default Cards;

const Styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 150,
    borderColor:"white",
    // marginBottom:10
  },
  card: {
    marginTop:15,
    flexDirection: 'column',
    alignItems:"center",
    justifyContent:"center",
    // backgroundColor: 'white',
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: 'white',
    width:170,
    height:230,
    margin:3
  },
  button: {
    backgroundColor: 'white',
    minHeight: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:15,
    width: 130
  },
  lgbutton:{
      backgroundColor: '#6AA0F5',
      minHeight: 43,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop:5
  },
text:{
    color: 'white',
    fontWeight:600
}
});
