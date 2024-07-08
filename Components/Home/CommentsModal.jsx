import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import StandardButton from '../Button';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import ImageComponent from '../Images';

const CommentsModal = ({ visible, onClose, post }) => {
  const [comment, setComment] = useState('');
  const [userdata, setUserdata] = useState({});
  const [postComment, setPostComment] = useState([]);

  useEffect(() => {
    userProfileData();
    if (post && post.comments) {
      setPostComment(post.comments);
    }
  }, [post]);

  const user = auth().currentUser;

  const userProfileData = () => {
    const unSubscribe = firestore()
      .collection('users')
      .where('userid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          setUserdata({
            username: doc.data().username,
            profilePicture: doc.data().profilePicture,
            email: doc.data().email,
          });
        });
      });

    return () => unSubscribe();
  };

  const uploadComment = () => {
    const newComment = {
      username: userdata.username,
      profilePicture: userdata.profilePicture,
      comments: comment,
    };

    if (comment.length === 0) {
      onClose();
      console.log("Can't add empty comment");
    } else {
      console.log('Uploading comment to:', post.email, post.id);
      firestore()
        .collection('users')
        .doc(post.email)
        .collection('posts')
        .doc(post.id)
        .update({
          comments: firestore.FieldValue.arrayUnion(newComment),
        })
        .then(() => {
          setPostComment([...postComment, newComment]);
          setComment('');
          console.log('Document Updated');
        })
        .catch(e => {
          setComment('');
          console.log('Error ', e);
        });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={styles.modalTitle}>Add your comment</Text>
          </View>
          <ScrollView style={{ marginVertical: 20, width: '100%' }}>
            {postComment.map((item, index) => (
              <View key={index} style={styles.commentItem}>
           <View style={{flexDirection:"row",alignItems:"center"}}>
                <ImageComponent source={{uri:item.profilePicture}} style={styles.image}/>
                  <Text style={{ fontWeight: 'bold' ,color:"white"}}>{item.username}</Text>
                  <Text></Text>
           </View>
           <View style={styles.commentText}>
                <Text>
                </Text>
                <Text style={{color:"white"}}>

                  {item.comments}

                </Text>
                <Text></Text>

           </View>
              </View>
            ))}
          </ScrollView>
          <View
            style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholderTextColor={'gray'}
              placeholder={'Add Comment'}
              onChangeText={setComment}
              value={comment}
            />
            <TouchableOpacity onPress={uploadComment}>
              <View
                style={{ backgroundColor: 'white', margin: 5, borderRadius: 10 }}>
                <Icon name="arrow-up" size={40} color={'black'} />
              </View>
            </TouchableOpacity>
          </View>
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
    width: '90%',
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
// width:300,
    color: 'white',
    flexDirection:"row",
    // justifyContent:"space-between"
  },
  button: {
    backgroundColor: '#6AA0F5',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  image:{
    width:40,
    height:40,
    borderRadius:20,
    marginRight:10,
    borderWidth: 2,
    borderColor: '#FF8501' 
  }
});

export default CommentsModal;
