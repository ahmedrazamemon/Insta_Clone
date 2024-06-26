
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import StandardButton from '../Button';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

const CommentsModal = ({visible, onClose, post}) => {
  const [comment, setComment] = useState('');
  const [userdata, setuserdata] = useState([]);
  const [posts, setPosts] = useState();

  useEffect(() => {
    userProfileData();
    getComments();
    // console.log(posts[2],"posts data")
  }, []);
  const user = auth().currentUser;
  const userProfileData = () => {
    const unSubscribe = firestore()
      .collection('users')
      .where('userid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          setuserdata({
            // userid:doc.data().userid,
            username: doc.data().username,
            profilePicture: doc.data().profilePicture,
            email: doc.data().email,
          });
        });
      });
  };

  const uploadComment = () => {
    const newComment = {
      username: userdata.username,
      profilePicture: userdata.profilePicture,
      comments: comment,
    };

    if (comment.length == 0) {
      onClose();
      console.log("can't add empty comment");
    } else {
      firestore()
        .collection('users')
        .doc(post.email)
        .collection('posts')
        .doc(post.id)
        .update({
          comments: firestore.FieldValue.arrayUnion(newComment),
        })
        .then(async () => {
          await onClose();
          console.log('Document Updated');
          setComment('');
        })
        .catch(e => {
          console.log('Error ', e);
        });
    }
  };
  const getComments=async ()=>{
    await firestore()
       .collection("users")
       .doc(user.email)
       .collection("posts")
       .get()
       .then(querySnapshot => {
         querySnapshot.forEach(queryDocumentSnapshot => {
           console.log("comments-----",queryDocumentSnapshot.get("comments"));
           setPosts(queryDocumentSnapshot.get("comments"))
           console.log("posts-----",posts)
         });
       })
       .catch(err => {
         alert(err);
       });
   }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={{backgroundColor: 'white'}}>
        <View></View>
      </View>
      <View style={styles.modalView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 400,
          }}>
          <Text style={styles.modalTitle}>Add your comment</Text>
          <StandardButton
            title={'X'}
            onpress={onClose}
            style={styles.button}
          />
        </View>
        {/* {posts.length > 0 ? (
        posts.map((post, index) => (
          <View key={index}>
            <Text>{post}</Text>
          </View>
        ))
      ) : (
        <Text>No comments found.</Text>
      )} */}
        <View
          style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'gray'}
            placeholder={'Add Comment'}
            onChangeText={setComment}
            value={comment}
          />
          <TouchableOpacity onPress={uploadComment}>
            <View
              style={{backgroundColor: 'white', margin: 5, borderRadius: 10}}>
              <Icon name="arrow-up" size={40} color={'black'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  input: {
    color: 'white',
    marginBottom: 3,
    backgroundColor: '#2d2d2d',
    borderWidth: 1,
    borderColor: '#2d2d2d',
    marginTop: 10,
    width: 320,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  modalView: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
  modalTitle: {
    color: 'white',
    marginBottom: 15,
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  commentText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#6AA0F5',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default CommentsModal;
