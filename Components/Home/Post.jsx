import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function Posts({post}) {
  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <FooterIcons />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post}/>
        <Comments post={post}/>
      </View>
    </View>
  );
}

const PostHeader = ({post}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
        <Image source={{uri: post.profilepicture}} style={styles.image} />
        <Text style={styles.name}>{post.username}</Text>
      </View>
      <View>
        <Text style={{color: 'white', fontWeight: 900}}>...</Text>
      </View>
    </View>
  );
};

const PostImage = ({post}) => {
  return (
    <View style={{width: '100%', height: 250, }}>
      <Image
        source={{uri: post.imgurl}}
        style={{resizeMode: 'cover', height: '100%', width: '100%'}}
      />
    </View>
  );
};

const FooterIcons = () => {
  const iconNames = ['heart', 'comment-o', 'share', 'save'];
  return (
    <View style={styles.container}>
      <View style={styles.leftIcons}>
        {iconNames.slice(0, 3).map((iconName, index) => (
          //   <View >
          <TouchableOpacity key={index} style={styles.iconContainer}>
            <Icon name={iconName} size={30} color="white" />
          </TouchableOpacity>
          //   </View>
        ))}
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.rightIcon}>
          <Icon name={iconNames[3]} size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Likes = ({post}) => {
  return (
    <View style={{flexDirection: 'column', marginTop: 4}}>
      <Text style={{color: 'white', fontWeight: 600}}>
        {post.likes.toLocaleString('en')} Likes
      </Text>
    </View>
  );
};

const Caption = ({post}) => {
  return (
    <View>
      <Text style={{color: 'white'}}>
        <Text style={{fontWeight:700,}}>{post.username} </Text>
        <Text >{post.caption}</Text>
      </Text>
    </View>
  );
};
const CommentsSection=({post})=>{
    return(
        <View>
            {
               !!post.comments.length&&(
                <Text style={{color:"gray"}}>
                View {post.comments.length>1?'all':''} {post.comments.length} {""}
                {post.comments.length>1?"comments":"comment"}</Text>
               )
            }
            </View>
            
    )
}

const Comments=({post})=>{
    return(
        <View>
        {post.comments.map((comment,index)=>{
        return(
            <View key={index}>
                <Text style={{color:"white"}}>
                    <Text style={{fontWeight:600}}>{comment.user} </Text>
                    {comment.comment}
                </Text>
            </View>
        )
        })}
        </View>
    )
}
export default Posts;

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginLeft: 11,
    borderWidth: 1.5,
    borderColor: '#FF8501',
  },
  name: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 600,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 20,
  },
  leftIcons: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
});
