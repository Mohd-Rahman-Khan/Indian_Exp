import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import Header from '../../comonent/Header/Header';
import Card from '../../comonent/Card';
import images from '../../Image';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SelectionOfPrintOrder({route, navigation}) {
  const handleClick = async () => {
    const userData = await AsyncStorage.getItem('InExUserDetails');

    let parseUserData = JSON.parse(userData);
    if (
      parseUserData?.role == 'Circulation Executive' ||
      parseUserData?.role == 'Regional Manager'
    ) {
      navigation.navigate('PrintOrderDashboard');
    } else {
      navigation.navigate('PrintOrderList');
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title="Print Order"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <Card
          image={images.file}
          text="Print Order"
          fullWidth={true}
          handleCardClick={() => {
            handleClick();
          }}
        />

        <Card
          image={images.file}
          text="PO Sampling Copies"
          fullWidth={true}
          handleCardClick={() => {
            navigation.navigate('SupplyCopy');
          }}
        />
      </View>
    </View>
  );
}
