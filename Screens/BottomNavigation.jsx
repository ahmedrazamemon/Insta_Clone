import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Screens/HomeScreen';
import Search from '../Components/NewPost/Search';
import Reels from '../Components/NewPost/Reels';
import Market from '../Components/NewPost/Market';
// import Profile from '../Components/Profile/ProfileDetails';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle:{
          backgroundColor:"black"
        },
        headerShown:false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused
              ? 'search'
              : 'search-outline';
          }
           else if (route.name === 'Reels') {
            iconName = focused
              ? 'play-circle'
              : 'play-circle-outline';
          }
          else if (route.name === 'Market') {
            iconName = focused
              ? 'cart'
              : 'cart-outline';
          }else if (route.name === 'Profile') {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Reels" component={Reels} />
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  );
}
