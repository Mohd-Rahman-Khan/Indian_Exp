import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  LayoutAnimation,
  Platform,
} from 'react-native';
import styles from './styles';
import SelectBox from 'react-native-multi-selectbox';
import {difference, set, xorBy} from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../Image';
import moment from 'moment';
import auth from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import commonApiResponseHandler from '../../api/commonMethod';
import COLORS from '../../GlobalConstants/COLORS';
import _ from 'lodash';
import NavigationService from '../../Navigation/RootNavigator/NavigationService';
import useTimeBlockedCallback from '../../Helper/DoubleTapHelper';
import DatePicker from 'react-native-date-picker';
import CustomDropdown from '../../comonent/CustomDropdown';
import AppLoader from '../../Helper/AppIndicator';
import CalenderComp from '../../comonent/CalenderComp';

const TODAY_DATE = moment().format('DD-MM-YYYY');

// console.log('Todays Day', moment().isoWeekday());

const PrintOrder = ({navigation}) => {
  const [reqFormatDate, setReqFormatDate] = useState(TODAY_DATE);
  const [publicationArr, setPublicationArr] = useState([]);
  const [publicationItem, setPublicationItem] = useState({});
  const [depotArr, setDepotArr] = useState([]);
  const [depotItem, setDepotItem] = useState('');
  const [supplyVal, setSupplyVal] = useState(0);
  const [tradeVal, settradeVal] = useState(0);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [newSupply, setnewSupply] = useState(0);
  const [newTrade, setnewTrade] = useState(0);
  const [supplyData, setSupplyData] = useState();
  const [loading, setloading] = useState(false);
  const [userData, setuserData] = useState('');
  const [showCalender, setshowCalender] = useState(false);
  const [selectPODateDate, setselectPODateDate] = useState(false);
  const [selectFromDate, setselectFromDate] = useState(false);
  const [selectedFromDate, setselectedFromDate] = useState(
    //moment(new Date()).format('DD-MM-YYYY, dddd'),
    'Please select date...',
  );

  const [passFromDateToApi, setpassFromDateToApi] = useState(
    //moment(new Date()).format('YYYY-MM-DD'),
    'Please select date...',
  );

  const [selectedToDate, setselectedToDate] = useState(
    //moment(new Date()).format('DD-MM-YYYY, dddd'),
    'Please select date...',
  );

  const [passToDateToApi, setpassToDateToApi] = useState(
    //moment(new Date()).format('YYYY-MM-DD'),
    'Please select date...',
  );

  const [selectedPODate, setselectedPODate] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );

  const [passPODateToApi, setpassPODateToApi] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [weekEndDate, setweekEndDate] = useState(
    //moment(new Date()).format('DD-MM-YYYY, dddd'),
    'Please select date...',
  );

  const [passweekEndDateToApi, setpassweekEndDateToApi] = useState(
    //moment(new Date()).format('DD-MM-YYYY'),
    'Please select date...',
  );

  const [isWeekeend, setisWeekeend] = useState(false);
  const [dateType, setdateType] = useState('');

  const [publicationList, setpublicationList] = useState([
    // {
    //   id: 1,
    //   trade_name: 'Indian Express',
    //   trade: 386,
    //   updated_value: 376,
    //   difference: -10,
    // },
    // {
    //   id: 3,
    //   trade_name: 'Financial Express',
    //   trade: 28,
    //   updated_value: 40,
    //   difference: +12,
    // },
    // {
    //   id: 2,
    //   trade_name: 'Loksatta',
    //   trade: 4424,
    //   updated_value: 4450,
    //   difference: +26,
    // },
    // {
    //   id: 4,
    //   trade_name: 'Lokprabha',
    //   trade: 45,
    //   updated_value: 35,
    //   difference: -10,
    // },
    // {
    //   id: 5,
    //   trade_name: 'Jansatta',
    //   trade: 90,
    //   updated_value: 87,
    //   difference: -3,
    // },
  ]);

  useEffect(() => {
    depotApi();
    // publicationApi();
    getUserDetails();
  }, []);

  // useEffect(() => {
  //   depotApi();
  //   publicationApi();
  // }, [recallApi]);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    setuserData(userData);
    //getTodayTradeSupply(userData);
  };

  const getTodayTradeSupply = async () => {
    //setloading(true);
    const userId = await AsyncStorage.getItem('InExUserId');
    if (userData && depotItem) {
      //console.log('depotItem', depotItem);
      const token = await AsyncStorage.getItem('InExToken');
      const response = await auth.getTodayTradeSupply(
        `${depotItem?.user_id}?date=${passPODateToApi}`,
        token,
      );
      console.log('getTodayTradeSupply', response);
      setloading(false);

      // console.log('getTodayTradeSupply', userData);
      // console.log('getTodayTradeSupply', depotItem);

      if (response?.data?.code == 200) {
        setpublicationList(response?.data?.data);
      } else {
        Alert.alert(
          'Oops!',
          'something went wrong, please try later!',
          [
            {
              text: 'OK',
              onPress: async () => {
                // await AsyncStorage.removeItem('InExToken');
                // await AsyncStorage.removeItem('InExUserId');
                // await AsyncStorage.removeItem('InExUserDetails');
                // NavigationService.reset(navigation, 'Login');
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  };

  useEffect(() => {
    getTodayTradeSupply();
  }, [depotItem, userData, passPODateToApi]);

  // useEffect(() => {
  //   if (!_.isEmpty(depotItem) && reqFormatDate && !_.isEmpty(publicationItem)) {
  //     supplyApi(false);
  //   }
  // }, [reqFormatDate, publicationItem, depotItem]);

  const apiFailureAlert = apiName => {
    console.log('Failure Api Name =======> ', apiName);
    Alert.alert(
      'oops!',
      'something went wrong, please try later!',
      [
        {
          text: 'OK',
          onPress: async () => {
            setloading(false);
            // await AsyncStorage.removeItem('InExToken');
            // await AsyncStorage.removeItem('InExUserId');
            // await AsyncStorage.removeItem('InExUserDetails');
            // NavigationService.reset(navigation, 'Login');
          },
        },
      ],
      {cancelable: false},
    );
  };
  const apiFailureAlertMessage = apiName => {
    console.log('Failure Api Name =======> ', apiName);
    Alert.alert(
      '',
      'Something went wrong, Please contact adminstrator.',
      [
        {
          text: 'OK',
          onPress: () => {
            // setSupplyVal(0);
            // setnewSupply(0);
            // setDisableButton(true);
          },
        },
      ],
      {cancelable: false},
    );
  };

  // const supplyApiFailureAlert = apiName => {
  //   console.log('Failure Api Name =======> @@@@@@@@', apiName);
  //   Alert.alert(
  //     'Information!',
  //     'Supply not updated for the selected date.',
  //     [
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           setSupplyVal(0);
  //           setnewSupply(0);
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

  // const publicationApi = async () => {
  //   const token = await AsyncStorage.getItem('InExToken');
  //   const response = await auth.publications(token);
  //   if (response?.status != 200) {
  //     apiFailureAlert('publicationApi');
  //   } else {
  //     console.log('publications res', response.data?.data);
  //     setPublicationArr(response.data?.data);
  //     setPublicationItem(response.data?.data[0]);
  //   }
  // };

  const depotApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    console.log('token', token);
    const response = await auth.depots(userId, token);
    if (response?.status != 200 && response?.status != 404) {
      apiFailureAlert('depotApi');
    } else if (response?.status == 404) {
      apiFailureAlertMessage('depotApi');
    } else {
      console.log('depotApi res_____________', response.data?.data);
      setDepotArr(response.data?.data);
      setDepotItem(response.data?.data[0]);
    }
  };

  // const supplyApi = async flag => {
  //   const token = await AsyncStorage.getItem('InExToken');
  //   const response = await auth.supply(
  //     depotItem?.ship_to_code,
  //     reqFormatDate,
  //     publicationItem?.id,
  //     token,
  //   );
  //   console.log('Supply Api Resp', response);
  //   // if (response?.status != 200) {
  //   //   supplyApiFailureAlert('supplyApi');
  //   //   setSubmitEnable(true);
  //   // } else {
  //   //   setSubmitEnable(false);
  //   //   setSupplyData(response.data?.data);
  //   //   setSupplyVal(response.data?.data?.total_supply);
  //   //   setnewSupply(response.data?.data?.total_supply);
  //   // }
  // };

  const onChangeTextValue = (text, type, item) => {
    if (text == '') {
      let newArr = publicationList.map(rederItem => {
        if (rederItem?.id == item?.id) {
          rederItem.updated_value = 0;
          rederItem.difference = item.updated_value - item?.trade;
          return {...rederItem};
        } else {
          return rederItem;
        }
      });

      setpublicationList(newArr);
    } else {
      let newArr = publicationList.map(rederItem => {
        if (rederItem?.id == item?.id) {
          let newValue = parseInt(text);
          rederItem.updated_value = newValue;
          rederItem.difference = item.updated_value - item?.trade;
          return {...rederItem};
        } else {
          return rederItem;
        }
      });
      setpublicationList(newArr);
    }
  };

  const rowItemView = (
    lbl,
    value = 0,
    enableFlag,
    type,
    showButton = false,
    item,
  ) => {
    return (
      <View
        style={[
          {
            flexDirection: 'column',
            marginTop: 15,
            //marginHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingVertical: 10,
          },
        ]}>
        <View>
          <Text numberOfLines={2} style={{fontSize: 18, fontWeight: 'bold'}}>
            {lbl}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{width: '24%'}}>
            <Text>PO</Text>
          </View>
          <View
            style={{
              width: '74%',
              alignItems: 'center',
              backgroundColor: COLORS.lightGreyBorder,
              height: 30,
              justifyContent: 'center',
            }}>
            <Text>{item?.trade}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{width: '24%'}}>
            <Text>Revision</Text>
          </View>
          <View
            style={{
              width: '74%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.plusMinusBottonBox}>
              <TouchableOpacity
                onPress={() => {
                  if (item?.updated_value > 0) {
                    let newArr = publicationList.map(rederItem => {
                      if (rederItem?.id == item?.id) {
                        rederItem.updated_value = rederItem?.updated_value - 1;
                        rederItem.difference = item.updated_value - item?.trade;

                        return {...rederItem};
                      } else {
                        return rederItem;
                      }
                    });

                    setpublicationList(newArr);
                  }
                }}
                style={styles.iconButtonContainer}>
                <Image style={styles.iconStyle} source={images.minusIcon} />
              </TouchableOpacity>
            </View>
            <View style={{width: '46%'}}>
              <TextInput
                style={styles.textInputStyle}
                value={item?.updated_value.toString()}
                keyboardType={'numeric' || 'number-pad'}
                onChangeText={text => onChangeTextValue(text, type, item)}
              />
            </View>
            <View style={styles.plusMinusBottonBox}>
              <TouchableOpacity
                onPress={() => {
                  if (item?.updated_value >= 0) {
                    let newArr = publicationList.map(rederItem => {
                      if (rederItem?.id == item?.id) {
                        rederItem.updated_value = rederItem?.updated_value + 1;
                        rederItem.difference = item.updated_value - item?.trade;
                        return {...rederItem};
                      } else {
                        return rederItem;
                      }
                    });

                    setpublicationList(newArr);
                  }
                }}
                style={styles.iconButtonContainer}>
                <Image style={styles.iconStyle} source={images.plusIcon} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '25%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.lightGreyBorder,
                paddingVertical: 6,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: item.updated_value - item?.trade < 0 ? 'red' : 'green',
                  fontWeight: 'bold',
                  fontSize: 10,
                  textAlign: 'center',
                }}>
                {/* {item?.difference <= 0
                  ? item?.difference
                  : '+' + item?.difference} */}

                {item?.difference}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const submitAction = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');

    if (isWeekeend) {
      if (passweekEndDateToApi == 'Please select date...') {
        Alert.alert(
          'Oops!',
          'Please select PO revision date.',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );

        return;
      }
    } else if (
      passFromDateToApi == 'Please select date...' ||
      passToDateToApi == 'Please select date...'
    ) {
      Alert.alert(
        'Oops!',
        'Please select from and to date.',
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );

      return;
    }

    setloading(true);

    let dataObj = {
      user_id: depotItem?.user_id,
      total_updated_data: publicationList,
      from_date: isWeekeend ? passweekEndDateToApi : passFromDateToApi,
      to_date:
        passToDateToApi == 'Please select date...' ? null : passToDateToApi,
      date_type: isWeekeend ? 'weekend' : 'weekday',
      supply_id: publicationList[0]?.supply_id,
      timeSlot: moment().format('HH:mm'),
    };

    console.log('submitAction', dataObj);

    let response = await auth.savePrintOrder(dataObj, token);
    setloading(false);

    console.log('submitAction', response);

    if (response?.data?.code == 200 || response?.data?.code == 201) {
      Alert.alert(
        'Success',
        'Print Order Added successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              setTimeout(() => {
                navigation.navigate('PrintOrderList');
              }, 1000);
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      setloading(false);
      Alert.alert(
        'Oops!',
        response.data?.message ? response.data?.message : response?.problem,
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <ScrollView>
      <AppLoader visible={loading} />
      {showCalender ? (
        <CalenderComp
          selectFromDate={isWeekeend ? true : selectFromDate}
          dateType={dateType}
          fromDate={selectedFromDate}
          closeModal={() => {
            setshowCalender(!showCalender);
            setselectFromDate(false);
            setselectPODateDate(false);
          }}
          minDate={
            dateType == 'PO' ? null : moment(new Date()).format('YYYY-MM-DD')
          }
          maxDate={
            dateType == 'WE' || dateType == 'FD' || dateType == 'TD'
              ? null
              : moment(new Date()).format('YYYY-MM-DD')
          }
          setselectedDate={date => {
            const reqFormatDt = moment(date).format('DD-MM-YYYY, dddd');

            setshowCalender(!showCalender);
            if (dateType == 'PO') {
              setselectedPODate(reqFormatDt);
              setpassPODateToApi(date);
              if (
                moment(date).isoWeekday() == 6 ||
                moment(date).isoWeekday() == 7
              ) {
                setisWeekeend(true);
              } else {
                setisWeekeend(false);
              }
            } else if (dateType == 'WE') {
              if (
                moment(date).isoWeekday() == 6 ||
                moment(date).isoWeekday() == 7
              ) {
                setweekEndDate(reqFormatDt);
                setpassweekEndDateToApi(date);
              } else {
                Alert.alert(
                  'Oops',
                  'Please select only weekend date.',
                  [{text: 'OK', onPress: async () => {}}],
                  {cancelable: false},
                );
              }
            } else if (dateType == 'FD') {
              if (
                moment(date).isoWeekday() == 6 ||
                moment(date).isoWeekday() == 7
              ) {
                Alert.alert(
                  'Oops',
                  'Please select only weekday date.',
                  [{text: 'OK', onPress: async () => {}}],
                  {cancelable: false},
                );
              } else {
                setselectedFromDate(reqFormatDt);
                setpassFromDateToApi(date);
              }
            } else if (dateType == 'TD') {
              if (
                moment(date).isoWeekday() == 6 ||
                moment(date).isoWeekday() == 7
              ) {
                Alert.alert(
                  'Oops',
                  'Please select only weekday date.',
                  [{text: 'OK', onPress: async () => {}}],
                  {cancelable: false},
                );
              } else {
                console.log('SelectedDate', date);
                console.log('SelectedDate', passFromDateToApi);
                if (date < passFromDateToApi) {
                  Alert.alert(
                    'Oops',
                    'To date should be greater than from date.',
                    [{text: 'OK', onPress: async () => {}}],
                    {cancelable: false},
                  );
                } else {
                  setselectedToDate(reqFormatDt);
                  setpassToDateToApi(date);
                }
              }
            } else {
            }
          }}
        />
      ) : null}
      <View style={styles.container}>
        <CustomDropdown
          headerTitle="Depot Name"
          data={depotArr}
          selectedItem={depotItem?.name}
          itemHandler={item => {
            setDepotItem(item);
          }}
          search={true}
          disable={
            userData?.role == 'Depot Salesman' ||
            userData?.role == 'Parcel Vendor'
              ? true
              : false
          }
        />

        <View
          style={{
            backgroundColor: 'white',
            marginTop: 20,
          }}>
          <Text style={styles.dropdownHeading}>Select Print Order Date</Text>
          <TouchableOpacity
            onPress={() => {
              setselectPODateDate(true);
              setshowCalender(true);
              setselectFromDate(false);
              setdateType('PO');
            }}
            style={{
              height: 46,
              width: '100%',
              backgroundColor: 'lightgrey',
              paddingHorizontal: 16,
              justifyContent: 'center',
            }}>
            <Text style={{color: COLORS.black, fontSize: 16}}>
              {selectedPODate}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
          }}>
          {publicationList?.length > 0 ? (
            <>
              {isWeekeend ? (
                <View
                  style={{
                    backgroundColor: 'white',
                    //marginTop: 20,
                  }}>
                  <Text style={styles.dropdownHeading}>
                    Select PO Revision Date
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setshowCalender(true);
                      setdateType('WE');
                    }}
                    style={{
                      height: 46,
                      width: '100%',
                      backgroundColor: 'lightgrey',
                      paddingHorizontal: 16,
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: COLORS.black, fontSize: 16}}>
                      {weekEndDate}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      backgroundColor: 'white',
                      //marginTop: 20,
                    }}>
                    <Text style={styles.dropdownHeading}>From Date</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setselectFromDate(true);
                        setshowCalender(true);
                        setdateType('FD');
                      }}
                      style={{
                        height: 46,
                        width: '100%',
                        backgroundColor: 'lightgrey',
                        paddingHorizontal: 16,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: COLORS.black, fontSize: 16}}>
                        {selectedFromDate}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      marginTop: 20,
                    }}>
                    <Text style={styles.dropdownHeading}>To Date</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setshowCalender(true);
                        setdateType('TD');
                      }}
                      style={{
                        height: 46,
                        width: '100%',
                        backgroundColor: 'lightgrey',
                        paddingHorizontal: 16,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: COLORS.black, fontSize: 16}}>
                        {selectedToDate}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>
                      Note:Weekend dates will not include.
                    </Text>
                  </View>
                </>
              )}
              {publicationList.map(item => {
                return (
                  <View key={item?.id}>
                    {rowItemView(
                      item?.trade_name,
                      newTrade,
                      true,
                      4,
                      true,
                      item,
                    )}
                  </View>
                );
              })}
            </>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                Publication list not found
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttongroup}>
          <View>
            <TouchableOpacity
              disabled={publicationList.length > 0 ? false : true}
              onPress={() => submitAction()}>
              <View
                style={[
                  styles.canclebtn,
                  {
                    opacity: publicationList.length > 0 ? 1 : 0.3,
                    borderColor:
                      supplyData?.approval_status == 1
                        ? 'lightgrey'
                        : '#DA0B0B',
                    backgroundColor:
                      supplyData?.approval_status == 1 ? 'lightgrey' : 'white',
                  },
                ]}>
                <Text
                  style={[
                    styles.canclebtntext,
                    {
                      color:
                        supplyData?.approval_status == 1 ? 'white' : '#DA0B0B',
                    },
                  ]}>
                  SUBMIT
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrintOrder;
