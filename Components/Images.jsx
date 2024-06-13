import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const ImageComponent = ({source, style}) => {
  return (
    <View style={styles.container}>
      <Image
        source={source}
        style={style}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },


});

export default ImageComponent;
