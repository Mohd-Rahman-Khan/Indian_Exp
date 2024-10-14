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
} from 'react-native';
import images from '../../../Image';
import COLORS from '../../../GlobalConstants/COLORS';
import {ButtonView} from '../../../Helper/buttonView';
import auth from '../../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../../../Navigation/RootNavigator/NavigationService';
// ??? unsold_return_id in edit concept

const screenWidth = Dimensions.get('screen').width;
console.log('screenWidth', screenWidth);

export default function UnsoldReturnApproval(props) {
  const route = props.route;
  const roleBasedGrid = route.params?.roleBasedGrid;

  const [recordsArr, setRecordsArr] = useState([]);
  const [supplyEdit, setSupplyEdit] = useState(true);
  const [userLoginedDetails, setUserLoginedDetails] = useState();
  const [isCirEX, setIsCirEX] = useState(false);

  useEffect(() => {
    getSingleRecordApi();
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    setUserLoginedDetails(userData);
    if (userData?.role == 'Circulation Executive') {
      setSupplyEdit(false);
    }
    if (userData?.role == 'Circulation Executive') {
      setIsCirEX(true);
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
            await AsyncStorage.removeItem('InExToken');
            await AsyncStorage.removeItem('InExUserId');
            await AsyncStorage.removeItem('InExUserDetails');
            NavigationService.reset(props.navigation, 'Login');
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
      publicationDate: route.params?.publicationDate,
    };
    const response = await auth.unsoldReturnApproval(dataObj, token);
    console.log('response: getSingleRecordApik', response.data?.data);
    if (response?.status != 200) {
      apiFailureAlert('getSingleRecordApi');
    } else {
      const tempArray = [...response.data?.data];
      // const filteredData = tempArray.filter(
      //   e => e.approval_status === route?.params?.approvalStatus,
      // );
      tempArray.map(
        e => (
          (e.isEditFlag = false),
          (e.newTotalSupplyVal = e.total_supply),
          (e.newUnsoldVal = e.unsold),
          (e.newSupplyReturnVal = e.supply_return)
        ),
      );
      setRecordsArr(tempArray);
    }
  };

  const editRecordApi = async item => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');

    let dataObj = {
      unsold_return_id: item?.unsold_return_id,
      user_id: item.user_id,
      ship_to_code: item?.ship_to_code,
      publication_date: item.publication_date,
      publication_id: item?.publication_id,
      total_supply: item.newTotalSupplyVal,
      unsold: item?.newUnsoldVal,
      supply_return: item?.newSupplyReturnVal,
      updated_by_last_user_id: userId, // optional
    };
    if (item?.approval_status == 2) {
      Object.assign(dataObj, {approval_status: '_0'});
    }
    //  console.log('dataobj>>>>>>>>kkkkk', dataObj);
    const response = await auth.unsoldReturnSubmit(dataObj, token);
    Alert.alert(
      'Record saved!',
      'Record updated successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            // props.navigation.goBack();
            getSingleRecordApi();
          },
        },
      ],
      {cancelable: false},
    );
    // console.log('submitAction ', response);
  };

  const approvedRejectRecordApi = async (status, item) => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    let dataObj = {
      id: item?.unsold_return_id, //row id
      module: 'unsold_return', // or collection
      user_id: userId, //logged in
      approval_status: status, // _1 -> approve or _2 --> reject
    };
    //  console.log('testrrr>>>>>>>>>>>>>>>>jjjjjjjjjjjj',dataObj);
    const response = await auth.approveRejectCommon(dataObj, token);
    // console.log('response: approvedRejectRecordApi>>>>>>>>>>>>', response.data);
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
              getSingleRecordApi();
              if (route.params.navigation) {
                route.params.navigation.navigate(
                  'UnsoldReturnApprovalDashboard',
                  {
                    roleBasedGrid: 1,
                  },
                );
              } else {
                route?.params?.onGoBack();
              }
            },
          },
        ],
        {cancelable: false},
      );
      if (status == '_1') {
        let tempObj = {
          login_id: item?.ship_to_code,
          title: 'Unsold/Return Approval',
          message: 'Your request approved successfully.',
        };
        //await auth.sendNotification(tempObj, token);
      }
      if (status == '_2') {
        let tempObj = {
          login_id: item?.ship_to_code,
          title: 'Unsold/Return Approval',
          message: 'Your request rejected.',
        };
        //ssawait auth.sendNotification(tempObj, token);
      }
    }
  };

  const renderRowView = (label, value, editable, type, handleTextChange) => {
    return (
      <View
        style={{
          //   backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 12,
        }}>
        <Text style={{fontSize: 16}}>{label}</Text>
        {editable ? (
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
            value={value.toString()}
            keyboardType={'numeric' || 'number-pad'}
            onChangeText={handleTextChange}
            editable={
              label === 'SUPPLY' &&
              userLoginedDetails?.role === 'Regional Manager'
                ? false
                : true
            }
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

  const editHandlePress = (index, item) => {
    const tempArray = [...recordsArr];

    tempArray[index].isEditFlag = !tempArray[index].isEditFlag;
    setRecordsArr(tempArray);
  };

  const handlePressCancelReject = (index, item) => {
    if (item?.isEditFlag) {
      const tempArray = [...recordsArr];
      tempArray[index].isEditFlag = !tempArray[index].isEditFlag;
      tempArray[index].newTotalSupplyVal = tempArray[index].total_supply;
      tempArray[index].newUnsoldVal = tempArray[index].unsold;
      tempArray[index].newSupplyReturnVal = tempArray[index].supply_return;
      setRecordsArr(tempArray);
    } else {
      // Reject
      approvedRejectRecordApi('_2', item);
    }
  };
  const handlePressSaveApprove = (index, item) => {
    if (item?.isEditFlag) {
      // Save
      editRecordApi(item);
    } else {
      // Approve
      approvedRejectRecordApi('_1', item);
      console.log('GoBackData_________', route.params.navigation);
      //route.params.navigation.goBack();
    }
  };

  const unsoldReturnRenderItemView = (item, index) => {
    // console.log('item: mmmmmmmm', item);
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          //   marginRight: 12,
          marginVertical: 8,
        }}>
        {item?.approval_status == 0 && !item?.isEditFlag && (
          <View style={{paddingBottom: 5}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                editHandlePress(index, item);
              }}>
              <Image
                source={images.editIcon}
                style={{width: 18, height: 18, alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        )}
        {item?.approval_status == 2 && isCirEX && !item?.isEditFlag && (
          <View style={{paddingBottom: 5}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                editHandlePress(index, item);
              }}>
              <Image
                source={images.editIcon}
                style={{width: 18, height: 18, alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        )}
        {renderRowView(
          'PUBLICATION',
          item?.publication_name,
          false,
          1,
          text => {},
        )}
        {renderRowView(
          'SUPPLY',
          item?.newTotalSupplyVal,
          !supplyEdit
            ? supplyEdit
            : item?.approval_status == 0 && item?.isEditFlag,
          2,
          text => {
            const array = [...recordsArr];
            array[index].newTotalSupplyVal = text;
            setRecordsArr(array);
          },
        )}
        {renderRowView(
          'UNSOLD',
          item?.newUnsoldVal,
          (item?.approval_status == 0 || isCirEX) && item?.isEditFlag,
          3,
          text => {
            const array = [...recordsArr];
            array[index].newUnsoldVal = text;
            setRecordsArr(array);
          },
        )}
        {renderRowView(
          'RETURN',
          item?.newSupplyReturnVal,
          (item?.approval_status == 0 || isCirEX) && item?.isEditFlag,
          4,
          text => {
            const array = [...recordsArr];
            array[index].newSupplyReturnVal = text;
            setRecordsArr(array);
          },
        )}
        {renderRowView(
          'NPS',
          item?.newTotalSupplyVal -
            item?.newUnsoldVal -
            item?.newSupplyReturnVal,
          false,
          5,
          text => {},
        )}
        {item?.approval_status != 0 && (
          <View style={{height: 1, backgroundColor: 'grey'}} />
        )}
        {/* {item?.approval_status != 0
          ? renderRowView(
              'STATUS',
              item?.approval_status == 1
                ? 'APPROVED'
                : item?.approval_status == 0
                ? 'PENDING'
                : 'REJECTED',
              false,
              6,
              text => {},
            )
          : null} */}
        {item?.approval_status != 0 ? (
          <View
            style={{
              //   backgroundColor: 'red',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 12,
            }}>
            <Text style={{fontSize: 16}}>{'STATUS'}</Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'right',
                height: 26,
                width: '30%',
                paddingVertical: 1,
                color:
                  item?.approval_status == 1
                    ? 'green'
                    : item?.approval_status == 0
                      ? 'black'
                      : 'red',
              }}>
              {item?.approval_status == 1
                ? 'APPROVED'
                : item?.approval_status == 0
                  ? 'PENDING'
                  : 'REJECTED'}
            </Text>
          </View>
        ) : null}
        {item?.approval_status != 0 && (
          <View style={{height: 1, backgroundColor: 'grey'}} />
        )}

        {item?.approval_status == 0 && !isCirEX && (
          <View style={{bottom: 0, flexDirection: 'row', marginHorizontal: 10}}>
            <ButtonView
              title={item?.isEditFlag ? 'CANCEL' : 'REJECT'}
              isPrimary={false}
              textStyle={{color: COLORS.redPrimary}}
              btnStyle={{marginRight: 8, marginHorizontal: 0}}
              onBtnPress={() => handlePressCancelReject(index, item)}
            />
            <ButtonView
              title={item?.isEditFlag ? 'SAVE' : 'APPROVE'}
              onBtnPress={() => handlePressSaveApprove(index, item)}
            />
          </View>
        )}
        {(item?.approval_status == 0 || item?.approval_status == 2) &&
          isCirEX &&
          item?.isEditFlag && (
            <View
              style={{bottom: 0, flexDirection: 'row', marginHorizontal: 10}}>
              <ButtonView
                title={'CANCEL'}
                isPrimary={false}
                textStyle={{color: COLORS.redPrimary}}
                btnStyle={{marginRight: 8, marginHorizontal: 0}}
                onBtnPress={() => handlePressCancelReject(index, item)}
              />
              <ButtonView
                title={'VERIFY'}
                onBtnPress={() => handlePressSaveApprove(index, item)}
              />
            </View>
          )}
      </View>
    );
  };

  const unsoldReturnView = () => {
    return (
      <View>
        <FlatList
          // horizontal={true}
          data={recordsArr}
          style={{marginHorizontal: 12, marginTop: 6}}
          renderItem={({item, index}) =>
            unsoldReturnRenderItemView(item, index)
          }
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                margin: 16,
              }}>
              <Image source={images.return} style={{width: 55, height: 55}} />
              <Text
                style={{
                  color: COLORS.redPrimary,
                  fontSize: 18,
                  fontWeight: '600',
                  marginTop: 6,
                }}>
                Unsold/Return Approval
              </Text>
              <Text
                style={{color: COLORS.black, fontWeight: '500', marginTop: 6}}>
                {recordsArr.length > 0 && recordsArr[0].parcel_depot_name} -{' '}
                {route.params?.shipToCode}
              </Text>
              <Text
                style={{color: COLORS.black, fontWeight: '500', marginTop: 6}}>
                {route.params?.publicationDate}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return <View>{unsoldReturnView()}</View>;
}

// ???? unsold can't be greater then supply
