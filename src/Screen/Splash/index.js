import React, {useEffect} from 'react';
import {View, Image, Button, StatusBar} from 'react-native';
import styles from './styles';
import images from '../../Image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../Navigation/RootNavigator/NavigationService';
import {routers} from '../../Constant';
import AppNavigator from '../../Navigation/RootNavigator';

const Splash = ({navigation}) => {
  useEffect(() => {
    getCustomerDetails();
    // setTimeout(() => {
    //   getCustomerDetails();
    // }, 3000);
  }, []);

  const getCustomerDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const token = await AsyncStorage.getItem('InExToken');
    if (userData1 && token) {
      const checkIn = await AsyncStorage.getItem('InExCheckIn');
      const checkOut = await AsyncStorage.getItem('InExCheckOut');
      let obj = {};
      if (checkIn) {
        let data = JSON.parse(checkIn);
        obj = {...data};
      }
      if (checkOut) {
        let data = JSON.parse(checkOut);
        obj = {...obj, ...data};
      }
      NavigationService.reset(navigation, 'Home', obj);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={images.splashlogo} style={styles.logodesign} />
        </View>
        <View>
          <Image source={images.splashgroup} style={styles.group} />
        </View>
      </View>
    </>
  );
};

export default Splash;
