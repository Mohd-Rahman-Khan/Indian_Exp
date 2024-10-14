import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import COLORS from '../GlobalConstants/COLORS';

export const ButtonView = props => {
  const {
    title,
    isPrimary = true,
    btnColor = COLORS.redPrimary,
    secondaryColor = COLORS.white,
    btnStyle,
    onBtnPress = () => {},
    textStyle,
    disabled = false,
  } = props;
  // console.log('mohit', props);
  return (
    <TouchableOpacity
      style={[
        {flex: 1, height: 40, marginVertical: 10},
        btnStyle,
      ]}
      onPress={onBtnPress}
      disabled={disabled}
      >
      <View
        style={{
          flex: 1,
          backgroundColor: isPrimary ? btnColor : secondaryColor,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: isPrimary ? 0 : 1,
          borderColor: isPrimary ? COLORS.white : COLORS.redPrimary,
          opacity: disabled ? 0.4: 1,
        }}>
        <Text
          style={[
            {fontSize: 12, fontWeight: '600', color: 'white'},
            textStyle,
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
