import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
function Header({navigation}) {

 
  return (
    <>
      <View style={style.container}>
        <TouchableOpacity >
          <Image
            style={style.logo}
            source={require('../../Assets/Images/logo.png')}
          />
        </TouchableOpacity>
        <View style={style.iconcontainer}>
          <TouchableOpacity onPress={()=>navigation.navigate("NewPostScreen")}>
            <Icon style={style.icon} name="plussquareo" size={25} />
          </TouchableOpacity>
          <TouchableOpacity >
            <Icon style={style.icon} name="hearto" size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={style.unreadBadge}>
              <Text style={style.textUnreadBadge}>11</Text>
            </View>
            <Icon2 style={style.icon} name="facebook-messenger"  size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default Header;

const style = StyleSheet.create({
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'center',
  },
  container: {
    marginTop:30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconcontainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
    resizeMode: 'contain',
    color: 'white',
  },
  unreadBadge: {
      backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 18,
    borderRadius: 25,
    width: 25,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  textUnreadBadge: {
    color: 'white',
    fontSize:9,
    fontWeight: 600,
    
},
});
