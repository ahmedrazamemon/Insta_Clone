import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';

function UserProfile({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(29 50 67)'}}>
      <Header  navigation={navigation}/>
      <ScrollView>
        <Body navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const Body = () => {
  const connectedExperiences = [
    {title: 'Sharing across profiles', icon: 'account-arrow-right-outline'},
    {title: 'Logging in with accounts', icon: 'login-variant'},
  ];

  const accountSettings = [
    {title: 'Password and security', icon: 'shield-outline'},
    {title: 'Personal information and details', icon: 'cellphone-information'},
    {title: 'Ad preferences', icon: 'bullhorn-outline'},
    {title: 'Meta pay', icon: 'credit-card-outline'},
    {title: 'Meta verified', icon: 'check-decagram-outline'},
  ];

  return (
    <>
      <View style={{padding: 8}}>
        <View
          style={{
            marginTop: 10,
            padding: 2,
            backgroundColor: 'rgb(28 42 51)',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
            <Icon3 name="user" size={70} color={'white'} />
            <View>
              <Text style={{color: 'white', fontSize: 20}}>Profiles</Text>
              <Text style={{color: 'gray'}}>{auth().currentUser.email}</Text>
            </View>
          </View>
          <View style={{padding: 10}}>
            <Icon2 name="arrow-right" size={12} color={'white'} />
          </View>
        </View>
      </View>
      <Text style={styles.heading}>Connected experiences</Text>
      <View style={{padding: 8}}>
        <View style={styles.itemContainer}>
          {connectedExperiences.map((item, index) => (
            <Item key={index} title={item.title} icon={item.icon} />
          ))}
          <Text style={styles.viewAll}>View all</Text>
        </View>
      </View>
      <Text style={styles.heading}>Account settings</Text>
      <View style={{padding: 8}}>
        <View style={styles.itemContainer}>
          {accountSettings.map((item, index) => (
            <Item key={index} title={item.title} icon={item.icon} />
          ))}
        </View>
      </View>
      <View style={{padding: 6, marginBottom: 20}}>
        <View style={styles.accountContainer}>
          <View style={{flexDirection: 'row'}}>
            <Icon3 name="user" size={40} color={'white'} />
            <Text style={{color: 'white', fontWeight: '500', marginLeft: 10}}>
              {' '}
              Accounts
            </Text>
            <Text></Text>
          </View>
          <View style={{flexDirection: 'row',alignItems:"center", marginLeft: 80}}>
            <Text style={{color: 'gray'}}>
              Review the accounts you have in {'\n'} this accounts center
            </Text>
            <Icon2 name="arrow-right" size={12} color={'white'} />
            <Text></Text>
          </View>
        <Text
          style={{
        marginLeft:5,
            fontSize: 18,
            color: 'rgb(59 139 207)',
          }}>
          Add more accounts
        </Text>
      </View>
        </View>
    </>
  );
};

const Item = ({title, icon}) => (
  <View
    style={{
      padding: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
      <Icon4 name={icon} size={35} color={'white'} />
      <Text style={{marginLeft: 15, color: 'white', fontWeight: '500'}}>
        {title}
      </Text>
    </View>
    <View style={{padding: 10}}>
      <Icon2 name="arrow-right" size={12} color={'white'} />
    </View>
  </View>
);

const  Header = ({navigation}) => {
  return (
    <View>
      <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 40,
            alignItems: 'center',
            padding: 10,
          }}>
        <Icon1 name="x" size={30} color={'white'} onPress={()=>navigation.goBack()}/>
        <Text style={styles.text}>
          <Icon name="meta" color={'white'} size={15} /> Meta
        </Text>
        <Text></Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 27,
            fontWeight: '600',
            color: 'white',
          }}>
          Accounts Center
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            padding: 9,
            fontSize: 16,
          }}>
          Manage your connected experiences and account settings across Meta
          technologies like Facebook, Instagram, and Meta Horizon.
          <Text
            onPress={() =>
              'https://help.instagram.com/1731078377046291/?locale=en_US&helpref=learn_more'
            }
            style={{color: 'rgb(59 139 207)'}}>
            Learn more
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  items: {
    flexDirection: 'row',
    borderColor: 'rgb(28 42 51)',
    borderWidth: 1,
    backgroundColor: 'rgb(28 42 51)',
    height: 80,
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    padding: 10,
  },
  itemContainer: {
    padding: 2,
    backgroundColor: 'rgb(28 42 51)',
    borderRadius: 10,
  },
  viewAll: {
    color: 'rgb(59 139 207)',
    margin: 10,
    fontWeight: '500',
  },
  accountContainer: {
    backgroundColor: 'rgb(28 42 51)',
    borderRadius: 10,
    marginBottom: 30,
    // flexDirection: 'row',
    padding: 10,
    // alignItems: 'center',
  },
});
