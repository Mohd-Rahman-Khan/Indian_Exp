import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const text1 = `TIEDN is an internal CRM app managed by the Indian Express Group. This app is used by the various internal users which involves Depot Salesman, Circulation Sales Executive, Circulation Collection Executive and their Managers. This app helps in operating daily distribution and circulation of Newspapers & Magazines under the flagship of Indian Express Group. Along with the distribution and circulation, app also enables the users to track daily return, unsold and collection at various depot levels. Users will be able to update their attendance using the same module. This data stored in the app will be used by internal employees for daily tracking and analysis purpose.`;

const AboutUs = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          borderRadius: 20,
          paddingHorizontal: '5%',
          paddingVertical: '2%',
        }}>
        <Text
          onPress={() => navigation.goBack()}
          style={{
            fontSize: 14,
            color: 'blue',
            fontWeight: '400',
            alignSelf: 'flex-end',
            textDecorationLine: 'underline',
          }}>
          Close
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: 'black',
            paddingVertical: 10,
          }}>
          About Us:
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
          {text1}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: 'black',
            paddingTop: 10,
          }}>{`Read more about the Indian Express Group here:`}</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: 'blue',
            textDecorationLine: 'underline',
          }}>
          http://expressgroup.indianexpress.com
        </Text>
        <Text
          onPress={() => navigation.goBack()}
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: 'blue',
            textDecorationLine: 'underline',
            paddingTop: '55%',
            alignSelf: 'center',
          }}>
          To Login Page
        </Text>
      </View>
    </View>
  );
};

export default AboutUs;
