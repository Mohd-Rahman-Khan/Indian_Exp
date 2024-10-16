import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  LayoutAnimation,
  Pressable,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import SelectBox from 'react-native-multi-selectbox';
import {reject, xorBy} from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../Image';
import moment from 'moment';
import auth from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../GlobalConstants/COLORS';
import {RNCamera} from 'react-native-camera';

import _ from 'lodash';
import QrCodeScanner from '../../comonent/QrCodeScanner';
import QrTable from '../Collection/QrTable/QrTable';
import AppIndicator from '../../Helper/AppIndicator';
const {width, height} = Dimensions.get('window');

const ScanCoupen = ({navigation, route}) => {
  const [showScanner, setshowScanner] = useState(false);
  const [userData, setUserData] = useState();
  const [scanQrIds, setscanQrIds] = useState([]);
  const [couponIsVerifying, setcouponIsVerifying] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [invalidScanQrIds, setinvalidScanQrIds] = useState([]);
  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS == 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'India Express App Camera Permission',
          message:
            'India Express App needs access to your camera ' +
            'so you can scan coupons and take pictures',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('PermStatus', granted);
      if (granted == 'granted') {
        setshowScanner(true);
      } else {
        Alert.alert(
          'Scaner Alert',
          'Please allow the camera permission for scaning.',
          [
            {
              text: 'OK',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          ],
        );
      }
    }
  };

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    setUserData(userData);
  };

  const paymentTrhoughQrCodes = async () => {
    const TODAY_DATE = moment().format('YYYY-MM-DD');
    const token = await AsyncStorage.getItem('InExToken');
    const formData = new FormData();

    if (scanQrIds.length > 0) {
      setisLoading(true);
      let validScannedQrIds = scanQrIds.map(item => {
        let formatData = item.split('$');
        if (formatData?.length == 6) {
          return formatData[0];
        } else {
          return formatData[1];
        }
      });

      let inValidScannedQrIds = invalidScanQrIds.map(item => {
        let formatData = item.split('$');
        return formatData[0];
      });

      let totalIds = [...validScannedQrIds, ...inValidScannedQrIds];

      let userId = userData.id;
      let executiveId;

      if (
        userData?.role == 'Parcel Vendor' ||
        userData?.role == 'Depot Salesman'
      ) {
        userId = userData.id;
        executiveId = 0;
      } else {
        userId = route.params.depotItem?.user_id;
        executiveId = await AsyncStorage.getItem('InExUserId');
      }

      formData.append('user_id', userId);
      formData.append('executive_id', executiveId);
      formData.append('role', userData.role);
      formData.append('payment_mode', 'coupon');
      formData.append('amount_collected', 0);
      formData.append(
        'outstanding',
        route.params.outstandingData?.outstanding ?? 0,
      );
      formData.append('bill_till_date', TODAY_DATE);
      formData.append('ship_to_code', route.params.depotItem.ship_to_code);
      formData.append(
        'bill_to_code',
        route.params.outstandingData?.bill_to_code,
      );
      formData.append('coupon_id', totalIds.join(','));
      console.log('apiRespData', formData);
      const response = await auth.paymentTransanction(formData, token);
      setisLoading(false);

      console.log('apiRespData', formData);

      if (response?.data?.code == 201 || response?.data?.code == 200) {
        Alert.alert(
          'Success',
          'Payment added successfully.',
          [
            {
              text: 'OK',
              onPress: async () => {
                setTimeout(() => {
                  navigation.navigate('CollectionList');
                }, 1000);
              },
            },
          ],
          {cancelable: false},
        );
        setisLoading(false);
        //navigation.navigate('Home');
      } else if (response?.data?.message) {
        Alert.alert(
          'Oops',
          response?.data?.message,
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Oops',
          response?.problem,
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
      }
    } else {
      setisLoading(false);
      Alert.alert(
        'Oops',
        'Please scan the coupons for payment.',
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    }
  };

  const rowItemView = (lbl, value = 0, enableFlag, type) => {
    return (
      <View style={styles.Supply}>
        <Text style={styles.fromtext}>{lbl}</Text>
        {enableFlag ? (
          <TextInput
            placeholder={'Enter amount..'}
            style={styles.Supplybox}
            value={value} //{type == 2 ? unsoldVal : returnVal}
            keyboardType={'numeric' || 'number-pad'}
            onChangeText={text => onChangeTextValue(text, type)}
          />
        ) : (
          <Text
            style={[
              styles.Supplybox,
              {backgroundColor: 'lightgrey', paddingTop: 12, color: 'black'},
            ]}>
            {value}
          </Text>
        )}
      </View>
    );
  };

  const qrScanerHandler = qrData => {
    // let isThisQrScaned = scanQrIds.find(itemData => itemData == qrData);
    // let isThisInvalidQrScaned = invalidScanQrIds.find(
    //   itemData => itemData == qrData,
    // );

    // if (isThisQrScaned || isThisInvalidQrScaned) {
    //   setshowScanner(false);

    //   Alert.alert('Coupen Alert', 'This coupon already scanned.', [
    //     {text: 'OK', onPress: () => {}},
    //   ]);
    // } else {
    //   setshowScanner(false);
    //   checkCouponDetail(qrData);
    // }

    setshowScanner(false);
    checkCouponDetail(qrData);
  };

  const checkCouponDetail = async qrData => {
    setcouponIsVerifying(true);
    const token = await AsyncStorage.getItem('InExToken');
    //const userId = await AsyncStorage.getItem('InExUserId');

    let userId = userData.id;

    if (
      userData?.role == 'Parcel Vendor' ||
      userData?.role == 'Depot Salesman'
    ) {
      userId = userData.id;
    } else {
      userId = route.params.depotItem?.user_id;
    }

    let apiData = {
      id: qrData,
      user_id: userId,
    };

    const response = await auth.fetchQrData(apiData, token);
    console.log('responseQr', response);
    setshowScanner(false);
    setcouponIsVerifying(false);
    // if (response?.status != 200 && response?.status != 404) {
    //   alert(response?.problem);
    // } else if (response?.status == 404) {
    //   alert(response.data?.message);
    // } else {
    //   if (response?.data?.code == 200) {
    //     setscanQrIds([...scanQrIds, qrData]);
    //     Alert.alert('Coupen Alert', 'Coupen scanned successfully.', [
    //       {text: 'OK', onPress: () => {}},
    //     ]);
    //   } else {
    //     if (response.data?.message == 'Already Paid Coupon') {
    //       Alert.alert('Coupen Alert', response?.data?.message, [
    //         {text: 'OK', onPress: () => {}},
    //       ]);
    //     } else {
    //       setinvalidScanQrIds([...invalidScanQrIds, qrData]);
    //     }
    //   }
    // }

    if (response?.data?.code) {
      if (response?.data?.code == 200 || response?.data?.code == 201) {
        setscanQrIds([...scanQrIds, qrData]);
        Alert.alert('Coupen Alert', 'Coupen scanned successfully.', [
          {text: 'OK', onPress: () => {}},
        ]);
      } else {
        if (response.data?.message == 'Already Paid Coupon') {
          Alert.alert('Coupen Alert', response?.data?.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        } else {
          Alert.alert('Coupen Alert', response?.data?.message, [
            {text: 'OK', onPress: () => {}},
          ]);
          setinvalidScanQrIds([...invalidScanQrIds, qrData]);
        }
      }
    } else {
      Alert.alert('Coupen Alert', response?.problem, [
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  const deleteCoupon = async (couponData, type) => {
    setisLoading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.deleteCoupon(couponData[0], token, userId);
    console.log('responseQr', response);
    setisLoading(false);
    if (response?.status != 200 && response?.status != 404) {
      Alert.alert('Coupen Alert', 'Somethig went wrong.', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else if (response?.status == 404) {
      alert(response.data?.message);
    } else {
      if (response?.data?.code == 200) {
        if (type == '1') {
          let filterId = scanQrIds.filter(itemData => {
            let filteritemData = itemData.split('$');
            if (filteritemData[0] != couponData[0]) {
              return itemData;
            }
          });

          setscanQrIds(filterId);
          Alert.alert('Coupen Alert', response?.data?.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        }
        if (type == 2) {
          let filterId = invalidScanQrIds.filter(itemData => {
            let filteritemData = itemData.split('$');
            if (filteritemData[0] != couponData[0]) {
              return itemData;
            }
          });

          setinvalidScanQrIds(filterId);
          Alert.alert('Coupen Alert', response?.data?.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        }
      } else {
        Alert.alert('Coupen Alert', response?.data?.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* {rowItemView('Amount Paid', route.params.amount, false, 'amout')} */}
        <AppIndicator visible={isLoading} />
        {couponIsVerifying ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <ActivityIndicator size={'large'} color={'red'} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              Your coupon is verifying. Please wait...
            </Text>
          </View>
        ) : null}
        {scanQrIds.length > 0 ? (
          <QrTable
            onCancelButtonCLick={renderData => {
              deleteCoupon(renderData, '1');
            }}
            scanQrIds={scanQrIds}
            headingTitle="Valid"
          />
        ) : null}

        {/* {invalidScanQrIds.length > 0 ? (
          <QrTable
            onCancelButtonCLick={renderData => {
              deleteCoupon(renderData, '2');
            }}
            scanQrIds={invalidScanQrIds}
            headingTitle="InValid"
          />
        ) : null} */}
      </View>

      {showScanner ? (
        <QrCodeScanner
          showModal={showScanner}
          onClose={() => {
            setshowScanner(false);
          }}
          qrScanningData={qrData => {
            qrScanerHandler(qrData);
          }}
        />
      ) : null}

      <View style={styles.buttongroup}>
        <View>
          <TouchableOpacity
            disabled={false}
            onPress={() => {
              if (couponIsVerifying) {
                Alert.alert(
                  'Coupen Alert',
                  'Your coupon is verifying. Please wait...',
                  [{text: 'OK', onPress: () => {}}],
                );
              } else {
                requestCameraPermission();
              }

              //setshowScanner(true);
              // qrScanerHandler(
              //   '674206018$97$Oct-24$4026200 - Thane Station Depot-1$Thane Station Depot$PRAVIN',
              // );
            }}>
            <View style={[styles.canclebtn, {opacity: true ? 1 : 0.3}]}>
              <Text style={styles.canclebtntext}>Scan Coupon</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            disabled={false}
            onPress={() => {
              paymentTrhoughQrCodes();
            }}>
            <View style={[styles.canclebtn, {opacity: true ? 1 : 0.3}]}>
              <Text style={styles.canclebtntext}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ScanCoupen;
