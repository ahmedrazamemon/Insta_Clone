import React from 'react';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function LoginForm() {
  return (

    <View style={Styles.wrapper}>
      <View style={Styles.inputFeild}>
        <TextInput
          autoCapitalize="none"
          placeholderTextColor={'#444'}
          placeholder="Phone Number,User Name or Email"
          keyboardType="email-address"
          //   autoFocus={true}
          />
      </View>
      <View style={Styles.inputFeild}>
        <TextInput
          placeholderTextColor={'#444'}
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          />
      </View>
      <View style={{alignItems: 'flex-end', marginBottom: 18, marginTop: -6}}>
        <TouchableOpacity>
          <Text style={{color: '#6BB0F5'}}>Forgot password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Button title="Login" onPress={() => console.log('pressed')} />
      </TouchableOpacity>
      <View style={Styles.SignupContainer}>
        <Text>
          Don't have an account?
        </Text>
        <TouchableOpacity>
          <Text style={{color:"#6BB0F5"}}> Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  wrapper: {
    marginTop: 50,
  },
  SignupContainer:{

    flexDirection:"row",
    justifyContent:"center",
    marginTop:20
  }
});
