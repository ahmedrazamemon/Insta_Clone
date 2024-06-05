import React from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {ErrorMessage, Formik} from 'formik';
const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string()
    .min(6, 'Password Must be 6 characters long')
    .required('Password is required'),
});
function LoginForm({navigation}) {
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={LoginFormSchema}
      validateOnMount={true}
      onSubmit={()=>navigation.replace("HomeScreen")}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
          <View style={Styles.wrapper}>
            <View style={[Styles.inputFeild]}>
              <TextInput
                autoCapitalize="none"
                placeholderTextColor={'#444'}
                placeholder="Phone Number,User Name or Email"
                keyboardType="email-address"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                value={values.email}
                //   autoFocus={true}
              />
            </View>
            <Text
              style={{
                color: 'red',
                fontSize: 14,
                marginTop: -10,
                marginBottom: 10,
              }}>
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
            <Text
              style={{
                color: 'red',
                fontSize: 14,
                marginTop: -10,
                marginBottom: 10,
              }}>
              <ErrorMessage name={'password'} />
            </Text>
            <View
              style={{alignItems: 'flex-end', marginBottom: 18, marginTop: -6}}>
              <TouchableOpacity>
                <Text style={{color: '#6BB0F5'}}>Forgot password</Text>
              </TouchableOpacity>
            </View>
            <Pressable
              style={Styles.button}
              onPress={handleSubmit}
          >
              <Text style={{color: 'white'}}>Login</Text>
            </Pressable>

            <View style={Styles.SignupContainer}>
              <Text>Don't have an account?</Text>
              <Pressable onPress={()=>navigation.replace("SignupScreen")}><Text style={{color:"#6AA0F5"}}> Signup</Text></Pressable>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
}
export default LoginForm;

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
  SignupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 40,
    flex: 2,
    width: 400,
  },
  button: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth:1
  },
});
