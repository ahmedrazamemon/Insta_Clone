import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../Components/Home/Header';
import Stories from '../Components/Home/Stories';
import Posts from '../Components/Home/Post';
import firestore from '@react-native-firebase/firestore';
import Loader from '../Components/Loader';
import Cards from '../Components/Profile/Cards';
import { Divider } from 'react-native-elements';
// import BottomNavigation from './BottomNavigation';
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
      <ScrollView>
      <Stories />
      <Divider width={0.3}/>
        {
        postData.length==0?<Loader size={"large"} color={"#FFF"} style={style.loader}/>:
        postData.map((post, index) => (
          <Posts post={post} key={index} />
        ))}
      </ScrollView>
      {/* <BottomNavigation/> */}
      {/* <BottomTabs  icons={BottomTabIcons} /> */}
    </View>
  );
}
export default HomeScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  loader: {
    // backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth:1
}
});
