import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../Loader';
import { Pressable } from 'react-native';
import Icon1 from 'react-native-vector-icons/Entypo'
function Posts({post}) {
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
    <View style={{marginBottom: 30}}>
      {/* <Divider width={1} orientation="vertical" /> */}
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <FooterIcons post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
}

const PostHeader = ({post}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
        <Image source={{uri: post.profilePicture}} style={styles.image} />
        <Text style={styles.name}>{post.username}</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Pressable style={styles.button}>
                <Text style={{color:"black",fontWeight:500}}>Follow</Text>
              </Pressable>
              <Pressable style={{marginTop:20}}>
              <Icon1 name='dots-three-vertical' size={18} color={"white"}/>
              </Pressable>
      </View>
    </View>
  );
};

const PostImage = ({post}) => {
  return (
    <View style={{width: '100%', height: 250}}>
     {
      post.imgurl?
      <Image
      source={{uri: post.imgurl}}
      style={{resizeMode: 'cover', height: '100%', width: '100%'}}
      />:
      <Loader color={"white"} size={20} style={styles.loader}/>
    }
    </View>
  );
};

const FooterIcons = ({handleLike, post}) => {
  const iconNames = ['heart','heart-o', 'comment-o', 'send-o', 'bookmark-o'];
  return (
    <View style={styles.container}>
      <View style={styles.leftIcons}>
        <TouchableOpacity>
          {post.likesbyuser.includes(auth().currentUser.email)
          ?
        <Icon
      onPress={() => handleLike(post)}
    name={iconNames[0]}
  size={30}
color={'red'}
/>
:<Icon
onPress={() => handleLike(post)}
name={iconNames[1]}
size={30}
color={'white'}
/>

}
        </TouchableOpacity>
        {iconNames.slice(2,4).map((iconName, index) => (
          //   <View >
          <TouchableOpacity key={index} style={styles.iconContainer}>
            <Icon name={iconName} size={30} color="white" />
          </TouchableOpacity>
          //   </View>
        ))}
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.rightIcon}>
          <Icon name={iconNames[4]} size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Likes = ({post}) => {
  return (
    <View style={{flexDirection: 'column', marginTop: 4}}>
      <Text style={{color: 'white', fontWeight: 600}}>
        {post.likesbyuser.length.toLocaleString('en')} Likes
      </Text>
    </View>
  );
};

const Caption = ({post}) => {
  return (
    <View>
      <Text style={{color: 'white'}}>
        <Text style={{fontWeight: 700}}>{post.username} </Text>
        <Text>{post.caption}</Text>
      </Text>
    </View>
  );
};
const CommentsSection = ({post}) => {
  return (
    <View>
      {!!post.comments.length && (
        <Text style={{color: 'gray'}}>
          View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
          {''}
          {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
      )}
    </View>
  );
};

const Comments = ({post}) => {
  return (
    <View>
      {post.comments.map((comment, index) => {
        return (
          <View key={index}>
            <Text style={{color: 'white'}}>
              <Text style={{fontWeight: 600}}>{comment.user} </Text>
              {comment.comment}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
export default Posts;

const styles = StyleSheet.create({
  loader: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth:1
},
  image: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginLeft: 11,
    borderWidth: 1.5,
    borderColor: '#FF8501',
  },
  name: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 600,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  leftIcons: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  button: {
    backgroundColor: 'white',
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:15,
    width: 80
  },
});
