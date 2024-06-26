import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import StandardButton from '../Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImageComponent from '../Images';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';
function ProfileDetails() {
  const [userdata, setuserdata] = useState([]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const getCurrentUserPosts = async () => {
      const user = auth().currentUser;
      if (user) {
        const userDocRef = firestore().collection('users').doc(user.email);
        const postsCollectionRef = userDocRef.collection('posts');
        const postsSnapshot = await postsCollectionRef.get();

        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPosts(postsList);
      }
    };

    getCurrentUserPosts();
  }, []);

  const userProfileData = () => {
    const user = auth().currentUser;
    const unSubscribe = firestore()
      .collection('users')
      .where('userid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          setuserdata({
            username: doc.data().username,
            profilePicture: doc.data().profilePicture,
            email: doc.data().email,
          });
        });
      });
  };
  const changePassword = () => {
    auth().sendPasswordResetEmail(userdata.email);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Email Sent',
      textBody: 'Please check your email to reset your password',
      autoClose: 1000,
    });
  };

  const signOut = () => {
    auth().signOut();
  };

  useEffect(() => {
    userProfileData();
  }, []);

  return (
    <AlertNotificationRoot>
      <View>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 400,
            alignSelf: 'center',
          }}>
          <View style={{marginTop: 10}}>
            <ImageComponent
              style={style.image}
              source={{uri: userdata.profilePicture}}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{posts.length}</Text>
            <Text style={{color: 'white'}}>posts</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>0</Text>
            <Text style={{color: 'white'}}>followers</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>0</Text>
            <Text style={{color: 'white'}}>following</Text>
          </View>
        </View>
        <View style={{marginLeft: 10, marginTop: 6}}>
          <Text style={{color: 'white', fontWeight: 500}}>
            {userdata.username}
          </Text>
          <TouchableOpacity>
            <Text style={{color: '#6BB0F5', fontVariant: 'bold'}}>
              Add your bio
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // padding: 30,
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <View>
            <StandardButton style={style.button} title={'Edit profile'} />
          </View>
          <View>
            <StandardButton style={style.button} title={'Share profile'} />
          </View>
          <TouchableOpacity>
            <Icon
              name="person-add"
              style={{
                width: 38,
                borderWidth: 1.5,
                borderColor: 'white',
                padding: 9,
                borderRadius: 10,
              }}
              size={20}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </AlertNotificationRoot>
  );
}
export default ProfileDetails;

const style = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 150,
    // marginLeft: 11,
    borderWidth: 3,
    borderColor: '#FF8501',
  },
  button: {
    // backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'white',
    width: 185,
  },
});
