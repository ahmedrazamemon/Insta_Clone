import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import ImageComponent from '../Images';

function ExploreScreen({route, navigation}) {
  const data = ({caption, comment, imgUrl, UserName, email, profilepicture,likes} =route.params);
  const [currentComments, setCurrentComments] = useState([]);
const [modalVisible, setModalVisible] = useState(false);


  const openComments = (comments) => {
    setCurrentComments(comments);
    setModalVisible(true);
  };
  
  // console.log("data====",data)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 name="arrow-left" size={28} color={'white'} />
        </TouchableOpacity>
        <Text style={{fontWeight: 500, color: 'white', fontSize: 22,marginLeft:40}}>
          Explore
        </Text>
      </View>
      <View style={{marginTop: 10}}></View>
      <Header data={data} />
      <PostImage data={data}  />
      <Footer data={data}  openComments={openComments}/>
      <Caption data={data}/>
      
    </View>
  );
}

const Header = ({data}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
        marginBottom: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ImageComponent
          source={{uri: data.profilepicture}}
          style={styles.image}
        />
        <Text style={styles.name}>{data.UserName}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
}}>
        <Pressable style={styles.button}>
          <Text style={{color: 'white', fontWeight: 500}}>Follow</Text>
        </Pressable>
        <Pressable>
          <Icon1 name="dots-three-vertical" size={18} color={'white'} />
        </Pressable>
      </View>
    </View>
  );
};

const PostImage = ({data,}) => {
  return (
    <View style={{width: '100%', height: 250}}>
      <ImageComponent source={{uri: data.imgUrl}} style={styles.img} />
    </View>
  );
};

const Footer = ({data,openComments}) => {
  const iconNames = [
    'heart',
    'heart-o',
    'message-circle',
    'send-o',
    'bookmark-o',
  ];
  return (
    <View style={styles.iconcontainer}>
      <View style={styles.leftIcons}>
        <TouchableOpacity>
          <Icon
          
            name={iconNames[1]}
            size={27}
            color={'white'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openComments()}
          style={styles.commenticon}>
          <Icon4 name={iconNames[2]} size={27} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareicon}>
          <Icon name={iconNames[3]} size={27} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.iconcontainer}>
        <TouchableOpacity style={styles.rightIcon}>
          <Icon name={iconNames[4]} size={27} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Caption =({data})=>{
  return(
    <View>
      <Text style={{color:"white",marginLeft:5,fontSize:18}}>{data.likes.length} likes</Text>
      

    </View>
  )
}

export default ExploreScreen;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
    backgroundColor: 'black',
  },
  imageContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
iconcontainer:{
    borderWidth:2,
    flexDirection: 'row',
    justifyContent: 'space-between',

},
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginLeft: 11,
    borderWidth: 1.5,
    borderColor: '#FF8501',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 600,
  },
  button: {
    // borderWidth:1,
    // borderColor:"white",
    marginRight:10,
    backgroundColor: '#2d2d2d',
    minHeight: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 90,
  },
  loader: {
    backgroundColor: '#6AA0F5',
    minHeight: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth:1
  },
  img: {resizeMode: 'contain', height: '100%', width: '100%'},
  commenticon:{
    // transform: rotate("20deg") 
    transform: [{ rotate: '270deg' }]
  },
  shareicon:{
    transform: [{ rotate: '20deg' }],
  },
  leftIcons: {
    padding:2,
    width:120,
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  rightIcon: {
    padding:2,
    flexDirection: 'row',
    alignItems: 'center',
  },
 
});
