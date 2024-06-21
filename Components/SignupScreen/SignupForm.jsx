import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
   View,
} from 'react-native';
import * as Yup from 'yup';
import {ErrorMessage, Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import StandardButton from '../Button';
import Loader from '../Loader';
import InputField from '../InputFeild';

const SignupFormSchema = Yup.object().shape({
  username: Yup.string()
    .required('user name is required')
    .min(3, 'user name must have 3 letters'),
  email: Yup.string().email().required('email is required'),
  password: Yup.string()
    .min(6, 'password Must be 6 characters long')
    .required('password is required'),
});

function SignupForm({navigation}) {
  const [loading, setLoading] = useState(false);

  // Getting random profile pictures

  const getRandomProfilePicture = async () => {
    const respone = await fetch('https://randomuser.me/api');
    const data = await respone.json();
    return data.results[0].picture.large;
  };

  // Signup Function
  const onSignup = async (email, password, username) => {
    setLoading(true);
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);

        Toast.show({
          type:ALERT_TYPE.SUCCESS,
          title:"Account Created",
          textBody:"You have been Registered"
        })

      await firestore()
        .collection('users')
        .doc(res.user.email)
        .set({
          userid: res.user.uid,
          username,
          email,
          profilePicture: await getRandomProfilePicture(),
        });

      console.log('User added!');

    } catch (e) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        autoClose: 1000,
        title: 'Signup Failed',
        textBody: e.code,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{username: '', email: '', password: ''}}
      validationSchema={SignupFormSchema}
      validateOnMount={true}
      onSubmit={values =>
        onSignup(values.email, values.password, values.username)
      }>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
          <AlertNotificationRoot>
            <View style={Styles.wrapper}>
            <InputField
                label={"user name"}
                placeholder={"user name"}
                value={values.username}
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
                error={<ErrorMessage name="username" />}
              />
              
           <InputField
           label={"email"}
           placeholder={"email"}
           keyboardType='email-address'
           value={values.email}
           onBlur={handleBlur("email")}
           onChangeText={handleChange("email")}
           error={<ErrorMessage name='email'/>}
           />
          <InputField
          label={"password"}
          placeholder={"password"}
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          keyboardType='password'
          secureTextEntry={true}
          error={<ErrorMessage name='password'/>}
/>
              {loading ? (
                <Loader
                  size="small"
                  color={'#FFF'}
                />
              ) : (
                <StandardButton title={"Signup"} style={Styles.button} onpress={handleSubmit}/>

              )}

              <View style={Styles.Signupcontainer}>
                <Text>Already have an account?</Text>
                <Pressable onPress={() => navigation.replace('LoginScreen')}>
                  <Text style={{color: '#6AA0F5'}}> Login</Text>
                </Pressable>
              </View>
            </View>
          </AlertNotificationRoot>
        </>
      )}
    </Formik>
  );
}
export default SignupForm;

const Styles = StyleSheet.create({
  inputFeild: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  wrapper: {
    marginTop: 50,
    flex: 2,
  },
  Signupcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width:400
    // borderWidth:1
},
    
  errormessage: {
    color: 'red',
    fontSize: 12,
    marginTop: -20,
    marginBottom: 10,
    marginLeft:3
  },
  label:{
    marginTop:-3,
    marginBottom:6,
    marginLeft:5

  }
});
