import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
            <Text style={Styles.label}>user name</Text>
              <View style={Styles.inputFeild}>
                <TextInput
                  autoCapitalize="none"
                  placeholder="user name"
                  keyboardType="twitter"
                  onBlur={handleBlur('username')}
                  onChangeText={handleChange('username')}
                  value={values.username}
                  //   autoFocus={true}
                />
              </View>
              <Text style={Styles.errormessage}>
                <ErrorMessage name={'username'} />
              </Text>
            <Text style={Styles.label}>email</Text>

              <View style={Styles.inputFeild}>
                <TextInput
                  autoCapitalize="none"
                  placeholder="email"
                  keyboardType="email-address"
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  //   autoFocus={true}
                />
              </View>
              <Text style={Styles.errormessage}>
                <ErrorMessage name={'email'} />
              </Text>
            <Text style={Styles.label}>password</Text>

              <View style={Styles.inputFeild}>
                <TextInput
                  placeholder="password"
                  textContentType="password"
                  secureTextEntry={true}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
              </View>
              <Text style={Styles.errormessage}>
                <ErrorMessage name={'password'} />
              </Text>

              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={'#FFF'}
                  style={Styles.button}
                />
              ) : (
                <StandardButton title={"Signup"} onpress={handleSubmit}/>

              )}

              <View style={Styles.Signupcontainer}>
                <Text>Don't have an account?</Text>
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
    // borderTopRightRadius:20,
    // borderTopLeftRadius:20
    // margin:10
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
