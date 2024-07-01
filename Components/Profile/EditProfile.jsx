// import React, { useEffect, useState } from 'react';
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon1 from 'react-native-vector-icons/FontAwesome';
// import Icon2 from 'react-native-vector-icons/FontAwesome6';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import Loader from '../Loader';
// import InputField from '../InputFeild';
// import DropDown from '../SignupScreen/DropDown';

// function EditProfile({ navigation }) {
//   const [userdata, setUserdata] = useState(null);
//   const [newName, setNewName] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [loading,setloading] = useState(false)

//   useEffect(() => {
//     getUserData();
//   }, []);

//   useEffect(() => {
//     if (userdata) {
//       setNewName(userdata.username);
//       setNewEmail(userdata.email);
//     }
//   }, [userdata]);

//   const getUserData = async () => {
//     try{
//      firestore()
//       .collection('users')
//       .doc(auth().currentUser.email)
//       .get()
//       .then(data => {
//         setUserdata(data.data());
//       })
//     }  catch(e){
//         console.log('error---', e);
//       }
    
//       };

//   const updateUserData = async () => {
//     setloading(true)
//     try {
//       const userDoc = await firestore()
//         .collection('users')
//         .doc(auth().currentUser.email)
//         .get();

//       if (userDoc.exists) {
//         const updates = {};

//         if (newName) {
//           updates.username = newName;
//         }
//         if (newEmail) {
//           updates.email = newEmail;
//         }

//         await firestore()
//           .collection('users')
//           .doc(auth().currentUser.email)
//           .update(updates);

//         console.log('User updated!');
//       } else {
//         console.log('User does not exist!');
//       }
//       setloading(true)

//     } catch (error) {
//       setloading(false)
//       console.error('Error updating user: ', error);
//     }
//     finally{
//       setloading(false)
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'black', marginTop: 30 }}>
//       <Header loading={loading} navigation={navigation} title={'Edit Profile'} backArrow updateUserData={updateUserData} />
//       <AvatarImage />
//       <Inputfeild userdata={userdata} setNewName={setNewName} setNewEmail={setNewEmail} newName={newName} newEmail={newEmail} />
//       <DropDown />
//     </View>
//   );
// }

// const Header = ({ navigation, title, loading, updateUserData }) => {
//   return (
//     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Pressable style={{ marginTop: 5 }} onPress={() => navigation.goBack()}>
//           <Icon2 name="arrow-left-long" size={23} color={'white'} />
//         </Pressable>
//         <Text
//           style={{
//             marginTop: 10,
//             color: 'white',
//             fontSize: 20,
//             marginLeft: 20,
//             fontWeight: '500',
//           }}>
//           {title}
//         </Text>
//       </View>
//       <View>
//       {
//         loading?(
//           <Loader size={"small"} color={"white"}/>
//         ):(
//           <Icon name='check' size={30} onPress={updateUserData} color={"#6BB0F5"}/>
//         )
//       }
//       </View>
//     </View>
//   );
// };

// const Inputfeild = ({ userdata, setNewName, setNewEmail, newName, newEmail }) => {
//   if (!userdata) {
//     return <Loader size={"small"} color={"#FFF"} style={{ justifyContent: "center" }} />
//   }

//   return (
//     <View style={{}}>
//       <View style={Styles.container}>
//         <Text style={Styles.label}>Name</Text>
//         <InputField
//           style={Styles.inputField}
//           onChangeText={(e) => setNewName(e)}
//           value={newName}
//         />
//       </View>
//       <View style={Styles.container}>
//         <Text style={Styles.label}>Email</Text>
//         <InputField
//           style={Styles.inputField}
//           onChangeText={(e) => setNewEmail(e)}
//           value={newEmail}
//         />
//       </View>
//       <View style={Styles.container}>
//         <Text style={Styles.label}>Pronouns</Text>
//       </View>
//       <View style={Styles.container}>
//         <Text style={Styles.label}>Bio</Text>
//       </View>
//       <Text style={Styles.text}>Add link</Text>

//       {/* <StandardButton title={"Update"} onPress={()=>updateUserData()} style={Styles.button}/> */}
//     </View>
//   );
// };

// const AvatarImage = () => {
//   return (
//     <View
//       style={{
//         marginTop: 30,
//         alignItems: 'center',
//         padding: 10,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           width: 160,
//         }}>
//         <TouchableOpacity style={Styles.usericon}>
//           <Icon1
//             name="user-o"
//             size={38}
//             color={'white'}
//             style={{ marginTop: 10, zIndex: -100 }}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity style={Styles.avataricon}>
//           <Icon name="face-man" size={30} color={'black'} />
//         </TouchableOpacity>
//       </View>
//       <Text style={{ color: '#a0d3ee', fontWeight: '500', marginTop: 10 }}>
//         Edit picture or avatar
//       </Text>
//     </View>
//   );
// };

// export default EditProfile;

// const Styles = StyleSheet.create({
//   usericon: {
//     borderRadius: 50,
//     padding: 10,
//     width: 70,
//     height: 70,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgb(219 219 219)',
//   },
//   avataricon: {
//     borderRadius: 50,
//     padding: 10,
//     width: 70,
//     height: 70,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   inputField: {
//     marginTop: -23,
//     color: "white"
//   },
//   container: {
//     margin: 5,
//     borderWidth: 1,
//     height: 70,
//     borderColor: '#555',
//     borderRadius: 6,
//     padding: 10
//   },
//   text: {
//     fontSize: 17,
//     color: "white",
//     fontWeight: 500,
//     padding: 10
//   },
//   label: {
//     marginBottom: -10,
//     color: "white",
//     marginLeft: 5
//   },
//   button: {
//     backgroundColor: '#6AA0F5',
//     minHeight: 43,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     width: 400
//     // borderWidth:1
//   },
// });
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Image } from 'react-native-compressor';
import ImageComponent from '../Images';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Loader from '../Loader';

function EditProfile() {
  const [imageUri, setImageUri] = useState(null);
  const [uploadImage,setUploadImage]=useState(null)
  const [loading,setLoading] = useState(false)


  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setLoading(true)

      setImageUri(image.path);
      console.log(image.path, "------path");
      imageupload(image.path)
    }).catch(e => {
      setLoading(false)

      console.log("error --- ", e);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      compressImageQuality: 0.4,
      freeStyleCropEnabled: true,
      forceJpg: true,
      includeBase64: true,
    }).then(async res => {
      setLoading(true)

      setImageUri(res.path);
      console.log("res---", res.path);
      imageupload(res.path)
      

    }).catch(e => {
      setLoading(false)

      console.log("error", e);
    });
  };


  const imageupload = (imageurl) => {
    const reference = storage().ref('images/' + new Date().getTime() + '.jpg');
    try {
      console.log("img---",imageurl)
        const uploadTask = reference.putFile(imageurl);

        uploadTask.on('state_changed',
            (snapshot) => {
                console.log("snapshot----",snapshot)

            },
            (error) => {
                console.error('Error uploading image ', error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const img_url = downloadURL;
                    setUploadImage(img_url)
                    setLoading(false)
                    console.log('File available at', img_url);
                    
                });
            }
        );
    } catch (error) {
        console.error('Error uploading image: ', error);
    }
}

  return (
    <View>
      <Text>Open</Text>
      {imageUri && (
        <ImageComponent source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      )}
      <TouchableOpacity onPress={selectImage}>
        <Text style={{ color: "white", marginTop: 100 }}>Open Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openCamera}>
        <Text style={{ color: "white", marginTop: 100 }}>Open Camera</Text>
      </TouchableOpacity>
      {
        loading?(<Loader size={"large"} color={"white"}/>):(
        
        <ImageComponent source={{uri:uploadImage}} style={{width:100,height:100}}/>
      )}
    </View>
  );
}

export default EditProfile;
