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

const SignupFormSchema = Yup.object().shape({
  username: Yup.string()
    .required('User name is required')
    .min(3, 'User name must have 3 letters'),
  email: Yup.string().email().required('email is required'),
  password: Yup.string()
    .min(6, 'Password Must be 6 characters long')
    .required('Password is required'),
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
        .collection('Users')
        .doc(res.user.email)
        .set({
          userid: res.user.uid,
          username,
          email,
          profilePicture: await getRandomProfilePicture(),
        });

      console.log('User added!');

      navigation.push('HomeScreen');
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
              <View style={Styles.inputFeild}>
                <TextInput
                  autoCapitalize="none"
                  placeholderTextColor={'#444'}
                  placeholder="User Name"
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
              <View style={[Styles.inputFeild]}>
                <TextInput
                  autoCapitalize="none"
                  placeholderTextColor={'#444'}
                  placeholder="Email"
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
              <View style={Styles.inputFeild}>
                <TextInput
                  placeholderTextColor={'#444'}
                  placeholder="Password"
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
                <Pressable style={Styles.button} onPress={handleSubmit}>
                  <Text style={{color: 'white'}}>Signup</Text>
                </Pressable>
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
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
  },
});
