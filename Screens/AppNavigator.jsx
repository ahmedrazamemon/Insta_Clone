import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPostScreen from './NewPostScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import BottomNavigation from './BottomNavigation';
import ProfileSetting from '../Components/Profile/ProfileSetting';
import UserDetails from '../Components/NewPost/UserDetails';

const Stack = createNativeStackNavigator();

export const SignInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen
          name="BottomNavigation"
          options={{headerShown: false}}
          component={BottomNavigation}
        />
        <Stack.Screen
          name="NewPostScreen"
          options={{headerShown: false}}
          component={NewPostScreen}
        />
<Stack.Screen
          name="ProfileSetting"
          options={{headerShown: false}}
          component={ProfileSetting}
        />
<Stack.Screen
          name="UserDetails"
          options={{headerShown: false}}
          component={UserDetails}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const SignOutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="LoginScreen"
          options={{headerShown: false}}
          component={LoginScreen}
        />

        <Stack.Screen
          name="SignupScreen"
          options={{headerShown: false}}
          component={SignupScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
