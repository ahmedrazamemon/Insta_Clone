import {Formik} from 'formik';
import React, {useState} from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import {Divider} from 'react-native-elements';
import * as Yup from 'yup';
const PostUploadSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('Url is Required'),
  caption: Yup.string().max(2200,'Caption has reached charaters limit').required("Caption is required"),
});

function FormikPostUploader() {
  const Img_PlaceHolder = 'https://s2.ezgif.com/tmp/ezgif-2-4ed149de46.png';

  const [thumbNailUrl, setthumbNailUrl] = useState(Img_PlaceHolder);

  return (
    <Formik
      initialValues={{imageUrl: '', caption: ''}}
      onSubmit={values => console.log(values)}
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
              source={{uri: thumbNailUrl?thumbNailUrl:Img_PlaceHolder}}
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
               {errors.caption && (
            <Text style={{fontSize: 14, color: 'red'}}>{errors.caption}</Text>
          )}
         
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={e=>setthumbNailUrl(e.nativeEvent.text)}
            placeholderTextColor={'gray'}
            style={{color: 'white', fontSize: 18}}
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
            placeholder="Image Url"
          />

          {errors.imageUrl && (
            <Text style={{fontSize: 14, color: 'red'}}>{errors.imageUrl}</Text>
          )}
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
