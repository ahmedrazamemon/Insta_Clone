import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import auth from '@react-native-firebase/auth'
function Header({navigation}) {
  return (
    <>
      <View style={Styles.container}>
        <View>
          <Text style={{color: 'white', fontWeight: 700}}>{auth().currentUser.email}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Icon2
              style={Styles.iconcontainer}
              name="threads"
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("NewPostScreen")}>
            <Icon
              style={Styles.iconcontainer}
              name="plus-square-o"
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("ProfileSetting")}>
            <Icon
              style={Styles.iconcontainer}
              name="bars"
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default Header;

const Styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconcontainer: {
    marginLeft: 10,
    flexDirection: 'row',
  },
});
