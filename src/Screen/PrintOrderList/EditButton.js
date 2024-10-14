import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import COLORS from '../../GlobalConstants/COLORS';
import images from '../../Image';

export default function EditButton({item, onPress}) {
  return (
    <TouchableOpacity
      // onPress={() => {
      //   editIconClick(item, !item?.editable);
      //   seteditOrderDetail(item);
      // }}
      onPress={onPress}
      style={{
        height: 30,
        width: 30,
        borderWidth: 1,
        borderColor: COLORS.lightGreyBorder,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }}>
      {item?.editable ? (
        <Image
          source={images.closeIcon}
          style={{height: 12, width: 12, tintColor: 'red'}}
        />
      ) : (
        <Image source={images.editIcon} style={{height: 15, width: 15}} />
      )}
    </TouchableOpacity>
  );
}
