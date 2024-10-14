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

export default function PrintOrderList({route, navigation}) {
  const [printOrderList, setprintOrderList] = useState([
    {
      print_order_id: 37,
      status: 'REJECTED',
      name: 'Thane-Tembi Naka Depot',
      date_type: 'weekday',
      from_date: '2024-09-23',
      to_date: '2024-09-23',
      is_editable: false,
      publications: [
        {
          id: 1,
          trade_name: 'Indian Express',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
        {
          id: 3,
          trade_name: 'Financial Express',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
        {
          id: 2,
          trade_name: 'Loksatta',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
        {
          id: 4,
          trade_name: 'Lokprabha',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
        {
          id: 5,
          trade_name: 'Jansatta',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
      ],
    },
    {
      print_order_id: 38,
      status: 'PENDING',
      name: 'Thane-Tembi Naka Depot',
      date_type: 'weekday',
      from_date: '2024-09-23',
      to_date: '2024-09-23',
      is_editable: false,
      publications: [
        {
          id: 1,
          trade_name: 'Indian Express',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
        {
          id: 3,
          trade_name: 'Financial Express',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
        {
          id: 2,
          trade_name: 'Loksatta',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
        {
          id: 4,
          trade_name: 'Lokprabha',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
        {
          id: 5,
          trade_name: 'Jansatta',
          trade: 4424,
          updatedValue: 4450,
          difference: +26,
        },
      ],
    },
    ,
  ]);
  const [editOrderDetail, seteditOrderDetail] = useState('');
  const [loading, setloading] = useState(true);
  const [editPrintOrder, seteditPrintOrder] = useState(false);
  const [remark, setremark] = useState('');
  const [showRemarkPopup, setshowRemarkPopup] = useState(false);
  const [clickItemData, setclickItemData] = useState('');
  const [userDetail, setuserDetail] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getprintOrderList();
    }
  }, [isFocused]);

  const getprintOrderList = async () => {
    setloading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    setuserDetail(userData);
    const response = await auth.getPrintOrder(userData?.loginId, token);
    console.log('getprintOrderList', response);
    setloading(false);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      //setprintOrderList(response.data?.data);
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
      login_id: userData?.loginId,
      remarks: remark ? remark : null,
    };
    const response = await auth.verifyRejectPrintOrder(sendingData, token);
    console.log('verifyRejectRequest', sendingData);

    if (response?.status?.code == 200 || response?.status?.code == 201) {
      getprintOrderList();
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

  const updatePrintOrder = () => {
    let findEditPrintData = printOrderList.find(
      itemData => itemData?.id == editOrderDetail?.id,
    );
    console.log('findEditPrintData', findEditPrintData);
  };

  const onChangeTextValue = (text, item, listItem) => {
    if (text == '') {
      let newArr = item?.publications.map(rederItem => {
        if (rederItem?.id == listItem?.id) {
          rederItem.trade = 0;
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
      let newArr = item?.publications.map(rederItem => {
        if (rederItem?.id == listItem?.id) {
          let newValue = parseInt(text);
          rederItem.trade = newValue;
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

    let findEditableItem = printOrderList.find(editItem => editItem?.editable);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.listItemContainer}>
        <View
          style={{
            height: 46,
            width: '100%',
            backgroundColor: 'lightgrey',
            paddingHorizontal: 16,
            justifyContent: 'center',
          }}>
          <Text style={{color: COLORS.black, fontSize: 16}}>
            From Date: {item?.from_date}
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
            To Date: {item?.to_date}
          </Text>
        </View>
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
                  fontSize: 14,
                  fontWeight: 'bold',
                  color:
                    item?.status == 'VERIFIED' || item?.status == 'APPROVED'
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
              item?.status == 'REJECTED' ? (
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

        <View style={styles.listItemBoxContainer}>
          {item?.publications?.map(listItem => {
            return (
              <View style={styles.supplyContainer} key={listItem?.id}>
                <View style={{width: '50%'}}>
                  <Text numberOfLines={2}>{listItem?.trade_name}</Text>
                </View>

                {item?.editable ? (
                  <View style={styles.newSupplyContainer}>
                    <View style={styles.bottonGroupCotainer}>
                      <View style={styles.plusMinusBottonBox}>
                        <TouchableOpacity
                          onPress={() => {
                            let findEditableItem = printOrderList.find(
                              editItem => editItem?.editable,
                            );

                            if (listItem?.trade > 0) {
                              let newArr = findEditableItem?.publications.map(
                                rederItem => {
                                  if (rederItem?.id == listItem?.id) {
                                    rederItem.trade = rederItem?.trade - 1;
                                    return {...rederItem};
                                  } else {
                                    return rederItem;
                                  }
                                },
                              );
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

                              setprintOrderList(updatePrintOrderList);
                            }
                          }}
                          style={styles.iconButtonContainer}>
                          <Image
                            style={styles.iconStyle}
                            source={images.minusIcon}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={{width: '55%'}}>
                        <TextInput
                          style={styles.textInputStyle}
                          value={
                            listItem?.trade || listItem?.trade == 0
                              ? listItem?.trade.toString()
                              : '- -'
                          }
                          //value={listItem?.trade}
                          keyboardType={'numeric' || 'number-pad'}
                          onChangeText={text =>
                            onChangeTextValue(text, item, listItem)
                          }
                        />
                      </View>
                      <View style={styles.plusMinusBottonBox}>
                        <TouchableOpacity
                          onPress={() => {
                            let findEditableItem = printOrderList.find(
                              editItem => editItem?.editable,
                            );

                            if (listItem?.trade >= 0) {
                              let newArr = findEditableItem?.publications.map(
                                rederItem => {
                                  if (rederItem?.id == listItem?.id) {
                                    rederItem.trade = rederItem?.trade + 1;
                                    return {...rederItem};
                                  } else {
                                    return rederItem;
                                  }
                                },
                              );
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
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      width: '48%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.disableTextStyle}>
                      {listItem?.trade || listItem?.trade == 0
                        ? listItem?.trade
                        : '- -'}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        {item?.status == 'REJECTED' && item?.remarks ? (
          <Text style={styles.listItemText}>{'Reason : ' + item?.remarks}</Text>
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
                onBtnPress={() => updatePrintOrder()}
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
          navigation.navigate('PrintOrderDashboard');
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

      {printOrderList.length > 0 ? (
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

      {/* <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PrintOrder');
            }}
            style={styles.addIconContainer}>
            <Image style={styles.plusIcon} source={images.plusIcon} />
          </TouchableOpacity>
        </View> */}
    </View>
  );
}
