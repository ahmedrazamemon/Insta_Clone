import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather'
import ImageComponent from '../Images';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
function UserDetails({route, navigation}){
  
  const data = ({userlikes,imgUrl, UserName, email, profilepicture} = route.params);

  // console.log("data====",data)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="arrow-left" size={28} color={'white'} />
        </TouchableOpacity>
        <Text style={{fontWeight: 400, color: 'white', fontSize: 22}}>
          Explore
        </Text>
      </View>
      <Header data={data} />
      <PostImage data={data}/>
      <FooterIcons/>
    </View>
  );
};

const Header = ({data}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
        marginBottom: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ImageComponent
          source={{uri: data.profilepicture}}
          style={styles.image}
        />
        <Text style={styles.name}>{data.UserName}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable style={styles.button}>
          <Text style={{color: 'black', fontWeight: 500}}>Follow</Text>
        </Pressable>
        <Pressable>
          <Icon1 name="dots-three-vertical" size={18} color={'white'} />
        </Pressable>
      </View>
    </View>
  );
};


const PostImage = ({data}) => {
  return (
    <View style={{width: '100%', height: 250}}>

     <ImageComponent source={{uri:data.imgUrl}} style={styles.img} />
   </View>
  );
};


const FooterIcons = ({post,openComments}) => {
  const iconNames = ['heart', 'heart-o', 'message-circle', 'send-o', 'bookmark-o'];
  const handleLike = post => {
    const currentLikeStatus = !post.likesbyuser.includes(
      auth().currentUser.email,
    );

    firestore()
      .collection('users')
      .doc(post.email)
      .collection('posts')
      .doc(post.id)
      .update({
        likesbyuser: currentLikeStatus
          ? firestore.FieldValue.arrayUnion(auth().currentUser.email)
          : firestore.FieldValue.arrayRemove(auth().currentUser.email),
      })
      .then(() => {
        console.log('Document Updated');
      })
      .catch(e => {
        console.log('Error ', e);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftIcons}>
        <TouchableOpacity >
          {post.likesbyuser.includes(auth().currentUser.email) ? (
            <Icon
              onPress={() => handleLike(post)}
              name={iconNames[0]}
              size={27}
              color={'red'}
            />
          ) : (
            <Icon
              onPress={() => handleLike(post)}
              name={iconNames[1]}
              size={27}
              color={'white'}
            />
          )}
        </TouchableOpacity>

        {/* <View style={styles.iconContainer}> */}
          <TouchableOpacity onPress={()=>openComments()} style={styles.commenticon}>
            <Icon2  name={iconNames[2]} size={27} color="white" />
          </TouchableOpacity>
        {/* </View> */}
        {/* <View style={styles.iconContainer}> */}
          <TouchableOpacity style={styles.shareicon}>
            <Icon name={iconNames[3]} size={27} color="white" />
          </TouchableOpacity>
        </View>
      {/* </View> */}

      <View style={styles.container}>
        <TouchableOpacity style={styles.rightIcon}>
          <Icon name={iconNames[4]} size={27} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const Likes = ({post}) => {
//   return (
//     <View style={{flexDirection: 'column', marginTop: 4}}>
//       <Text style={{color: 'white', fontWeight: 600}}>
//         {post.likesbyuser.length.toLocaleString('en')} Likes
//       </Text>
//     </View>
//   );
// };

export default UserDetails;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
    backgroundColor: 'black',
  },
  imageContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginLeft: 11,
    borderWidth: 1.5,
    borderColor: '#FF8501',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 600,
  },
  button: {
    backgroundColor: 'white',
    minHeight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 80,
  },
  loader: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth:1
  },
  img:{resizeMode: 'cover',
     height: '100%',
      width: '100%'},
});
