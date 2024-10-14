import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

const Card = ({image, text, handleCardClick, fullWidth = false}) => {
  return (
    <TouchableOpacity
      onPress={() => handleCardClick()}
      style={styles.boxdesign}>
      <Image
        source={image}
        // style={{height: fullWidth ? 28 : 32, width: fullWidth ? 36 : 32}}
        style={{height: 32, width: 32}}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.unsold}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Card;
