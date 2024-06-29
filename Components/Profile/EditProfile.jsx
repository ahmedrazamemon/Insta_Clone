import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import StandardButton from '../Button';
import Loader from '../Loader';
import InputField from '../InputFeild';
import DropDown from '../SignupScreen/DropDown';

function EditProfile({navigation}) {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .get()
      .then(data => {
        // console.log('data--', data);
        setUserdata(data.data());
      })
      .catch(e => {
        console.log('error---', e);
      });
  };

//   console.log("userdata---", userdata);

  return (
    <View style={{flex: 1, backgroundColor: 'black', marginTop: 30}}>
      <Header navigation={navigation} title={'Edit Profile'} backArrow />
      <AvatarImage />
      <Inputfeild userdata={userdata} />
        <DropDown/>
    </View>
  );
}

const Header = ({navigation, title, backArrow}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {backArrow && (
        <Pressable style={{marginTop: 15}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={23} color={'white'} />
        </Pressable>
      )}
      <Text
        style={{
          marginTop: 10,
          color: 'white',
          fontSize: 20,
          marginLeft: 20,
          fontWeight: '500',
        }}>
        {title}
      </Text>
      <Text></Text>
    </View>
  );
};

const Inputfeild = ({userdata}) => {
  if (!userdata) {
    return <Loader size={"small"} color={"#FFF"} style={{justifyContent:"center"}}/>
  }

  return (

<View style={{}}>
<View style={Styles.container}>
<Text style={{marginBottom:-10,marginLeft:5}}>Name</Text>
<InputField
          style={Styles.inputField}
          value={userdata.username}
          
/>
    </View>
    <View style={Styles.container}>
<Text style={{marginBottom:-10,marginLeft:5}}>Email</Text>
<InputField
          style={Styles.inputField}
          value={userdata.email}
          
/>
    </View>
    <View style={Styles.container}>
<Text style={{marginBottom:-10,marginLeft:5}}>Pronouns</Text>
    </View>
    <View style={Styles.container}>
<Text style={{marginBottom:-10,marginLeft:5}}>Bio</Text>
    </View>
    <Text style={Styles.text}>Add link</Text>

          </View>
  );
};


const AvatarImage = () => {
  return (
    <View
      style={{
        marginTop: 30,
        alignItems: 'center',
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 160,
        }}>
        <TouchableOpacity style={Styles.usericon}>
          <Icon1
            name="user-o"
            size={38}
            color={'white'}
            style={{marginTop: 10, zIndex: -100}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.avataricon}>
          <Icon name="face-man" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <Text style={{color: '#a0d3ee', fontWeight: '500', marginTop: 10}}>
        Edit picture or avatar
      </Text>
    </View>
  );
};

export default EditProfile;

const Styles = StyleSheet.create({
  usericon: {
    borderRadius: 50,
    padding: 10,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(219 219 219)',
  },
  avataricon: {
    borderRadius: 50,
    padding: 10,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputField: {
    marginTop:-23,
 
  },
 container:{margin:5,borderWidth: 1,height:70, borderColor: '#555',borderRadius:6,padding:10} 

 ,
 text:{
    fontSize:17,
    color:"white",
    fontWeight:500,
    padding:10
 }
});
