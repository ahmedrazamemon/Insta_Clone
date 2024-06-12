import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../Components/Home/Header';
import Stories from '../Components/Home/Stories';
import Posts from '../Components/Home/Post';
import firestore from '@react-native-firebase/firestore';
import BottomTabs, {BottomTabIcons} from '../Components/Home/BottomTabs';
function HomeScreen({navigation}) {
  const [postData, setpostData] = useState([]);

  useEffect(() => {
    firestore()
      .collectionGroup('posts')
      .onSnapshot(snapshot => {
        setpostData(snapshot.docs.map(post => ({id:post.id,...post.data()})));
      });
  }, []);
  return (
    <View style={style.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {postData.map((post, index) => (
          <Posts post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={BottomTabIcons} />
    </View>
  );
}
export default HomeScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
