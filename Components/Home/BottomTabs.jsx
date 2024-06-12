import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  {
    name: 'Profile',
    active: 'person',
    inactive: 'person-outline',
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
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    padding:10,
    margin:"auto",
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom:50
  },
});
