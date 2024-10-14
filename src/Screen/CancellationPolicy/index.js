import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const CancellationPolicy = ({navigation, route}) => {
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
          REFUND POLICY
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
          The payment(s) made by you on TIEDN APP towards the outstanding/
          collection for the supply of NewsPaper / Magazine is non-refundable.
          You do not have any right to claim for refund your payments in whole
          or any part. Although you may notify us of your reason for requesting
          for refund at any time by notifying our team at {''}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: 'blue',
              textDecorationLine: 'underline',
            }}>
            tiednmumbai@expressindia.com
          </Text>{' '}
          , however you will not receive a refund (except in the limited
          circumstances as we deem fit). We use third party payment gateway
          services for receiving payment from you and you agree to make payment
          using these third-party payment gateway.
        </Text>
        <Text
          onPress={() => navigation.goBack()}
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: 'blue',
            textDecorationLine: 'underline',
            paddingTop: '85%',
            alignSelf: 'center',
          }}>
          To Login Page
        </Text>
      </View>
    </View>
  );
};

export default CancellationPolicy;
