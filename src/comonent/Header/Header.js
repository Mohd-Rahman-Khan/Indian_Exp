import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import images from '../../Image';

export default function Header({onPress, title}) {
  return (
    <View
      style={{
        //marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        //paddingHorizontal: 20,
        height: 60,
        //justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: '15%',
          //alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <Image
          source={images.rightAngel}
          style={{
            height: 35,
            width: 35,
            // tintColor: '#0076f5',
            transform: [{rotate: '180deg'}],
          }}
        />
      </TouchableOpacity>
      <View style={{width: '95%'}}>
        <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
          {title}
        </Text>
      </View>
    </View>
  );
}
