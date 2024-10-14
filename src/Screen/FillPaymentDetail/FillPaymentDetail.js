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
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import images from '../../Image';
import moment from 'moment';
import auth from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../GlobalConstants/COLORS';
import {RNCamera} from 'react-native-camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import _ from 'lodash';
import {getFileExtension, openCamera, uploadDoc} from '../../GlobalUtils/utils';

const TODAY_DATE = moment().format('YYYY-MM-DD');

const FillPaymentDetail = ({navigation, route}) => {
  const [checkNumber, setcheckNumber] = useState('');
  const [fullName, setfullName] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const [bankName, setbankName] = useState('');
  const [ifscCode, setifscCode] = useState('');
  const [imagePath, setimagePath] = useState('Upload');
  const [selectedImage, setselectedImage] = useState('');
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  console.log('RouteParams', route.params);
  let paramsData = route.params;

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    setUserData(userData);
  };

  const onChangeTextValue = (text, type) => {
    //setAmountColl(text);
    if (type == 'checkNumber') {
      setcheckNumber(text);
    }
    if (type == 'fullName') {
      //setfullName(text);
      if (text) {
        let checkName = /^[A-Za-z\s]+$/.test(text);
        if (checkName) {
          setfullName(text);
        } else {
          Alert.alert(
            'Oops',
            'Please enter a valid name.',
            [{text: 'OK', onPress: async () => {}}],
            {cancelable: false},
          );
        }
      } else {
        setfullName(text);
      }
    }
    if (type == 'accountNumber') {
      setaccountNumber(text);
    }
    if (type == 'bankName') {
      setbankName(text);
    }
    if (type == 'ifscCode') {
      setifscCode(text);
    }
  };

  const rowItemView = (
    lbl,
    value = 0,
    enableFlag,
    type,
    keyboardType = 'default',
    maxLength,
  ) => {
    return (
      <View style={styles.Supply}>
        <Text style={styles.fromtext}>{lbl}</Text>
        {enableFlag ? (
          <TextInput
            placeholder={lbl}
            style={styles.Supplybox}
            value={value} //{type == 2 ? unsoldVal : returnVal}
            keyboardType={keyboardType}
            onChangeText={text => onChangeTextValue(text, type)}
            maxLength={maxLength}
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

  const _openCamera = async (setState, item) => {
    const result = await launchCamera();

    console.log('result', result?.assets[0]?.fileName);
    setimagePath(
      result?.assets[0]?.fileName
        ? result?.assets[0]?.fileName
        : result[0]?.uri,
    );
    setselectedImage(result);
  };

  const _openGallery = async () => {
    try {
      const res = await uploadDoc();
      let getFIleType = getFileExtension(res?.name);

      if (
        getFIleType == 'png' ||
        getFIleType == 'PNG' ||
        getFIleType == 'jpg' ||
        getFIleType == 'JPG' ||
        getFIleType == 'jpeg' ||
        getFIleType == 'JPEG'
      ) {
        setimagePath(res.name);
        setselectedImage(res);
        console.log('result', res);
        //alert(res?.uri);
        // props.setselectedDoc(res?.uri);
        // props.setselectedDocName(res?.name);
      } else {
        alert('Only jpg or png file are allowed.');
      }
    } catch (error) {}
  };

  const submitAction = async () => {
    if (checkNumber && bankName && fullName && selectedImage) {
      setLoading(true);
      const token = await AsyncStorage.getItem('InExToken');
      const formData = new FormData();

      let userId = userData.id;
      let executiveId;

      if (
        userData?.role == 'Parcel Vendor' ||
        userData?.role == 'Depot Salesman'
      ) {
        userId = userData.id;
        executiveId = 0;
      } else {
        userId = paramsData.depotItem?.user_id;
        executiveId = await AsyncStorage.getItem('InExUserId');
      }

      formData.append('user_id', userId);
      formData.append('executive_id', executiveId);
      formData.append('payment_mode', 'cheque');
      formData.append('amount_collected', route.params.amount);
      formData.append('outstanding', route.params.outstandingData.outstanding);
      formData.append('updated_by_last_user_id', userId);
      formData.append('cheque_number', checkNumber);
      formData.append('cheque_issue_date', TODAY_DATE);
      formData.append('cheque_account_number', accountNumber);
      formData.append('cheque_micr_code', 'cheque_micr_code');
      formData.append('name', fullName);
      formData.append('ifsc', ifscCode);
      formData.append('bill_till_date', TODAY_DATE);
      formData.append('ship_to_code', paramsData.depotItem.ship_to_code);
      formData.append('bill_to_code', paramsData.outstandingData.bill_to_code);
      formData.append('role', userData?.role);
      formData.append('cheque_bank_name', bankName);

      if (Platform.OS == 'ios') {
        formData.append('file', {
          uri: selectedImage.uri,
          name: selectedImage.name,
          type: selectedImage.type,
        });
      } else {
        console.log('apiRespData', selectedImage);
        if (selectedImage?.assets) {
          formData.append('file', {
            uri: selectedImage.assets[0].uri,
            name: selectedImage.assets[0].fileName,
            type: selectedImage.assets[0].type,
          });
        } else {
          formData.append('file', {
            uri: selectedImage.uri,
            name: selectedImage.name,
            type: selectedImage.type,
          });
        }
      }

      console.log('FormData', formData);

      const response = await auth.paymentTransanction(formData, token);
      setLoading(false);

      if (response?.data?.code == 201 || response?.data?.code == 200) {
        //alert('Payment added successfully.');
        Alert.alert(
          'Success',
          'Payment added successfully.',
          [
            {
              text: 'OK',
              onPress: async () => {
                navigation.navigate('CollectionList');
              },
            },
          ],
          {cancelable: false},
        );
        //navigation.navigate('Home');
      } else if (response?.data?.message) {
        if (
          response?.data?.message == 'The operation/error failed/occurred. '
        ) {
          Alert.alert(
            'Oops',
            'This cheque number is already paid.',
            [{text: 'OK', onPress: async () => {}}],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            'Oops',
            response?.data?.message,
            [{text: 'OK', onPress: async () => {}}],
            {cancelable: false},
          );
        }
      } else {
        alert(response?.problem);
        Alert.alert(
          'Oops',
          response?.problem,
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
      }
    } else {
      alert('Please add cheque details.');
      Alert.alert(
        'Oops',
        'Please add cheque details.',
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    }
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {rowItemView('Amount Paid', route.params.amount, false, 'amout')}
          {rowItemView('Full Name', fullName, true, 'fullName')}
          {rowItemView(
            'Cheque Number',
            checkNumber,
            true,
            'checkNumber',
            'numeric',
            6,
          )}
          {/* {rowItemView(
            'Account Number',
            accountNumber,
            true,
            'accountNumber',
            'numeric',
          )} */}
          {rowItemView('Bank Name', bankName, true, 'bankName')}
          {/* {rowItemView('IFSC', ifscCode, true, 'ifscCode')} */}

          <Text style={[styles.fromtext, {marginTop: 10}]}>Upload Cheque</Text>

          <View style={styles.rowContainer}>
            <View style={styles.uploadDocContainer}>
              <View style={styles.uploadDocPlaceholderContainer}>
                <Text style={styles.uploadScanText}>{imagePath}</Text>
              </View>

              <View style={styles.uploadDocButtonContainer}>
                <TouchableOpacity
                  onPress={_openGallery}
                  style={styles.openGalleryButtonConatiner}>
                  <View style={styles.uploadIconContainer}>
                    <Image
                      style={styles.uploadIconStyle}
                      source={images.cloudUpload}
                    />
                  </View>
                  <View style={styles.uploadTextContainer}>
                    <Text style={styles.uploadDocText}>Upload</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.ortextContainerStyle}>
                  <Text style={styles.orText}>Or</Text>
                </View>
                <TouchableOpacity
                  onPress={_openCamera}
                  style={styles.openCameraButtonConatiner}>
                  <View style={styles.cameraContainer}>
                    <Image
                      source={images.cameraIcon}
                      style={styles.cameraIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <Image
              source={{
                uri:
                  Platform.OS == 'android'
                    ? selectedImage?.assets
                      ? selectedImage.assets[0].uri
                      : selectedImage.uri
                    : selectedImage.uri,
                //Platform.OS=="ios"?selectedImage.uri:Platform.OS=="android"?selectedImage?.assets?selectedImage.assets[0].uri:selectedImage.uri
              }}
              resizeMode="contain"
              style={{height: 50, width: '100%'}}
            />
          </View>
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            {loading ? (
              <TouchableOpacity disabled style={{width: '70%'}}>
                <View style={[styles.canclebtn]}>
                  <ActivityIndicator size="small" color={'red'} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{width: '70%'}}
                onPress={() => {
                  submitAction();
                }}>
                <View style={[styles.canclebtn]}>
                  <Text style={styles.canclebtntext}>SUBMIT</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {/* <View style={styles.buttongroup}>
        <View>
          <TouchableOpacity
            disabled={false}
            onPress={() => {
              submitAction();
            }}>
            <View style={[styles.canclebtn, {opacity: true ? 1 : 0.3}]}>
              <Text style={styles.canclebtntext}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </View> */}
    </>
  );
};

export default FillPaymentDetail;
