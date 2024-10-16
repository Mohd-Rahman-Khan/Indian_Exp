import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import images from '../../Image';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '../../api/auth';
import COLORS from '../../GlobalConstants/COLORS';
import AppLoader from '../../Helper/AppIndicator';
import moment from 'moment';
import EditPrintOrder from './EditPrintOrder';
import {ButtonView} from '../../Helper/buttonView';
import RemarkPopup from '../CollectionList/RemarkPopup';
import Header from '../../comonent/Header/Header';
import EditButton from './EditButton';
import CheckBox from 'react-native-check-box';
import CustomDropdown from '../../comonent/CustomDropdown';

export default function PrintOrderList({route, navigation}) {
  const [printOrderList, setprintOrderList] = useState([]);
  const [regionWiseParcelList, setregionWiseParcelList] = useState([]);
  const [regionWiseDepotList, setregionWiseDepotList] = useState([]);
  const [depotSelect, setdepotSelect] = useState(true);
  const [parcelSelect, setparcelSelect] = useState(false);
  const [editOrderDetail, seteditOrderDetail] = useState('');
  const [loading, setloading] = useState(false);
  const [editPrintOrder, seteditPrintOrder] = useState(false);
  const [remark, setremark] = useState('');
  const [showRemarkPopup, setshowRemarkPopup] = useState(false);
  const [clickItemData, setclickItemData] = useState('');
  const [userDetail, setuserDetail] = useState('');
  const isFocused = useIsFocused();
  const [depotItem, setDepotItem] = useState({});

  useEffect(() => {
    if (isFocused) {
      getRigion();
      getUserDetail();
    }
  }, [isFocused]);

  const getUserDetail = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    setuserDetail(userData);
    if (
      userData?.role == 'Depot Salesman' ||
      userData?.role == 'Parcel Vendor'
    ) {
      getprintOrderList();
    }
  };

  const getRigion = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.getRigionList(userId, token);
    console.log('getRigionList_____', response);

    if (response?.status != 200) {
      //alert(response?.problem);
    } else {
      if (response?.data?.data?.length > 0) {
        let findRegionId = response?.data?.data?.map(item => {
          return item?.id;
        });

        //console.log('getRigionList_____', findRegionId);

        getRigionsDepotList(findRegionId);
        getRigionsParcelList(findRegionId);
      } else {
        Alert.alert(
          'Oops!',
          'Region list not found.',
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
      }
    }
  };

  const getRigionsDepotList = async region => {
    let sendingData = {
      regions: region,
      type: 'depot',
    };
    const token = await AsyncStorage.getItem('InExToken');
    //const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.regionWiseParcelAndDepot(sendingData, token);
    console.log('getRigionsDepotList', response);
    if (response?.status != 200) {
      Alert.alert(
        'Oops!',
        response?.problem,
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    } else {
      setregionWiseDepotList(response?.data);
    }
  };
  const getRigionsParcelList = async region => {
    let sendingData = {
      regions: region,
      //regions: [1],
      type: 'parcel',
    };
    const token = await AsyncStorage.getItem('InExToken');
    //const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.regionWiseParcelAndDepot(sendingData, token);
    console.log('getRigionsParcelList', response);
    if (response?.status != 200) {
      Alert.alert(
        'Oops!',
        response?.problem,
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    } else {
      setregionWiseParcelList(response?.data);
    }
  };

  const getprintOrderList = async selectedDepoItem => {
    setloading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    const userId = await AsyncStorage.getItem('InExUserId');

    //setuserDetail(userData);

    let sendingData;

    if (
      userData?.role == 'Depot Salesman' ||
      userData?.role == 'Parcel Vendor'
    ) {
      sendingData = {
        user_id: userId,
        depot_or_parcel_id: null,
      };
    } else {
      sendingData = {
        user_id: userId,
        depot_or_parcel_id: selectedDepoItem?.id,
      };
    }

    console.log('getprintOrderList', sendingData);
    const response = await auth.getPrintOrder(sendingData, token);
    console.log('getprintOrderList', response);
    setloading(false);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      setprintOrderList(response.data?.data);
    } else {
      Alert.alert(
        'Oops',
        response.data?.message ? response.data?.message : response?.problem,
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    }
  };

  const verifyRejectRequest = async (status, print_order_id) => {
    setloading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    let sendingData = {
      print_order_id: print_order_id,
      status: status,
      user_id: userData?.id,
      remark: remark ? remark : null,
    };
    const response = await auth.verifyRejectPrintOrder(sendingData, token);
    console.log('verifyRejectRequest', sendingData);
    setloading(false);

    if (response?.data?.code == 200 || response?.data?.code == 201) {
      getprintOrderList(depotItem);
      Alert.alert(
        'Success',
        response?.data?.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Login Error!',
        response?.data?.message ? response?.data?.message : response?.problem,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  const editIconClick = (item, value) => {
    let newArr = printOrderList.map(rederItem => {
      if (rederItem?.print_order_id == item?.print_order_id) {
        rederItem.editable = value;
        return {...rederItem};
      } else {
        //rederItem.editable = false;
        return {...rederItem};
      }
    });
    setprintOrderList(newArr);
  };

  const updatePrintOrder = async item => {
    setloading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userDetails = JSON.parse(userData1);
    let findEditPrintData = printOrderList.find(
      itemData => itemData?.id == editOrderDetail?.id,
    );

    let status = 'PENDING';
    if (
      userDetails?.role === 'Depot Salesman' ||
      userDetails?.role === 'Parcel Vendor'
    ) {
      status = 'PENDING';
    } else if (userDetails?.role === 'Circulation Executive') {
      status = 'VERIFIED';
    } else if (userDetails?.role === 'Regional Manager') {
      status = 'APPROVED';
    } else {
      status = 'PENDING';
    }

    let sendingData = {
      user_id: userId,
      // print_order_id: findEditPrintData?.print_order_id,
      print_order_id: item?.print_order_id,
      status: status,
      // publications: findEditPrintData?.publications,
      publications: item?.publications,
    };
    console.log('findEditPrintData', sendingData);
    const response = await auth.updatePrintOrder(sendingData, token);
    console.log('verifyRejectRequest', response);
    setloading(false);

    if (response?.data?.code == 200 || response?.data?.code == 201) {
      setTimeout(() => {
        getprintOrderList(depotItem);
      }, 1000);
      Alert.alert(
        'Success',
        response?.data?.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Login Error!',
        response?.data?.message ? response?.data?.message : response?.problem,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  const onChangeTextValue = (text, listItem) => {
    if (text == '') {
      let findEditableItem = printOrderList.find(
        editItem => editItem?.editable,
      );

      let newArr = findEditableItem?.publications.map(rederItem => {
        if (rederItem?.id == listItem?.id) {
          rederItem.updated_value = 0;
          rederItem.difference = rederItem.updated_value - rederItem?.trade;
          return {...rederItem};
        } else {
          return rederItem;
        }
      });

      let updatePrintOrderList = printOrderList.map(pItem => {
        if (pItem?.print_order_id == newArr?.print_order_id) {
          return {...newArr};
        } else {
          return {...pItem};
        }
      });

      setprintOrderList(updatePrintOrderList);
    } else {
      let findEditableItem = printOrderList.find(
        editItem => editItem?.editable,
      );

      let newArr = findEditableItem?.publications.map(rederItem => {
        if (rederItem?.id == listItem?.id) {
          let newValue = parseInt(text);
          rederItem.updated_value = newValue;
          rederItem.difference = rederItem.updated_value - rederItem?.trade;
          return {...rederItem};
        } else {
          return rederItem;
        }
      });

      let updatePrintOrderList = printOrderList.map(pItem => {
        if (pItem?.print_order_id == newArr?.print_order_id) {
          return {...newArr};
        } else {
          return {...pItem};
        }
      });

      setprintOrderList(updatePrintOrderList);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.listItemContainer}>
        {item?.date_type == 'weekend' ? (
          <View
            style={{
              height: 46,
              width: '100%',
              backgroundColor: 'lightgrey',
              paddingHorizontal: 16,
              justifyContent: 'center',
            }}>
            <Text style={{color: COLORS.black, fontSize: 16}}>
              PO Revision Date: {item?.to_show_formatted_from_date}
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{
                height: 46,
                width: '100%',
                backgroundColor: 'lightgrey',
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}>
              <Text style={{color: COLORS.black, fontSize: 16}}>
                From Date: {item?.to_show_formatted_from_date}
              </Text>
            </View>
            <View
              style={{
                height: 46,
                width: '100%',
                backgroundColor: 'lightgrey',
                paddingHorizontal: 16,
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: COLORS.black, fontSize: 16}}>
                To Date: {item?.to_show_formatted_to_date}
              </Text>
            </View>
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{width: '65%'}}>
            <Text
              style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
              {item?.name}
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color:
                    item?.status == 'VERIFIED' ||
                    item?.status == 'APPROVED' ||
                    item?.status == 'FINALAPPROVED'
                      ? 'green'
                      : item?.status == 'REJECTED'
                        ? 'red'
                        : COLORS.black,
                  //marginRight: 10,
                }}>
                {item?.status}
              </Text>

              {(userDetail?.role === 'Depot Salesman' ||
                userDetail?.role === 'Parcel Vendor') &&
              (item?.status == 'REJECTED' || item?.status == 'PENDING') ? (
                <EditButton
                  item={item}
                  onPress={() => {
                    editIconClick(item, !item?.editable);
                    seteditOrderDetail(item);
                  }}
                />
              ) : userDetail?.role === 'Circulation Executive' &&
                item?.status == 'PENDING' ? (
                <EditButton
                  item={item}
                  onPress={() => {
                    editIconClick(item, !item?.editable);
                    seteditOrderDetail(item);
                  }}
                />
              ) : userDetail?.role === 'Regional Manager' &&
                (item?.status == 'PENDING' || item?.status == 'VERIFIED') ? (
                <EditButton
                  item={item}
                  onPress={() => {
                    editIconClick(item, !item?.editable);
                    seteditOrderDetail(item);
                  }}
                />
              ) : null}
            </View>
          </View>
        </View>

        {item?.editable ? (
          <>
            {item?.publications?.map(listItem => {
              console.log('listItem', listItem);
              return (
                <View
                  key={listItem?.id}
                  style={[
                    {
                      flexDirection: 'column',
                      marginTop: 10,
                      //marginHorizontal: 10,
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderTopWidth: 1,
                      borderTopColor: COLORS.lightGreyBorder,
                    },
                  ]}>
                  <View>
                    <Text
                      numberOfLines={2}
                      style={{fontSize: 18, fontWeight: 'bold'}}>
                      {listItem?.trade_name}
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
                      <Text>{listItem?.trade}</Text>
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
                      <View style={{width: '12%'}}>
                        <TouchableOpacity
                          onPress={() => {
                            let findEditableItem = printOrderList.find(
                              editItem => editItem?.editable,
                            );

                            //sif (listItem?.trade > 0) {
                            let newArr = findEditableItem?.publications.map(
                              rederItem => {
                                if (rederItem?.id == listItem?.id) {
                                  console.log('findEditableItem', rederItem);
                                  rederItem.updated_value =
                                    rederItem?.updated_value - 1;
                                  rederItem.difference =
                                    rederItem.updated_value - rederItem?.trade;
                                  return {...rederItem};
                                } else {
                                  return rederItem;
                                }
                              },
                            );

                            // console.log('findEditableItem', newArr);
                            let updatePrintOrderList = printOrderList.map(
                              pItem => {
                                if (
                                  pItem?.print_order_id ==
                                  newArr?.print_order_id
                                ) {
                                  return {...newArr};
                                } else {
                                  return {...pItem};
                                }
                              },
                            );
                            // console.log(
                            //   'updatePrintOrderList',
                            //   updatePrintOrderList,
                            // );
                            setprintOrderList(updatePrintOrderList);
                            //}
                          }}
                          style={styles.iconButtonContainer}>
                          <Image
                            style={styles.iconStyle}
                            source={images.minusIcon}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{width: '46%'}}>
                        <TextInput
                          style={styles.textInputStyle}
                          value={listItem?.updated_value.toString()}
                          //value={listItem?.updated_value}
                          keyboardType={'numeric' || 'number-pad'}
                          onChangeText={text =>
                            onChangeTextValue(text, listItem)
                          }
                        />
                      </View>
                      <View style={{width: '12%'}}>
                        <TouchableOpacity
                          onPress={() => {
                            let findEditableItem = printOrderList.find(
                              editItem => editItem?.editable,
                            );

                            if (listItem?.trade >= 0) {
                              let newArr = findEditableItem?.publications.map(
                                rederItem => {
                                  if (rederItem?.id == listItem?.id) {
                                    console.log('findEditableItem', rederItem);
                                    rederItem.updated_value =
                                      rederItem?.updated_value + 1;
                                    rederItem.difference =
                                      rederItem.updated_value -
                                      rederItem?.trade;
                                    return {...rederItem};
                                  } else {
                                    return rederItem;
                                  }
                                },
                              );

                              // console.log('findEditableItem', newArr);
                              let updatePrintOrderList = printOrderList.map(
                                pItem => {
                                  if (
                                    pItem?.print_order_id ==
                                    newArr?.print_order_id
                                  ) {
                                    return {...newArr};
                                  } else {
                                    return {...pItem};
                                  }
                                },
                              );
                              // console.log(
                              //   'updatePrintOrderList',
                              //   updatePrintOrderList,
                              // );
                              setprintOrderList(updatePrintOrderList);
                            }
                          }}
                          style={styles.iconButtonContainer}>
                          <Image
                            style={styles.iconStyle}
                            source={images.plusIcon}
                          />
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
                            color:
                              listItem.updated_value - listItem?.trade < 0
                                ? 'red'
                                : 'green',
                            fontWeight: 'bold',
                            fontSize: 10,
                            textAlign: 'center',
                          }}>
                          {/* {item?.difference <= 0
                  ? item?.difference
                  : '+' + item?.difference} */}

                          {listItem?.difference}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        ) : (
          <View style={styles.listItemBoxContainer}>
            {item?.publications?.map(listItem => {
              return (
                <View style={styles.supplyContainer} key={listItem?.id}>
                  <View style={{width: '50%'}}>
                    <Text numberOfLines={2}>{listItem?.trade_name}</Text>
                  </View>

                  <View
                    style={{
                      width: '48%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.disableTextStyle}>
                      {listItem?.updated_value || listItem?.updated_value == 0
                        ? listItem?.updated_value
                        : '- -'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        {item?.status == 'REJECTED' && item?.remark ? (
          <Text style={styles.listItemText}>{'Reason : ' + item?.remark}</Text>
        ) : null}

        {item?.editable ? (
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: '60%'}}>
              <ButtonView
                title={'Update'}
                onBtnPress={() => updatePrintOrder(item)}
              />
            </View>
          </View>
        ) : userDetail?.role === 'Depot Salesman' ||
          userDetail?.role === 'Parcel Vendor' ? null : userDetail?.role ===
            'Circulation Executive' && item?.status == 'PENDING' ? (
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            <ButtonView
              title={'REJECT'}
              isPrimary={false}
              textStyle={{color: COLORS.redPrimary}}
              btnStyle={{marginRight: 8, marginHorizontal: 0}}
              onBtnPress={() => {
                setclickItemData(item);
                setshowRemarkPopup(true);
                setremark('');
              }}
            />
            <ButtonView
              title={'Verify'}
              onBtnPress={() =>
                verifyRejectRequest('VERIFIED', item?.print_order_id)
              }
            />
          </View>
        ) : userDetail?.role === 'Regional Manager' &&
          (item?.status == 'PENDING' || item?.status == 'VERIFIED') ? (
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            <ButtonView
              title={'REJECT'}
              isPrimary={false}
              textStyle={{color: COLORS.redPrimary}}
              btnStyle={{marginRight: 8, marginHorizontal: 0}}
              onBtnPress={() => {
                setclickItemData(item);
                setshowRemarkPopup(true);
                setremark('');
              }}
            />
            <ButtonView
              title={'Approve'}
              onBtnPress={() =>
                verifyRejectRequest('APPROVED', item?.print_order_id)
              }
            />
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Print Order List'}
        onPress={() => {
          if (
            userDetail?.role == 'Circulation Executive' ||
            userDetail?.role == 'Regional Manager'
          ) {
            navigation.navigate('PrintOrderDashboard');
          } else {
            navigation.navigate('SelectionOfPrintOrder');
          }
        }}
      />
      <AppLoader visible={loading} />
      {showRemarkPopup ? (
        <RemarkPopup
          showModal={showRemarkPopup}
          onClose={() => {
            setshowRemarkPopup(false);
          }}
          onChangeText={text => {
            setremark(text);
          }}
          value={remark}
          onPress={() => {
            setshowRemarkPopup(false);
            setTimeout(() => {
              verifyRejectRequest('REJECTED', clickItemData?.print_order_id);
            }, 1000);
          }}
        />
      ) : null}
      {editPrintOrder ? (
        <EditPrintOrder
          editData={editOrderDetail?.no_of_supply}
          showModal={editPrintOrder}
          onClose={() => {
            seteditPrintOrder(false);
          }}
          sumitAction={val => {
            seteditPrintOrder(false);
            alert(val);
          }}
        />
      ) : null}

      {userDetail?.role == 'Parcel Vendor' ||
      userDetail?.role == 'Depot Salesman' ? null : (
        <>
          <View
            style={{
              flexDirection: 'row',
              height: 30,
              //backgroundColor: 'red',
              width: '100%',
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => {
                setdepotSelect(!depotSelect);
                setparcelSelect(false);
              }}
              isChecked={depotSelect}
              rightText={'Depot'}
              rightTextStyle={{color: COLORS.black}}
            />
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => {
                setparcelSelect(!parcelSelect);
                setdepotSelect(false);
              }}
              isChecked={parcelSelect}
              rightText={'Parcel'}
              rightTextStyle={{color: COLORS.black}}
            />
          </View>

          <View
            style={{
              width: '100%',
              marginTop: 10,
              paddingHorizontal: 20,
            }}>
            {depotSelect ? (
              <CustomDropdown
                headerTitle="Select Depot"
                placeholder="Please select depot"
                data={regionWiseDepotList}
                selectedItem={depotItem?.name}
                itemHandler={item => {
                  console.log('itemHandler', item);
                  setDepotItem(item);
                  getprintOrderList(item);
                }}
                search={true}
              />
            ) : parcelSelect ? (
              <CustomDropdown
                headerTitle="Select Parcel"
                placeholder="Please select parcel"
                data={regionWiseParcelList}
                selectedItem={depotItem?.name}
                itemHandler={item => {
                  setDepotItem(item);
                  getprintOrderList(item);
                }}
                search={true}
              />
            ) : null}
          </View>
        </>
      )}

      {printOrderList?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={printOrderList}
          renderItem={item => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          style={{marginHorizontal: 20}}
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>List is empty</Text>
        </View>
      )}

      {userDetail?.role == 'Depot Salesman' ||
      userDetail?.role == 'Parcel Vendor' ? (
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PrintOrder');
              }}
              style={styles.addIconContainer}>
              <Image style={styles.plusIcon} source={images.plusIcon} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}
