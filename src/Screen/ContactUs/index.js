import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const ContactUs = ({navigation, route}) => {
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
          Questions/ Grievances Redressals
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: 'black',
            paddingBottom: 10,
          }}>
          Any complaints or feedback shall be informed to us through email. You
          may connect with us on {}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: 'blue',
              textDecorationLine: 'underline',
            }}>
            feedback@indianexpress.com
          </Text>
        </Text>
        <Text style={styles.textStyle}>- full name</Text>
        <Text style={styles.textStyle}>- postal residential address</Text>
        <Text style={styles.textStyle}>- email address</Text>
        <Text style={styles.textStyle}>- cell number</Text>
        <Text style={styles.textStyle}>
          - feedback or explanation in 500 words
        </Text>
        <Text style={[styles.textStyle,{paddingTop: 20}]}>In the alternate, please write to the following address with all the above:</Text>
        <Text style={[styles.textStyle,{paddingTop: 5}]}>Feedback</Text>
        <Text style={styles.textStyle}>IE Online Media Services Private Ltd</Text>
        <Text style={styles.textStyle}>Express Building, Block B1/B</Text>
        <Text style={styles.textStyle}>Sector 10, Noida 201301, UP.</Text>
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

export default ContactUs;
