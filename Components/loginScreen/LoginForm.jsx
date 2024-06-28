import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import * as Yup from 'yup';
import { Formik ,ErrorMessage} from 'formik';
import auth from '@react-native-firebase/auth';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';
import StandardButton from '../Button';
import InputField from '../InputFeild'; // Update the path as necessary

// Yup Schema
const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('password is required'),
});

function LoginForm({ navigation }) {
  const [loading, setLoading] = useState(false);

  // login function
  const onLogin = async (email, password) => {
    setLoading(true);
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Login Successful',
            textBody: 'Successfully logged in',
            autoClose: 1000,
          });
          // navigation.push('HomeScreen');
        });
        setLoading(false)
    } catch (e) {
      setLoading(false)
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Login Failed',
        textBody: e.code,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  // forgotPassword
  const forgotPassword = email => {
    if (!email) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Email Required',
        textBody: 'Please enter your email to reset your password',
        autoClose: 1000,
      });
      return;
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Email Sent',
          textBody: 'Password reset email sent successfully',
          autoClose: 2000,
        });
      })
      .catch(e => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Reset Failed',
          textBody: e.message,
          autoClose: 2000,
        });
      });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginFormSchema}
      validateOnMount={true}
      onSubmit={values => onLogin(values.email, values.password)}>
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <AlertNotificationRoot>
            <View style={Styles.wrapper}>
              <InputField
              style={Styles.inputField}
                label="Email"
                placeholder="email"
                keyboardType="email-address"
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                error={<ErrorMessage name="email" />}
              />
              <InputField
              style={Styles.inputField}
                label="Password"
                placeholder="password"
                secureTextEntry
                value={values.password}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                error={<ErrorMessage name="password" />}
              />
              <View
                style={{
                  alignItems: 'flex-end',
                  marginBottom: 20,
                  marginTop: -20,
                }}>
                <TouchableOpacity onPress={() => forgotPassword(values.email)}>
                  <Text style={{ color: '#6BB0F5' }}>Forgot password</Text>
                </TouchableOpacity>
              </View>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={'#FFF'}
                  style={Styles.button}
                />
              ) : (
                <StandardButton title={'Login'} style={Styles.button} onpress={handleSubmit} />
              )}
              <View style={Styles.SignupContainer}>
                <Text>Don't have an account?</Text>
                <Pressable onPress={() => navigation.replace('SignupScreen')}>
                  <Text style={{ color: '#6AA0F5' }}> Signup</Text>
                </Pressable>
              </View>
            </View>
          </AlertNotificationRoot>
        </>
      )}
    </Formik>
  );
}
export default LoginForm;

const Styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    flex: 2,
  },
  inputField: {
    height:60,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  SignupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 60,
    flex: 2,
    width: 400,
  },
  button: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
