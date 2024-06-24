import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import InputField from '../InputFeild';
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons'
import Icon4 from 'react-native-vector-icons/FontAwesome6'
function ProfileSetting() {
    
  // How to use Instagram
  const arr1 = [
    {title: 'Saved', icon: 'bookmark-o'},
    {title: 'Archive', icon: 'archive'},
    {title: 'Your Activity', icon: 'line-chart'},
    {title: 'Notifications', icon: 'bell-o'},
    {title: 'Time Spent', icon: 'clock-o'},
  ];
  // Who can see your content
  const arr2 = [
    {title: 'Account privacy', icon: 'lock'},
    {title: 'Close Friends', icon: 'star-circle-outline'},
    {title: 'Blocked', icon: 'block-helper'},
    {title: 'Hide story and live', icon: 'block-helper'},
  ];
  // How others can interact with you
  const arr3 = [
    {title: 'Messages and story replies', icon: 'message-reply'},
    {title: 'Tags and mentions', icon: 'tag'},
    {title: 'Comments', icon: 'comment'},
    {title: 'Sharing and remixes', icon: 'share'},
    {title: 'Restricted', icon: 'account-off'},
    {title: 'Limit interactions', icon: 'account-minus'},
    {title: 'Hidden words', icon: 'eye-off'},
    {title: 'Follow and invite friends', icon: 'account-plus'},
  ];
  // What you see
  const arr4 = [
    {title: 'Favorites', icon: 'heart'},
    {title: 'Muted accounts', icon: 'volume-mute'},
    {title: 'Suggested content', icon: 'thumbs-up'},
    {title: 'Like and share counts', icon: 'thumbs-up-down'},
  ];
  // Your app and media
  const arr5 = [
    {title: 'Device permission', icon: 'devices'},
    {title: 'Archiving and downloading', icon: 'download'},
    {title: 'Accessibility', icon: 'accessible'},
    {title: 'Language', icon: 'language'},
    {title: 'Data usage and media quality', icon: 'data-usage'},
    {title: 'Website permission', icon: 'web'},
  ];
  // For families
  const arr6 = [{title: 'Supervision', icon: 'account-supervisor'}];
  // For professionals
  const arr7 = [
    {title: 'Account type and tools', icon: 'toolbox'},
    {title: 'Meta verified', icon: 'check-circle'},
  ];
  // Your orders and fundraisers
  const arr8 = [{title: 'Orders and payments', icon: 'credit-card'}];
  // More info and support
  const arr9 = [
    {title: 'Help', icon: 'help-circle'},
    {title: 'Privacy center', icon: 'shield'},
    {title: 'Account status', icon: 'account-check'},
    {title: 'About', icon: 'information'},
  ];
  // Also from Meta
  const arr10 = [
    {title: 'WhatsApp', icon: 'whatsapp'},
    {title: 'Threads', icon: 'forum'},
    {title: 'Facebook', icon: 'facebook'},
  ];

  return (
      <ScrollView>
    <View style={{flex: 1, backgroundColor: 'black', marginTop: 30}}>
       <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Pressable style={{marginTop:15}}>
            <Icon2 name='arrow-left' size={25} color={"white"}/>
        </Pressable>
        <Text style={{marginTop:10,color:"white",fontSize:20}}>Settings and activity</Text>
       <Text></Text>
       </View>
       <View style={{alignSelf:"center"}}>
<TextInput placeholder='Search' style={{backgroundColor:"#2d2d2d",borderWidth:1,borderColor:"#2d2d2d",marginTop:10,width:400,borderRadius:10}}/>
       </View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={Styles.text}>Your account</Text>
          <Text style={{color:"#858585",fontWeight:500}}><Icon4 name='meta' color={"#858585"} size={15}/> Meta</Text>
        </View>
     
     
        <View style={{marginTop: 10,flexDirection:"row",padding:2}}>
         <View style={{padding:5}}>
            <Text></Text>
            <Icon1 name="user" size={34} color={"white"}/>
            <Text></Text>
         </View>
         <View>
         <Text style={{color:"white",fontSize:20}}>Accounts Center</Text>
         <Text style={Styles.text}>Password,Security,Personal details,
            ad prefences</Text>
         {/* <Text></Text> */}
         </View>
        </View>
        <View style={{padding:7}}>
            <Text style={Styles.text}>Manage your connected experiences and account
                settings accross Meta technologies.
            </Text>
        </View>
        <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

        <Text style={Styles.text}>How to use Instagram</Text>
        </View>
        {arr1.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
        <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>
<Text style={Styles.text}>Who can see your content</Text>
</View>
        {arr2.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

<Text style={Styles.text}>How others can interact with you</Text>
</View>
        {arr3.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

<Text style={Styles.text}>What you see</Text>
</View>
        {arr4.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

<Text style={Styles.text}>Your app and media</Text>
</View>
        {arr5.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

<Text style={Styles.text}>For families</Text>
</View>
        {arr6.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

<Text style={Styles.text}>For professionals</Text>
</View>
        {arr7.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

<Text style={Styles.text}>Your orders and fundraisers</Text>
</View>
        {arr8.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

<Text style={Styles.text}>More info and support</Text>
</View>
        {arr9.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{padding:10}}>

<Text style={Styles.text}>Also from meta</Text>
</View>
        {arr10.map((arr, index) => (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
             <View
              key={index}
              style={{marginTop: 5, flexDirection: 'row', padding: 10}}>
              <Icon
                name={arr.icon}
                size={25}
                color="white"
                style={{marginRight: 10}}
              />
              <Text style={{color: 'white', fontSize: 14}}>{arr.title}</Text>
            </View>
            <View style={{marginTop: 16, padding: 10}}>
 <Icon3 name="arrow-right" size={20}  color={'#575555'} />
            </View>
          </View>
        ))}
         <View>
            <View style={{color:"gray",borderWidth:3,borderRadius:6,borderColor:"#2d2d2d"}}></View>
        </View>
        <View style={{marginBottom:70,justifyContent:"space-around",padding:5}}>
            <Text style={Styles.text}>Login</Text>
            <Text style={{color:"#6BB0F5",padding:10}}>Add account</Text>
            <Pressable onPress={()=>auth().signOut()}>

            <Text style={{color:"red",padding:10}}>Log out</Text>
            </Pressable>
            <Text style={{color:"red",padding:10}}>Log out of all accounts</Text>

        </View>
    </View>
      </ScrollView>
  );
}

export default ProfileSetting;

const Styles = StyleSheet.create({
  text: {
    color: 'gray',
    fontWeight:700
  },
});
