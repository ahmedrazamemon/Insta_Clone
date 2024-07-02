import {ErrorMessage, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Button,  StyleSheet, Modal,Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-elements';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loader from '../Loader';
import StandardButton from '../Button';
import {Image} from 'react-native-compressor';
import ImagePicker from 'react-native-image-crop-picker';
import ImageComponent from '../Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import storage from '@react-native-firebase/storage'

const PostUploadSchema = Yup.object().shape({
  caption: Yup.string()
    .max(2200, 'Caption has reached charaters limit')
    .required('Caption is required'),
});

function FormikPostUploader({navigation}) {
  const Img_PlaceHolder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC_SwvwrfdVWZRJcmrwdq7wQIXNx59G4UdsA&s';

  const [thumbNailUrl, setthumbNailUrl] = useState(Img_PlaceHolder);
  const [currentLoggedInUser, setcurrentLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getUserName = () => {
    const user = auth().currentUser;
    const unSubscribe = firestore()
      .collection('users')
      .where('userid', '==', user.uid)
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          setcurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profilePicture, 
            email:doc.data().email
          });
        });
      });

    return unSubscribe;
  };

  useEffect(() => {
    const unsubscribe = getUserName();
    return () => unsubscribe && unsubscribe(); 
  }, []);

  const postUploader = (caption) => {
    setLoading(true)
    const user = auth().currentUser;
    firestore()
      .collection('users')
      .doc(user.email)
      .collection('posts')
      .add({
        imgurl: thumbNailUrl,
        caption: caption,
        username:currentLoggedInUser?.username,
        email:currentLoggedInUser?.email,
        profilePicture: currentLoggedInUser?.profilePicture,
        userid: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        likes: 0,
        comments: [],
        likesbyuser: [],
        followers:[],
        following:[],
        sevedposts:[]
      })
      .then(() => {
        setLoading(false)
        console.log('Data Added');
        navigation.goBack();
        setthumbNailUrl(Img_PlaceHolder)
      
      })
      .catch(error => {
        setLoading(false)
        console.error('Error adding document:', error);
      });  
    
  };
  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setLoading(true);
        // setthumbNailUrl(image.path);
        console.log('res from gallery-----', image.path);
        compressImage(image.path);
      })
      .catch(e => {
        setLoading(false);
        console.log('error --- ', e);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      compressImageQuality: 0.4,
      freeStyleCropEnabled: true,
      forceJpg: true,
      includeBase64: true,
    })
      .then(res => {
        setLoading(true);
        // setthumbNailUrl(res.path);
        console.log('res from camera---', res.path);
        compressImage(res.path);
      })
      .catch(e => {
        setLoading(false);
        console.log('error', e);
      });
  };

  const imageupload = imageurl => {
    const reference = storage().ref(
      'UserPosts/' + auth().currentUser.email + '.jpg',
    );
    try {
      console.log('img---', imageurl);
      const uploadTask = reference.putFile(imageurl);

      uploadTask.on(
        'state_changed',
        snapshot => {
          console.log('snapshot----', snapshot);
        },
        error => {
          setLoading(false)
          console.error('Error uploading image ', error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            const img_url = downloadURL;
            // setUploadImage(img_url);
            setLoading(false);
            console.log('File available at', img_url);
            setthumbNailUrl(img_url);
          });
        },
      );
    } catch (error) {
      setLoading(false)
      console.error('Error uploading image: ', error);
    }
  };

  async function compressImage(uri) {
    try {
      const compressedImage = await Image.compress(uri, {
        compressionMethod: 'auto', // 'manual', 'auto'
        maxSize: 300, // Maximum file size in KB (for manual compression)
        quality: 0.7, // Compression quality (for manual compression)
      });
      console.log('Compressed Image URI:', compressedImage);
      imageupload(compressedImage);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  }

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Formik
      initialValues={{caption: ''}}
      onSubmit={(values) =>postUploader(values.caption)}
      validationSchema={PostUploadSchema}
      validateOnMount={true}
    >
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
          <View
            style={{
              margin: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <TouchableOpacity onPress={handleOpenModal}>
            <ImageComponent
              source={{uri: thumbNailUrl ? thumbNailUrl : Img_PlaceHolder}}
              style={{width: 150, height: 150, resizeMode: 'contain'}}
              />
              </TouchableOpacity>

            <View style={{flex: 1, margin: 12}}>
              <TextInput
                placeholderTextColor={'gray'}
                style={{color: 'white', fontSize: 18}}
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
                placeholder="Write a Caption here.."
              />
              <Text style={{color: 'red', fontWeight: '300'}}>
                <ErrorMessage name={'caption'} />
              </Text>
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          {
            loading?<Loader style={Styles.loader} size={"small"} color={"#FFF"}/>:
          <StandardButton
          onPress={handleSubmit}
          style={Styles.button}
          title="share"
          disabled={!isValid}/>
                  }
        <ImagePickerModal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onGalleryPress={() => {
          selectImage();
          handleCloseModal();
        }}
        onCameraPress={() => {
          openCamera();
          handleCloseModal();
        }}
      />
    
        </>
      )}
      
    </Formik>
  );
}
const ImagePickerModal = ({
  visible,
  onCancel,
  onGalleryPress,
  onCameraPress,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={Styles.modalContainer}>
        <Text style={Styles.modalTitle}>Select Image</Text>
        <View>
          <TouchableOpacity style={Styles.buttonContainer}>
            <Icon
              name="camera-outline"
              color={'white'}
              size={30}
              onPress={onCameraPress}
            />
            <Icon
              name="image-outline"
              color={'white'}
              size={30}
              onPress={onGalleryPress}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FormikPostUploader;

const Styles= StyleSheet.create({
  loader: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:20
  }, button: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:20
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 10, 0.5)',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-around',
    padding: 10,
    width: '30%',
  },
})