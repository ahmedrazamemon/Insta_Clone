import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../Screens/HomeScreen';
import Search from '../Components/NewPost/Search';
import Reels from '../Components/NewPost/Reels';
import ProfileScreen from './ProfileScreen';
import NewPostScreen from './NewPostScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: 'black',
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
          } else if (route.name === 'Search') {
            return <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />;
          } else if (route.name === 'Add') {
            return <FontAwesome name={focused ? 'plus-square-o' : 'plus-square-o'} size={size} color={color} />;
          } else if (route.name === 'Reels') {
            return <Ionicons name={focused ? 'play-circle' : 'play-circle-outline'} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />;
          }
        },
        tabBarShowLabel:false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Add" component={NewPostScreen} />
      <Tab.Screen name="Reels" component={Reels} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
