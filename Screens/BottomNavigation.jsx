// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// // import BottomTabs, { BottomTabIcons } from '../Components/Home/BottomTabs'; // Adjust the path
// import HomeScreen from './HomeScreen';
// import Search from '../Components/NewPost/Search';
// import Reels from '../Components/NewPost/Reels';
// import Market from '../Components/NewPost/Market';
// import Profile from '../Components/NewPost/Profile';
// import { View,StyleSheet } from 'react-native';

// const Tab = createBottomTabNavigator();

// const BottomNavigation = () => {

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName="HomeScreen"
//         screenOptions={({route}) => ({
//           headerShown:false,
//           tabBarIcon: ({focused, color, size}) => {
//             let iconName;
//             let rn = route.name;
//             if (rn == 'HomeScreen') {
//               iconName = focused ? 'home' : 'home-outline';
//             }else if (rn == 'Search') {
//               iconName = focused ? 'search' : 'search-outline';
//             }
//             else if (rn == 'Reels') {
//               iconName = focused ? 'play-circle' : 'play-circle-outline';
//             }else if (rn == 'Market') {
//               iconName = focused ? 'cart' : 'cart-outline';
//             }else if (rn == 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             }
//             return (
//             <View style={styles.container}>

//             <Ionicons name={iconName} size={20} color={"red"}/>
//             </View>
//             )
//           },
//         })}>
//         <Tab.Screen name="HomeScreen" component={HomeScreen} />
//         <Tab.Screen name="Search" component={Search} />
//         <Tab.Screen name="Reels" component={Reels} />
//         <Tab.Screen name="Market" component={Market} />
//         <Tab.Screen name="Profile" component={Profile} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default BottomNavigation;
// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     margin: 'auto',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 50,
//     backgroundColor: '#000', // Adjust as necessary
//   },
// });

// navigation/BottomTabNavigator.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Screens/HomeScreen';
import NewPostScreen from '../Screens/NewPostScreen';

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
          } else if (route.name === 'NewPostScreen') {
            iconName = focused
              ? 'play-circle'
              : 'play-circle-outline';
          }
           else if (route.name === 'NewPostScreen') {
            iconName = focused
              ? 'play-circle'
              : 'play-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="NewPostScreen" component={NewPostScreen} />
    </Tab.Navigator>
  );
}
