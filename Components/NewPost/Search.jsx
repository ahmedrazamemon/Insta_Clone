import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ImageComponent from '../Images';
import Loader from '../Loader';
import { Text } from 'react-native-elements';

function Search({navigation}) {
    const [postData, setpostData] = useState([]);

    useEffect(() => {
      firestore()
        .collectionGroup('posts')
        .onSnapshot(snapshot => {
          setpostData(snapshot.docs.map(post => ({id:post.id,...post.data()})));
        });
    }, []);

//   console.log("Images-------",postData.imgUrl)
  if (postData.length === 0) {
    return (
      <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader size={'large'} color={'white'} style={styles.loader} />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: 'black', flex: 1,marginTop:30 }}>

        <View>
            <Text style={{color:"white",textAlign:"center",fontSize:20}}>All Users</Text>
        </View>
      <FlatList
      style={styles.container}
        data={postData}
        keyExtractor={(item) => item.id}
        numColumns={3} 
                renderItem={({ item }) => (

          <View style={styles.container}>
           <TouchableOpacity onPress={() => navigation.navigate("UserDetails", {
              id: item.uid,
              UserName:item.username,
              caption: item.caption,
              email: item.email,
              imgUrl: item.imgurl,
              profilepicture:item.profilePicture,
              comment:item.comments,
              likes:item.likesbyuser
            })}>
              <ImageComponent
                source={{ uri: item.imgurl }}
                style={styles.image}
              />
            </TouchableOpacity>
    </View>
        )}
      />
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  image: {
    resizeMode:"contain",
    borderColor:"white",
    borderWidth:1,
    width:130, 
    height: 180,
    borderRadius: 4,
  },
  loader: {
    color: 'white',
  },
  container: {
    alignContent:"center",
    padding: 1,
    // margin:5,
    alignSelf:"center"
},
});
