import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FormikPostUploader from './FormikPostUploader';

function AddNewPost({navigation}) {
  return (
    <View style={Styles.container}>
      <Header />
      <FormikPostUploader/>
    </View>
  );
}
const Header = () => {
  return (
    <View style={Styles.HeaderContainer}>
      <TouchableOpacity onPress={navigation.goBack()}>
        <Icon name="chevron-back" color={'white'} size={30} />
      </TouchableOpacity>
      <Text style={Styles.HeaderText}>NEW POST</Text>
      <Text></Text>
    </View>
  );
};
export default AddNewPost;

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between"
},
  HeaderText:{
    color:'#fff',
    fontWeight:700,
    
}
});
