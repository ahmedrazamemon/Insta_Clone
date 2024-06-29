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
import Icon2 from 'react-native-vector-icons/FontAwesome6'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

  // console.log("userdata---", userdata);

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
    
    
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:"space-between",borderWidth:1,borderColor:"red"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <Pressable style={{marginTop:5}} onPress={() => navigation.goBack()}>
          <Icon2 name="arrow-left-long" size={23} color={'white'} />
        </Pressable>
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
          </View>
      <View>
        <Icon name='check' color={"white"} size={30}/>
      </View>
      </View>
    
  );
};

const Inputfeild = ({userdata}) => {

const [newName,setNewName] = useState('')
const [newEmail,setNewEmail] = useState('')
const updateUserData = async () => {
  try {
      const userDoc = await firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .get();

    if (userDoc.exists) {
      const updates = {};

        if (newName) {
        updates.username = newName;
      }
      if (newEmail) {
        updates.email = newEmail;
      }

        await firestore()
        .collection('users')
        .doc(auth().currentUser.email)
        .update(updates);

      console.log('User updated!');
    } else {
      console.log('User does not exist!');
    }
  } catch (error) {
    console.error('Error updating user: ', error);
  }
};

 
  if (!userdata) {
    return <Loader size={"small"} color={"#FFF"} style={{justifyContent:"center"}}/>
  }

  return (

<View style={{}}>
<View style={Styles.container}>
<Text style={Styles.label}>Name</Text>
<InputField
          style={Styles.inputField}
          onChangeText={(e)=>setNewName(e)}
          // value={userdata.username}
          placeholderTextColor="gray"
          placeholder={userdata.username}
          
/>
    </View>
    <View style={Styles.container}>
<Text style={Styles.label}>Email</Text>
<InputField
          style={Styles.inputField}
          placeholder={userdata.email}
          placeholderTextColor={"gray"} 
          onChangeText={(e)=>setNewEmail(e)}         
/>
    </View>
    <View style={Styles.container}>
<Text style={Styles.label}>Pronouns</Text>
    </View>
    <View style={Styles.container}>
<Text style={Styles.label}>Bio</Text>
    </View>
    <Text style={Styles.text}>Add link</Text>

{/* <StandardButton title={"Update"} onPress={()=>updateUserData()} style={Styles.button}/> */}
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
    color:"white"
 
  },
 container:{
  margin:5,
  borderWidth:1,
  height:70,
   borderColor: '#555',
   borderRadius:6,
   padding:10} 

 ,
 text:{
    fontSize:17,
    color:"white",
    fontWeight:500,
    padding:10
 },
 label:
 {marginBottom:-10,
  color:"white",
  marginLeft:5},
  button: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width:400
    // borderWidth:1
},
});
