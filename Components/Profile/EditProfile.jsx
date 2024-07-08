import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import InputField from '../InputFeild';
import DropDown from '../SignupScreen/DropDown';
import {Image} from 'react-native-compressor';
import ImagePicker from 'react-native-image-crop-picker';
import ImageComponent from '../Images';
import storage from '@react-native-firebase/storage';
import Loader from '../Loader';
import StandardButton from '../Button';

function EditProfile({navigation}) {
  const [userdata, setUserdata] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newImage, setNewImage] = useState('');
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userdata) {
      setNewName(userdata.username);
      setNewEmail(userdata.email);
      setImageUri(userdata.profilePicture);
    }
  }, [userdata]);

  const getUserData = async () => {
    try {
      firestore()
        .collection('users')
        .doc(auth().currentUser.email)
        .get()
        .then(data => {
          setUserdata(data.data());
          console.log('userdata---', userdata);
        });
    } catch (e) {
      console.log('error---', e);
    }
  };

  const updateUserData = async () => {
    setLoading(true);
    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(auth().currentUser.email)
        .get();

      if (userDoc.exists) {
        const updates = {};

        if (newName) {
          updates.username = newName;
        }
        if (newEmail) {
          updates.email = newEmail;
        }
        if (newImage) {
          updates.profilePicture = newImage;
        }

        await firestore()
          .collection('users')
          .doc(auth().currentUser.email)
          .update(updates);

        console.log('User updated!');
      } else {
        console.log('User does not exist!');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating user: ', error);
    } finally {
      setLoading(false);
    }
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setLoading(true);
        setImageUri(image.path);
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
        setImageUri(res.path);
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
      'userProfilePicture/' + auth().currentUser.email + '.jpg',
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
          console.error('Error uploading image ', error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            const img_url = downloadURL;
            setUploadImage(img_url);
            setLoading(false);
            console.log('File available at', img_url);
            setNewImage(img_url);
          });
        },
      );
    } catch (error) {
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
    <View style={{flex: 1, backgroundColor: 'black', marginTop: 30}}>
      <Header navigation={navigation} title={'Edit Profile'} backArrow />
      <AvatarImage onEditPress={handleOpenModal} imageUri={imageUri} />
      <Inputfeild
        loading={loading}
        userdata={userdata}
        setNewName={setNewName}
        updateUserData={updateUserData}
        setNewEmail={setNewEmail}
        newName={newName}
        newEmail={newEmail}
      />
      {/* <DropDown /> */}
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
    </View>
  );
}

const Header = ({navigation, title, loading, updateUserData}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable style={{marginTop: 5,width:50,padding:5}} onPress={() => navigation.goBack()}>
          <Icon2 name="arrow-left-long" size={23} color={'white'} />
        </Pressable>
        <Text
          style={{
            marginTop: 10,
            color: 'white',
            fontSize: 20,
            marginLeft: 20,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </View>
      <View></View>
    </View>
  );
};

const Inputfeild = ({
  userdata,
  setNewName,
  setNewEmail,
  newName,
  newEmail,
  loading,
  updateUserData,
}) => {
  if (!userdata) {
    return (
      <Loader
        size={'small'}
        color={'#FFF'}
        style={{justifyContent: 'center'}}
      />
    );
  }

  return (
    <View style={{}}>
      <View style={Styles.container}>
        <Text style={Styles.label}>Name</Text>
        <InputField
          style={Styles.inputField}
          onChangeText={e => setNewName(e)}
          value={newName}
        />
      </View>
      <View style={Styles.container}>
        <Text style={Styles.label}>Email</Text>
        <InputField
          style={Styles.inputField}
          onChangeText={e => setNewEmail(e)}
          value={newEmail}
        />
      </View>
      <View style={Styles.container}>
        <Text style={Styles.label}>Pronouns</Text>
      </View>
      <View style={Styles.container}>
        <Text style={Styles.label}>Bio</Text>
      </View>
      <Text style={Styles.text}>Add link</Text>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {loading ? (
          <Loader size={'small'} color={'white'} style={Styles.loader} />
        ) : (
          <StandardButton
            onPress={updateUserData}
            style={Styles.button}
            title={'update user'}
          />
        )}
      </View>
    </View>
  );
};

const AvatarImage = ({onEditPress, imageUri}) => {
  return (
    <View
      style={{
        marginTop: 30,
        alignItems: 'center',
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 160,
        }}>
        <TouchableOpacity style={Styles.usericon}>
          <ImageComponent
            source={{uri: imageUri}}
            style={{width: 70, height: 70, borderRadius: 35}}
          />
          {/* : <Icon1
        name="user-o"
        size={38}
        color={'white'}
        style={{ marginTop: 10, zIndex: -100 }}
      />
    
        } */}
        </TouchableOpacity>
        <TouchableOpacity style={Styles.avataricon}>
          <Icon name="face-man" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onEditPress}>
        <Text style={{color: '#a0d3ee', fontWeight: '500', marginTop: 10}}>
          Edit picture or avatar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default EditProfile;

const Styles = StyleSheet.create({
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
  usericon: {
    borderRadius: 50,
    padding: 10,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(219 219 219)',
  },
  avataricon: {
    borderRadius: 50,
    padding: 10,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputField: {
    marginTop: -23,
    color: 'white',
  },
  container: {
    margin: 5,
    borderWidth: 1,
    height: 70,
    borderColor: '#555',
    borderRadius: 6,
    padding: 10,
  },
  text: {
    fontSize: 17,
    color: 'white',
    fontWeight: 500,
    padding: 10,
  },
  label: {
    marginBottom: -10,
    color: 'white',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 400,
  },
  loader: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 400,
  },
});
