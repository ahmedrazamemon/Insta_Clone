import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

export const BottomTabIcons = [
  {
    name: 'Home',
    active: 'home',
    inactive: 'home-outline',
  },
  {
    name: 'Search',
    active: 'search',
    inactive: 'search-outline',
  },
  {
    name: 'Reels',
    active: 'play-circle',
    inactive: 'play-circle-outline',
  },
  {
    name: 'Shop',
    active: 'cart',
    inactive: 'cart-outline',
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const IconComponent = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Ionicons
        name={activeTab === icon.name ? icon.active : icon.inactive}
        size={30}
        color="white"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <IconComponent key={index} icon={icon} />
      ))}
      <TouchableOpacity onPress={() => auth().signOut()}>
        <Ionicons name="person-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
    backgroundColor: '#000', // Adjust as necessary
  },
});
