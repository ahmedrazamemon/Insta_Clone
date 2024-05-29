import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Users} from '../../data/Users';
function Stories() {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Users.map((story,index) => (
          <View key={index} style={{alignItems:"center"}}>
            <Image source={{uri: story.image}} style={style.image} />
            <Text style={{color:"white",textAlign:"center",marginBottom:9,marginLeft:10}}>
                {story.username.length>6?story.username.slice(0,5).toLowerCase()+'..'
                :story.username.toLowerCase()
            }</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default Stories;

const style = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 11,
    borderWidth: 3,
    borderColor: '#FF8501',
  },
});
