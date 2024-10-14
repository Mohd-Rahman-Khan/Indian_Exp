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
import {Picker} from '@react-native-picker/picker';
import COLORS from '../../GlobalConstants/COLORS';
import NavigationService from '../../Navigation/RootNavigator/NavigationService';
import RazorpayCheckout from 'react-native-razorpay';
import {razorPayApiKey, razorPayApiSecretKey} from '../../config';

import _ from 'lodash';
import CustomDropdown from '../../comonent/CustomDropdown';
import QrCodeScanner from '../../comonent/QrCodeScanner';
import QrTable from './QrTable/QrTable';
import {useIsFocused} from '@react-navigation/native';
import AppLoader from '../../Helper/AppIndicator';

const TODAY_DATE = moment().format('YYYY-MM-DD');
const TODAY_DATE_TO_SHOW = moment().format('DD-MM-YYYY, dddd');

const Collection = ({navigation}) => {
  // const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedDepotTeam, setSelectedDpotTeam] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [mode1, setMode1] = useState('date1');
  const [showScanner, setshowScanner] = useState(false);

  const [fromDate, setFromDate] = useState(TODAY_DATE);
  const [toDate, setToDate] = useState('');
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [fromCalendarDate, setFromCalendarDate] = useState(new Date());
  const [toCalendarDate, setToCalendarDate] = useState(new Date());
  const [publicationArr, setPublicationArr] = useState([]);
  const [publicationItem, setPublicationItem] = useState({});
  const [editionArr, setEditionArr] = useState([]);
  const [editionItem, setEditionItem] = useState({});
  const [paymentModeArr, setPaymentModeArr] = useState([
    {id: -1, name: 'Please select an option...'},
    {id: 1, name: 'online'},
    //{id: 2, name: 'cash'},
    {id: 3, name: 'Coupon'},
    {id: 4, name: 'Cheque'},
  ]);
  const [paymentModeItem, setPaymentModeItem] = useState(paymentModeArr[0]);
  const [depotArr, setDepotArr] = useState([]);
  const [depotItem, setDepotItem] = useState({});
  const [supplyVal, setSupplyVal] = useState(0);
  const [outstandingData, setOutstandingData] = useState({});
  const [npsAmount, setNPSAmount] = useState(0);
  const [amountColl, setAmountColl] = useState('');
  const [isActionEnable, setIsActionEnable] = useState(true);
  const [isPV, setIsPV] = useState(false);
  const [isDSM, setIsDSM] = useState(false);
  const [recallApi, setRecallApi] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [successPaymentData, setSuccessPaymentData] = useState({});
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [actionType, setActionType] = useState(0);
  const [depositAmt, setDepositAmt] = useState('0');
  const [userData, setUserData] = useState();
  const [showAmountField, setshowAmountField] = useState(true);
  const [showTransactionIdField, setshowTransactionIdField] = useState(false);
  const [transactionId, settransactionId] = useState('');
  const [scanQrIds, setscanQrIds] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [
    selectPaymentModeDropdownVisible,
    setSelectPaymentModeDropdownVisible,
  ] = useState(false);
  const [selectDepotDropdownVisible, setSelectDepotDropdownVisible] =
    useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    depotApi();
    getUserDetails();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setAmountColl('');
    }
  }, [isFocused]);

  useEffect(() => {
    depotApi();
    setPaymentId('');
  }, [recallApi]);

  useEffect(() => {
    if (isPaymentSuccess) {
      submitFinalAction(actionType);
    }
  }, [successPaymentData]);

  const getDepositAmount = async (selectedDepotId = null) => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = selectedDepotId
      ? selectedDepotId
      : await AsyncStorage.getItem('InExUserId');
    const response = await auth.securityDepositAmount(userId, token);
    console.log('getDepositAmount', response);
    setDepositAmt(response?.data?.data?.security_deposit_amount);
    console.log('response: ', response.data);
  };

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    // console.log('CollectionResp', userData);
    setUserData(userData);
    if (
      userData?.role != 'Parcel Vendor' &&
      userData?.role != 'Depot Salesman'
    ) {
      setPaymentModeArr(prev => [...prev, {id: 2, name: 'cash'}]);
    }
    if (userData?.role == 'Parcel Vendor') {
      setIsPV(true);
    }
    if (userData?.role == 'Depot Salesman') {
      setPaymentModeArr(prev => [...prev, {id: 2, name: 'cash'}]);
      setIsDSM(true);
    }
  };

  const apiFailureAlert = apiName => {
    console.log('Failure Api Name Abhi =======> ', apiName);
    Alert.alert(
      'oops!',
      'something went wrong, please try later!',
      [
        {
          text: 'OK',
          // onPress: async () => {
          //   await AsyncStorage.removeItem('InExToken');
          //   await AsyncStorage.removeItem('InExUserId');
          //   await AsyncStorage.removeItem('InExUserDetails');
          //   NavigationService.reset(navigation, 'Login');
          // },
        },
      ],
      {cancelable: false},
    );
  };

  const noDataApiAlert = (apiName, text) => {
    Alert.alert(
      'oops!',
      text,
      [
        {
          text: 'OK',
          onPress: () => {
            setAmountColl('');
            // setSubmitEnable(false);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const depotApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.depots(userId, token);
    console.log('CollectionResp', response);
    if (response?.status != 200 && response?.status != 404) {
      apiFailureAlert('depotApi');
    } else {
      setDepotArr(response.data?.data);
      setDepotItem(response.data?.data[0]);
      outstandingAmountApi(response.data?.data[0]);
      getDepositAmount(response.data?.data[0]?.user_id);
    }
  };

  const outstandingAmountApi = async itemValue => {
    const token = await AsyncStorage.getItem('InExToken');
    let dataObj = {
      user_id: itemValue?.user_id,
      bill_till_date: fromDate,
      //bill_till_date: '2024-08-06',
      show_weekly_bill: true,
    };
    // if (isPV || isDSM) {
    //   dataObj.show_weekly_bill = true;
    // }

    const response = await auth.outstandingAmountCollection(dataObj, token);
    // console.log('jfvj>____', dataObj);
    console.log('outstandingAmountApi', response);
    if (response?.status == 404) {
      setIsActionEnable(false);
      // setIsActionEnable(false)
      noDataApiAlert('outstandingAmountApi', 'No record found!');
    } else if (response?.status != 200) {
      apiFailureAlert('outstandingAmountApi');
    } else {
      console.log('response.data?.data jfvj>>>', response.data?.data);
      setIsActionEnable(true);
      setOutstandingData(response.data?.data);
    }
  };

  const paymentApi = async actionId => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    let dataObj = {
      user_id: userId,
      ship_to_code: depotItem?.ship_to_code,
      bill_to_code: outstandingData?.bill_to_code,
      bill_till_date: fromDate,
      payment_mode: 'online', //???
      amount_collected: parseInt(amountColl * 100),
      outstanding: outstandingData?.outstanding ?? 0,
    };
    let response = await auth.paymentRazorpay(dataObj, token);
    console.log('paymentApi', response);
    if (response?.status == 404) {
      noDataApiAlert('paymentApi', 'No record found!');
    } else if (response?.status != 200) {
      apiFailureAlert('paymentApi');
    } else {
      setPaymentData(response.data?.data);
      makePaymentAction(actionId, response.data?.data);
    }
  };

  const makePaymentAction = async (actionId, data) => {
    console.log('makePaymentAction:', data);
    if (__DEV__) {
      console.log('running in dev mode');
    }
    // console.log('ttested paymentData>>',JSON.stringify(data));
    let myOption = {
      description: '',
      image: 'https://i.imgur.com/3g7nmJC.png', //images.appLogo,
      currency: 'INR',
      key: razorPayApiKey,
      amount: parseInt(amountColl * 100), // in paisa
      name: 'Indian Express',
      order_id: data?.order_id,
      //order_id: 'order_OtrRQT6mALn5Gj',
      // prefill: {
      //   email: userData.email,
      //   contact: userData?.phone,
      //   name: userData?.name,
      // },
      max_count: 3,
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(myOption)
      .then(response => {
        console.log('RazerPayresponse>>', response);
        // let response = {"razorpay_order_id": "order_Jf7tiZDYHBZMOs", "razorpay_payment_id": "pay_Jf7tpwhpgIw5Yf", "razorpay_signature": "5167d0e4f2dea2aa9a48516b68d69a95b73c40012e1f00455bb01fead010fa1f"}
        // response.razorpay_payment_id
        setIsPaymentSuccess(true);
        setActionType(actionId);
        setSuccessPaymentData(response);
        return new Promise((resolve, reject) => {
          resolve(true);
        });
        // alert(`success: ${JSON.stringify(response)}`)
      })
      .catch(err => {
        console.log('RazerPayresponse>>', err);
        setIsPaymentSuccess(false);
        return new Promise((resolve, reject) => {
          reject(false);
        });
      });
  };

  const submitFinalAction = async (actionId, paymentType) => {
    //setIsActionEnable(true);
    setisLoading(true);
    const token = await AsyncStorage.getItem('InExToken');
    // const userId = await AsyncStorage.getItem('InExUserId');
    let userId = await AsyncStorage.getItem('InExUserId');
    let executiveId;

    if (
      userData?.role == 'Parcel Vendor' ||
      userData?.role == 'Depot Salesman'
    ) {
      userId = await AsyncStorage.getItem('InExUserId');
      executiveId = 0;
    } else {
      userId = depotItem?.user_id;
      executiveId = await AsyncStorage.getItem('InExUserId');
    }
    let dataObj = {
      user_id: parseInt(userId),
      ship_to_code: depotItem?.ship_to_code,
      bill_to_code: outstandingData?.bill_to_code,
      bill_till_date: fromDate,
      role: userData?.role,
      // "publication_start_date": fromDate,
      // "publication_end_date": toDate ? toDate : fromDate,
      // "publication_id": publicationItem?.id,
      // "edition_id": editionItem?.id,
      payment_mode: paymentType,
      // "unsold": unsoldVal,
      amount_collected: parseInt(amountColl),
      outstanding: outstandingData?.outstanding ?? 0,
      executive_id: executiveId,
    };

    if (paymentModeItem.name == 'online') {
      if (
        userData?.role == 'Collection Executive' ||
        userData?.role == 'Circulation Executive'
      ) {
        if (transactionId) {
          let newDataObj = {
            payment_mode: 'online',
            payment_id: paymentData.payment_id, //use from our api
            razorpay_payment_id: transactionId,
            // razorpay_order_id: successPaymentData.razorpay_order_id,
            // razorpay_signature: successPaymentData.razorpay_signature,
          };
          dataObj = {...dataObj, ...newDataObj};
        } else {
          Alert.alert(
            'Oops',
            'Please enter transaction id',
            [
              {
                text: 'OK',
                onPress: () => {
                  //navigation.navigate('Home');
                },
              },
            ],
            {cancelable: false},
          );
          return;
        }
      }
    }

    if (
      paymentModeItem.name == 'online' &&
      !_.isEmpty(paymentData) &&
      !_.isEmpty(successPaymentData)
    ) {
      let newDataObj = {
        payment_mode: 'online',
        payment_id: paymentData.payment_id, //use from our api
        razorpay_payment_id: successPaymentData.razorpay_payment_id,
        razorpay_order_id: successPaymentData.razorpay_order_id,
        razorpay_signature: successPaymentData.razorpay_signature,
      };
      dataObj = {...dataObj, ...newDataObj};
    }
    console.log('payload>>>>>>>3333>>>>>', dataObj);
    const response = await auth.collectionSubmit(dataObj, token);
    setisLoading(false);
    //setIsActionEnable(false);
    console.log('response: ', response.data);
    if (response?.status != 200) {
      noDataApiAlert(
        'submitApi',
        'Something went wrong, please try again later!',
      );
    } else {
      if (actionId == 1) {
        Alert.alert(
          'Success!',
          'Payment added successfully.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('CollectionList');
                //navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      }
      if (actionId == 2) {
        Alert.alert('Success!', 'Payment added successfully.', [
          {
            text: 'OK',
            onPress: () => {
              setAmountColl('');
              setPaymentModeItem({id: 1, name: 'cash'});
              setRecallApi(true);
            },
          },
        ]);
      }
    }
  };

  const submitAction = actionId => {
    console.log('id', paymentModeItem);

    if (paymentModeItem.name !== 'Coupon') {
      if (!amountColl || amountColl < 1) {
        alert('Please enter a valid amount.');
        return;
      }
    }

    if (paymentModeItem?.id == -1) {
      alert('Please select mode of payment ');
    } else {
      //consolelog("aaaaaaaa",paymentModeItem)
      if (paymentModeItem.name == 'cash') {
        submitFinalAction(actionId, 'cash');
      }
      if (paymentModeItem.name == 'online') {
        if (userData.role == 'Collection Executive') {
          submitFinalAction(actionId, 'online');
        } else {
          paymentApi(actionId);
        }
        // makePaymentAction(actionId);

        // makePaymentAction(actionId, {});
      }
      if (paymentModeItem.name == 'Cheque') {
        navigation.navigate('FillPaymentDetail', {
          amount: amountColl,
          outstandingData: outstandingData,
          depotItem: depotItem,
        });
      }

      if (paymentModeItem.name == 'Coupon') {
        navigation.navigate('ScanCoupen', {
          amount: amountColl,
          outstandingData: outstandingData,
          depotItem: depotItem,
        });
      }
    }
  };

  const onChangeTextValue = (text, type) => {
    //var reg = /^\d{0,4}(\.\d{0,2})?$/;
    var reg = /^\d{0,8}(\.\d{0,4})?$/;
    if (reg.test(text)) {
      //alert('Nice real currency!');
      setAmountColl(text);
    } else {
      alert('Please Enter a Valid Amount!');
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
            value={amountColl} //{type == 2 ? unsoldVal : returnVal}
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
    let isThisQrScaned = scanQrIds.find(itemData => itemData == qrData);

    if (isThisQrScaned) {
      setshowScanner(false);

      Alert.alert('Coupen Alert', 'This coupon already scanned.', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else {
      checkCouponDetail(qrData);
    }
  };

  const checkCouponDetail = async qrData => {
    let decodeData = qrData.split('$');
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.fetchQrData(decodeData[0], token);
    console.log('responseQr', response);
    if (response?.status != 200 && response?.status != 404) {
      alert('Somethig went wrong.');
    } else if (response?.status == 404) {
      alert(response.data?.message);
    } else {
      if (response?.data?.code == 200) {
        setshowScanner(false);
        //scanQrIds.push(qrData);
        setscanQrIds([...scanQrIds, qrData]);
        Alert.alert('Coupen Alert', 'Coupen scanned successfully.', [
          {text: 'OK', onPress: () => {}},
        ]);
      } else {
        Alert.alert('Coupen Alert', response?.data?.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      }
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
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

          {/* <AppLoader visible={isLoading} /> */}

          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: '5%',
              marginTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
              paddingRight: 10,
            }}>
            <Text style={styles.fromtext}> Outstanding Till Date</Text>
            <Text style={{color: COLORS.black, fontSize: 13}}>
              {TODAY_DATE_TO_SHOW}
            </Text>
          </View>
          <View style={{marginHorizontal: '6%'}}>
            <CustomDropdown
              disable={
                userData?.role == 'Depot Salesman' ||
                userData?.role == 'Parcel Vendor'
                  ? true
                  : false
              }
              headerTitle="Select Depot"
              data={depotArr}
              selectedItem={depotItem?.name}
              itemHandler={item => {
                getDepositAmount(item?.user_id);
                console.log('SelectedItem', item);
                setDepotItem(item);
                outstandingAmountApi(item);
              }}
              search={true}
            />
          </View>

          <View>
            {rowItemView(
              'Outstanding',
              outstandingData?.outstanding ?? 0,
              false,
              3,
            )}

            {rowItemView(
              'Todays Invoice',
              outstandingData?.weekly_bill,
              false,
              5,
            )}
            <View style={{marginHorizontal: '6%'}}>
              <CustomDropdown
                headerTitle="Payment Mode"
                //data={paymentModeArr}
                data={[
                  {id: -1, name: 'Please select an option...'},
                  {id: 1, name: 'online'},
                  {id: 2, name: 'cash'},
                  {id: 3, name: 'Coupon'},
                  {id: 4, name: 'Cheque'},
                ]}
                selectedItem={paymentModeItem?.name}
                itemHandler={item => {
                  setPaymentModeItem(item);
                  //console.log('SelectedItem', item);
                  if (item?.name == 'Coupon') {
                    setshowAmountField(false);
                    setshowTransactionIdField(false);
                  } else {
                    setshowAmountField(true);
                    if (item?.name == 'online') {
                      if (
                        userData?.role == 'Collection Executive' ||
                        userData?.role == 'Circulation Executive'
                      ) {
                        setshowTransactionIdField(true);
                      }
                    } else {
                      setshowTransactionIdField(false);
                    }
                  }

                  if (amountColl) {
                    setAmountColl('');
                  }
                }}
              />
            </View>

            {showTransactionIdField ? (
              //rowItemView('Transaction Id', transactionId, true)
              <View style={[styles.Supply, {marginTop: 10}]}>
                <Text style={styles.fromtext}>Transaction Id</Text>
                <TextInput
                  placeholder={'Enter Transaction id'}
                  style={styles.Supplybox}
                  value={transactionId} //{type == 2 ? unsoldVal : returnVal}
                  //keyboardType={'numeric' || 'number-pad'}
                  onChangeText={text => {
                    settransactionId(text);
                  }}
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              {rowItemView('Security Deposit Amount', depositAmt, false, 5)}
            </View>
          </View>

          {showAmountField
            ? rowItemView('Amount Paid', amountColl, true, 6)
            : null}

          {/* <View style={styles.Supply}>
            <Text style={styles.fromtext}>Scan Coupon</Text>

            <TouchableOpacity
              onPress={() => {
                setshowScanner(true);
                setPaymentModeItem({
                  id: -1,
                  name: 'Please select an option...',
                });
              }}
              style={[
                styles.Supplybox,
                {
                  backgroundColor: 'white',
                  paddingTop: 12,
                  color: 'black',
                },
              ]}>
              <Text>Scan Coupon</Text>
            </TouchableOpacity>
          </View> */}
          {/* <View style={{marginHorizontal: 25}}>
            {scanQrIds.length > 0 ? (
              <QrTable
                onCancelButtonCLick={renderData => {
                  let filterId = scanQrIds.filter(itemData => {
                    let filteritemData = itemData.split('$');
                    if (filteritemData[0] != renderData[0]) {
                      return itemData;
                    }
                  });

                  setscanQrIds(filterId);
                }}
                scanQrIds={scanQrIds}
              />
            ) : null}
          </View> */}
        </View>
        <View
          style={{
            marginVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}>
          {isLoading ? (
            <View style={[styles.canclebtn, {width: '70%'}]}>
              <ActivityIndicator size={'small'} color={'red'} />
            </View>
          ) : (
            <TouchableOpacity
              style={{width: '70%'}}
              disabled={!isActionEnable}
              onPress={() => {
                submitAction(1);
                // qrScanerHandler(
                //   '674161281$97$May-25$4022994 - Vasai Depot$VASAI DEPOT$PRAVIN',
                // );
              }}>
              <View
                style={[styles.canclebtn, {opacity: isActionEnable ? 1 : 0.3}]}>
                <Text style={styles.canclebtntext}>SUBMIT</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {/* <View style={styles.bottomView}>
        <TouchableOpacity
          disabled={!isActionEnable}
          onPress={() => {
            //submitAction(1);
            checkCouponDetail(
              '674168276$97$May-25$4022994 - Vasai Depot$VASAI DEPOT$PRAVIN',
            );
          }}>
          <View style={[styles.canclebtn, {opacity: isActionEnable ? 1 : 0.3}]}>
            <Text style={styles.canclebtntext}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.buttongroup}>
        <View>
          <TouchableOpacity
            disabled={!isActionEnable}
            onPress={() => {
              submitAction(1);
            }}>
            <View
              style={[styles.canclebtn, {opacity: isActionEnable ? 1 : 0.3}]}>
              <Text style={styles.canclebtntext}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={!isActionEnable}
          onPress={() => submitAction(2)}>
          <View
            style={[styles.logoutBtn1, {opacity: isActionEnable ? 1 : 0.3}]}>
            <Text style={styles.btnText}>ADD NEW</Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </>
  );
};

export default Collection;
