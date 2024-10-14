import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
import images from '../../../Image';
import COLORS from '../../../GlobalConstants/COLORS';
import {ButtonView} from '../../../Helper/buttonView';
import auth from '../../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../../Navigation/RootNavigator/NavigationService';
// ??? collection_id in edit concept

const screenWidth = Dimensions.get('screen').width;
console.log('screenWidth', screenWidth);

export default function UnsoldReturnApproval(props) {
  const route = props.route;
  const roleBasedGrid = route.params?.roleBasedGrid;
  console.log('route', route.params);
  const [recordsArr, setRecordsArr] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [supplyVal, setSupplyVal] = useState(0);
  const [unsoldVal, setUnsoldVal] = useState(0);
  const [returnVal, setReturnVal] = useState(0);
  const [showEditable, setShowEditable] = useState(true);

  const [outstanding, setOutstanding] = useState({index: -1, value: 0});
  const [collected, setCollected] = useState({index: -1, value: 0});

  useEffect(() => {
    setIsEdit(false);
    getSingleRecordApi();
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    if (userData?.role == 'Regional Manager') {
      setShowEditable(false);
    }
  };

  const apiFailureAlert = apiName => {
    console.log('Failure Api Name =======> ', apiName);
    Alert.alert(
      'oops!',
      'something went wrong, please try later!',
      [
        {
          text: 'OK',
          onPress: async () => {
            // await AsyncStorage.removeItem('InExToken');
            // await AsyncStorage.removeItem('InExUserId');
            // await AsyncStorage.removeItem('InExUserDetails');
            // NavigationService.reset(props.navigation, 'Login');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const getSingleRecordApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    let dataObj = {
      userId: userId,
      isForMobile: true,
      shipToCode: route.params?.shipToCode,
      billToCode: route.params?.billToCode,
      billTillDate: route.params?.billTillDate,
      // publicationDate: route.params?.publicationDate,
    };
    const response = await auth.collectionApproval(dataObj, token);
    console.log('response: getSingleRecordApi', response);
    console.log('response: getSingleRecordApi', dataObj);
    if (response?.status != 200) {
      apiFailureAlert('getSingleRecordApi');
    } else {
      let newMock = [
        {
          amount_collected: 10,
          bill_till_date: '2022-05-05',
          bill_to_code: '4000495',
          closing_balance: 5678.9,
          collection_id: 2,
          parcel_depot_name: 'LOWER PAREL DEPOT',
          payment_mode: 'cash',
          ship_to_code: '6000444',
          sum_total_amount_collected: 0,
          sum_total_closing_balance: 0,
          user_id: 543,
          user_name: 'LOWER PAREL DEPOT',
          user_name_created_by: 'LOWER PAREL DEPOT',
        },
        {
          amount_collected: 500,
          bill_till_date: '2022-05-05',
          bill_to_code: '4000495',
          closing_balance: 5678.9,
          collection_id: 2,
          parcel_depot_name: 'LOWER PAREL DEPOT',
          payment_mode: 'cash',
          ship_to_code: '6000444',
          sum_total_amount_collected: 0,
          sum_total_closing_balance: 0,
          user_id: 543,
          user_name: 'LOWER PAREL DEPOT',
          user_name_created_by: 'LOWER PAREL DEPOT',
        },
      ];
      let mock = [
        {
          amount_collected: 0,
          bill_till_date: '2022-05-05',
          bill_to_code: '4000495',
          closing_balance: 0,
          collection_id: 0,
          ship_to_code: '6000444',
          sum_total_amount_collected: 0,
          sum_total_closing_balance: 0,
          user_id: 0,
        },
        {
          amount_collected: 0,
          bill_till_date: '2022-05-05',
          bill_to_code: '4000495',
          closing_balance: 0,
          collection_id: 0,
          ship_to_code: '6000444',
          sum_total_amount_collected: 0,
          sum_total_closing_balance: 0,
          user_id: 0,
        },
      ];
      // setUnsoldVal(response.data?.data[0]?.unsold);
      // setRecordsArr(newMock);
      setRecordsArr(response.data?.data);
    }
  };

  const editRecordApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    console.log('recccc', recordsArr);
    let dataObj = {
      user_id: recordsArr[0].user_id,
      ship_to_code: recordsArr[0]?.ship_to_code,
      publication_date: recordsArr[0].publication_date,
      publication_id: recordsArr[0]?.publication_id,
      total_supply: supplyVal,
      unsold: unsoldVal,
      supply_return: returnVal,
      // "unsold_return_id": recordsArr[0]?.unsold_return_id, // optional
      updated_by_last_user_id: userId, // optional
    };
    if (recordsArr[0]?.collection_id > 0) {
      dataObj.collection_id = recordsArr[0]?.collection_id;
    }
    console.log('dataobj', dataObj);
    const response = await auth.unsoldReturnSubmit(dataObj, token);
    Alert.alert(
      'Record saved!',
      'Record updated successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            props.navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
    console.log('submitAction ', response);
  };

  const approvedRejectRecordApi = async status => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    let dataObj = {
      id: recordsArr[0]?.collection_id, //row id
      module: 'collection', // or collection
      user_id: userId, //logged in
      approval_status: status, // _1 -> approve or _2 --> reject
    };
    const response = await auth.approveRejectCommon(dataObj, token);
    console.log('response: approvedRejectRecordApi', response.data);
    if (response?.status != 200) {
      apiFailureAlert('approvedRejectRecordApi');
    } else {
      Alert.alert(
        'Record saved!',
        'Request submit successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const approvedAction = () => {
    if (isEdit) {
      setIsEdit(false);
      editRecordApi();
    } else {
      approvedRejectRecordApi('_1');
    }
  };

  const rejectAction = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      approvedRejectRecordApi('_2');
    }
  };

  const dynamicInputValue = type => {
    let val = 0;
    if (type == 2) {
      val = supplyVal;
    }
    if (type == 3) {
      val = unsoldVal;
    }
    if (type == 4) {
      val = returnVal;
    }
    return val.toString();
  };

  const onChangeTextValue = (text, type) => {
    //???
    console.log('ccccccccccccc', type, unsoldVal, returnVal);
    if (type == 2) {
      setSupplyVal(text);
    }
    if (type == 3) {
      setUnsoldVal(text);
    }
    if (type == 4) {
      setReturnVal(text);
    }
  };

  const renderRowView = (label, value, editable, type) => {
    return (
      <View
        style={{
          //   backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 12,
        }}>
        <Text style={{fontSize: 16, textTransform: 'uppercase'}}>{label}</Text>
        {editable && isEdit ? (
          <TextInput
            style={{
              fontSize: 16,
              textAlign: 'right',
              borderWidth: 1,
              borderColor: 'lightgrey',
              height: 26,
              width: '30%',
              paddingVertical: 1,
            }}
            value={dynamicInputValue(type)}
            keyboardType={'numeric' || 'number-pad'}
            onChangeText={text => onChangeTextValue(text, type)}
          />
        ) : (
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: editable ? COLORS.redPrimary : COLORS.black,
              textDecorationLine: editable ? 'underline' : 'none',
            }}>
            {value}
          </Text>
        )}
      </View>
    );
  };

  const unsoldReturnRenderItemView = item => {
    console.log('item: mmmmmmmm', item.item);
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          marginVertical: 8,
        }}>
        {/* {!isEdit && item.item?.approval_status == 0 && (
          <View style={{paddingBottom: 5}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                setIsEdit(true);
              }}>
              <Image
                source={images.editIcon}
                style={{width: 18, height: 18, alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        )} */}

        {renderRowView('PAYMENT MODE', item.item?.payment_mode, false, 1)}
        {renderRowView('OUTSTANDING (₹)', item.item?.closing_balance, false, 2)}
        {renderRowView('COLLECTED (₹)', item.item?.amount_collected, false, 3)}

        {item?.item?.payment_mode == 'cheque' &&
        item?.item?.cheque_payment_dto ? (
          <>
            {renderRowView(
              'Cheque number',
              item?.item?.cheque_payment_dto?.number,
              false,
              3,
            )}
            {renderRowView(
              'Bank Name',
              item?.item?.cheque_payment_dto?.bank_name,
              false,
              3,
            )}
          </>
        ) : null}

        {item?.item?.payment_mode == 'online' ? (
          <>
            {item?.item?.razorpay_payment_id
              ? renderRowView(
                  'Transaction Id',
                  item?.item?.razorpay_payment_id,
                  false,
                  3,
                )
              : null}
            {item?.item?.razorpay_order_id
              ? renderRowView(
                  'Order Id',
                  item?.item?.razorpay_order_id,
                  false,
                  3,
                )
              : null}
          </>
        ) : null}

        {item?.item?.approval_status == '2' && item?.item?.remarks ? (
          <Text
            style={{
              color: COLORS.black,
              //fontWeight: '500',
              paddingTop: 4,
              marginBottom: 10,
              fontSize: 16,
              //textTransform: 'uppercase',
            }}>
            {'Reason : ' + item?.item?.remarks}
          </Text>
        ) : null}

        {item?.item?.payment_mode == 'coupon' ? (
          <View
            style={{
              marginTop: 10,
              borderWidth: 0.4,
              borderColor: COLORS.black,
            }}>
            <View style={[styles.tableHeaderContaier, {textAlign: 'center'}]}>
              <View style={styles.CoupNumContainer}>
                <Text style={styles.tableListText}>Coup. No.</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.tableListText}>Amount</Text>
              </View>
              <View style={styles.expDateContainer}>
                <Text style={styles.tableListText}>Exp.Date</Text>
              </View>
              <View style={[styles.statusContainer, {flexDirection: 'row'}]}>
                <Text style={styles.tableListText}>Status</Text>
                {/* <Image
                    style={{height: 20, width: 20}}
                    source={images.downArrow}
                  /> */}
              </View>
            </View>

            {item?.item?.coupon_payment_dtos?.length > 0
              ? item?.item?.coupon_payment_dtos.map(couponData => {
                  return (
                    <View key={couponData?.id} style={{marginHorizontal: 1}}>
                      {/* <View style={styles.rowDevider}></View> */}
                      <View style={styles.tableDetailContainer}>
                        <View style={styles.depotParcelContainer}>
                          <Text
                            style={[
                              styles.tableListDetailText,
                              {textAlign: 'center'},
                            ]}>
                            {couponData?.coupon_no}
                          </Text>
                        </View>
                        <View style={styles.depotContainer}>
                          <Text
                            style={styles.tableListDetailText}
                            numberOfLines={1}>
                            {couponData?.amount}
                          </Text>
                        </View>
                        <View style={styles.parcelContainer}>
                          <Text
                            style={styles.tableListDetailText}
                            numberOfLines={1}>
                            {couponData?.exp_date}
                          </Text>
                        </View>
                        <View style={styles.totalContainer}>
                          <Text
                            style={styles.tableListDetailText}
                            numberOfLines={1}>
                            {couponData?.coupon_status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              : null}
          </View>
        ) : null}

        {item.item?.approval_status != 0 && (
          <View style={{height: 1, backgroundColor: 'grey'}} />
        )}
        {item.item?.approval_status != 0
          ? renderRowView(
              'STATUS',
              //item.item?.approval_status == 1 ? 'APPROVED' : 'REJECT',
              item.item?.approval_status == '0'
                ? 'Pending'
                : item.item?.approval_status == '1'
                  ? 'Approved'
                  : item.item?.approval_status == '2'
                    ? 'Rejected'
                    : item.item?.approval_status == '3'
                      ? 'Verified'
                      : 'Pending',
              false,
              6,
            )
          : null}
        {item.item?.approval_status != 0 && (
          <View style={{height: 1, backgroundColor: 'grey'}} />
        )}
        {/* <Text>{item.item?.key}</Text>
                {item.item?.editable ? <TouchableOpacity onPress={() => {}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={images.file} style={{ width: 15, height:15, alignSelf: 'center'}} />
                <Text style={{color: COLORS.redPrimary, marginLeft: 6, textDecorationLine: 'underline'}}>{item.item?.value}</Text>
                </View>
                </TouchableOpacity>
                : <Text>{item.item?.value}</Text>} */}
      </View>
    );
  };

  const unsoldReturnView = () => {
    return (
      <View>
        <View
          style={{flexDirection: 'column', alignItems: 'center', margin: 16}}>
          <Image source={images.return} style={{width: 55, height: 55}} />
          <Text
            style={{
              color: COLORS.redPrimary,
              fontSize: 18,
              fontWeight: '600',
              marginTop: 6,
            }}>
            Collection
          </Text>
          <Text style={{color: COLORS.black, fontWeight: '500', marginTop: 6}}>
            {recordsArr.length > 0 && recordsArr[0].parcel_depot_name} -{' '}
            {route.params?.billToCode}
          </Text>
          <Text style={{color: COLORS.black, fontWeight: '500', marginTop: 6}}>
            {route.params?.billTillDate}
          </Text>
        </View>
        <FlatList
          // horizontal={true}
          showsVerticalScrollIndicator={false}
          data={recordsArr}
          style={{marginHorizontal: 12, marginTop: 6, marginBottom: 170}}
          renderItem={item => unsoldReturnRenderItemView(item)}
        />

        {/* role based show ??? */}
        {recordsArr.length > 0 &&
          showEditable &&
          recordsArr[0].approval_status == 0 && (
            <View
              style={{bottom: 0, flexDirection: 'row', marginHorizontal: 10}}>
              <ButtonView
                title={isEdit ? 'CANCEL' : 'REJECT'}
                isPrimary={false}
                textStyle={{color: COLORS.redPrimary}}
                btnStyle={{marginRight: 8, marginHorizontal: 0}}
                onBtnPress={() => rejectAction()}
              />
              <ButtonView
                title={isEdit ? 'SAVE' : 'APPROVED'}
                onBtnPress={() => approvedAction()}
              />
            </View>
          )}
      </View>
    );
  };

  return <View style={{flex: 1}}>{unsoldReturnView()}</View>;
}

const styles = StyleSheet.create({
  tableHeaderContaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    // backgroundColor: '#cacaca',
    backgroundColor: COLORS.lightGreyBorder,
  },
  CoupNumContainer: {
    width: '30%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tableListText: {
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  amountContainer: {
    width: '22%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expDateContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
  },
  statusContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowDevider: {
    height: 1,
    backgroundColor: COLORS.lightGreyBorder,
    width: '100%',
  },
  tableDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: COLORS.black,
    borderTopWidth: 0.4,
    //paddingTop: 10,
    //paddingHorizontal: 10,
    //height: 40,
  },
  depotParcelContainer: {
    width: '30%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tableListDetailText: {
    color: COLORS.black,
    textAlign: 'auto',
    fontWeight: '400',
    fontSize: 11,
    paddingVertical: 5,
  },
  depotContainer: {
    width: '22%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parcelContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
  },
  totalContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
