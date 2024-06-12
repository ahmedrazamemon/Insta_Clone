import {ErrorMessage, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import {Divider} from 'react-native-elements';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const PostUploadSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('Url is Required'),
  caption: Yup.string()
    .max(2200, 'Caption has reached charaters limit')
    .required('Caption is required'),
});

function FormikPostUploader({navigation}) {
  const Img_PlaceHolder = 'https://s2.ezgif.com/tmp/ezgif-2-4ed149de46.png';

  const [thumbNailUrl, setthumbNailUrl] = useState(Img_PlaceHolder);
  const [currentLoggedInUser, setcurrentLoggedInUser] = useState(null);

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

  const postUploader = (imgurl, caption) => {
    const user = auth().currentUser;
    firestore()
      .collection('users')
      .doc(user.email)
      .collection('posts')
      .add({
        imgurl: imgurl,
        caption: caption,
        username:currentLoggedInUser?.username,
        email:currentLoggedInUser?.email,
        profilePicture: currentLoggedInUser?.profilePicture,
        userid: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        likes: 0,
        comments: [],
        likesbyuser: [],
      })
      .then(() => {
        console.log('Data Added');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error adding document:', error);
      });
  };
  return (
    <Formik
      initialValues={{imageUrl: '', caption: ''}}
      onSubmit={(values) =>postUploader(values.imageUrl,values.caption)}
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
            <Image
              source={{uri: thumbNailUrl ? thumbNailUrl : Img_PlaceHolder}}
              style={{width: 150, height: 150, resizeMode: 'contain'}}
            />

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
          <TextInput
            onChange={e => setthumbNailUrl(e.nativeEvent.text)}
            placeholderTextColor={'gray'}
            style={{color: 'white', fontSize: 18}}
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
            placeholder="Image Url"
          />
          <Text style={{color: 'red', fontWeight: '400'}}>
            <ErrorMessage name={'imageUrl'} />
          </Text>
          <Button
            onPress={handleSubmit}
            title="share"
            disabled={!isValid}></Button>
        </>
      )}
    </Formik>
  );
}
export default FormikPostUploader;
