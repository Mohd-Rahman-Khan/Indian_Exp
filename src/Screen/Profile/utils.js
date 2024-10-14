import React from 'react';
import {View, Text, Image} from 'react-native';
import images from '../../Image';
import styles from './styles';

const dynamicView = (
    tagType,
    value,
    ...props
) => {
    return(
        <tagType
        {...props}
         >
            {value}
        </tagType>
    )
}

export const itemRowView = (itemLbl, itemValue) => {
    return (
      <View style={styles.itemRowView}>
        <Text style={styles.itemLbl}>{itemLbl}</Text>
        <Text style={styles.itemValue}>{itemValue}</Text>
      </View>
    )
  }