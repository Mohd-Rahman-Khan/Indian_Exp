import React, {useState, useRef, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import images from '../../Image';
import styles from './styles';
import auth from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../../Helper/AppIndicator';
import {
  getFCMToken,
  requestUserPermission,
} from '../../PushNotification/NotificationConfig';
import DeviceInfo from 'react-native-device-info';

// import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef();

  useEffect(() => {
    if (Platform.OS == 'android') {
      requestNotificationPermission();
    }
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const notfPerm = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('NotfErrr_____', notfPerm);
    } catch (err) {
      console.log('NotfErrr_____', err);
    }
  };

  useEffect(() => {
    if (requestUserPermission()) {
      getFCMToken(token => {
        setDeviceToken(token);
        console.log('test >> ', token);
      });
    } else console.log('Not Authorization status:', authStatus);
  }, []);

  const authUser = async (loginId, pass) => {
    const platform = 'mobile';
    if (loginId && pass && platform) {
      setIsLoading(true);
      const deviceId = await DeviceInfo.getUniqueId();
      const deviceName = await DeviceInfo.getDeviceName();
      //console.log('set:', deviceName);

      const response = await auth.login(
        loginId,
        pass,
        platform,
        deviceToken,
        deviceId,
        deviceName,
      );
      console.log('response', response);
      if (response?.status != 200) {
        if (response?.status == 406) {
          setIsLoading(false);
          Alert.alert(
            'Login Error!',
            response?.data?.error, // <- this part is optional, you can pass an empty string
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        } else {
          setIsLoading(false);
          Alert.alert(
            'Login Error!',
            'Incorrect Login Id or Password', // <- this part is optional, you can pass an empty string
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      } else {
        console.log('Vishallll', response.data?.data);
        let result = response.data;
        let userDetails = response?.data?.data;
        userDetails.loginId = loginId;
        console.log('userDetails: ', userDetails);
        await AsyncStorage.setItem(
          'InExToken',
          response?.headers['tiedn-ie-api-authorization'],
        );
        await AsyncStorage.setItem(
          'InExUserId',
          JSON.stringify(response?.data?.data?.id),
        );
        await AsyncStorage.setItem(
          'InExUserDetails',
          JSON.stringify(userDetails),
        );
        setIsLoading(false);
        navigation.replace('Home', {
          userData: {
            role: result?.role,
          },
        });
      }
    } else {
      alert('Please provide Login Id and Password.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <AppLoader
          visible = {isLoading}
        /> */}
      <View style={styles.logo}>
        <Image source={images.logo} style={styles.logodesign} />
      </View>
      <View style={styles.continue}>
        <Text style={styles.continuetext}>
          To continue, log in to TIEDN App.
        </Text>
      </View>
      <View>
        <Text style={styles.loginid}>Login ID</Text>
      </View>
      <View>
        <TextInput
          placeholder="Enter Login ID"
          value={loginId}
          style={styles.TextInput}
          onChangeText={text => setLoginId(text)}
          onSubmitEditing={() => passwordRef.current?.focus()}
          returnKeyType={'next'}
        />
      </View>
      <View style={styles.passwordstyle}>
        <Text style={styles.password}>Password</Text>
      </View>
      <View>
        <TextInput
          ref={passwordRef}
          placeholder="Enter Password"
          value={password}
          style={styles.TextInput}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View>
        <TouchableOpacity
          disabled={isLoading}
          style={[styles.loginBtn, {opacity: isLoading ? 0.6 : 1}]}
          onPress={() => authUser(loginId.trim(), password.trim())}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.btnText}>Log in</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            marginBottom: '5%',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'grey',
              textAlign: 'center',
            }}>
            By logging in, you agree to our{' '}
            <Text
              onPress={() => navigation.navigate('TermsOfService')}
              style={{
                fontSize: 16,
                color: '#ab64d1',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              onPress={() => navigation.navigate('PrivacyPolicy')}
              style={{
                fontSize: 16,
                color: 'blue',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
                alignSelf: 'flex-end',
              }}>
              Privacy Policy
            </Text>
            {'.'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '32%',
            }}>
            <Text
              onPress={() => navigation.navigate('AboutUs')}
              style={{
                fontSize: 14,
                color: 'grey',
                fontWeight: '600',
                textDecorationLine: 'underline',
                alignSelf: 'flex-end',
              }}>
              About Us
            </Text>
            <Text
              onPress={() => navigation.navigate('CancellationPolicy')}
              style={{
                fontSize: 14,
                color: 'grey',
                fontWeight: '600',
                textDecorationLine: 'underline',
                alignSelf: 'flex-end',
              }}>
              Cancellation Policy
            </Text>
            <Text
              onPress={() => {
                console.log('tre');
                navigation.navigate('ContactUs');
                console.log('tre');
              }}
              style={{
                fontSize: 14,
                color: 'grey',
                fontWeight: '600',
                textDecorationLine: 'underline',
                alignSelf: 'flex-end',
              }}>
              Contact Us
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
