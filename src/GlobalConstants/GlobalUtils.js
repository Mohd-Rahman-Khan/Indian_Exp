import React from 'react';
import {Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NavigationService from '../Navigation/RootNavigator/NavigationService';

export const apiFailureAlert = apiName => {
    const navigation = useNavigation();
  console.log('Failure Api Name =======> ', apiName);
  return Alert.alert(
    'oops!',
    'something went wrong, please try later!',
    [
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem('InExToken');
          await AsyncStorage.removeItem('InExUserId');
          await AsyncStorage.removeItem('InExUserDetails');
          NavigationService.reset(
            navigation,
            'Login'
          )
        },
      },
    ],
    {cancelable: false},
  );
};
