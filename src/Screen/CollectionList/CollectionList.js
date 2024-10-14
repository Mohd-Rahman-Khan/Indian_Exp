import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  DatePickerIOS,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
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
import {ButtonView} from '../../Helper/buttonView';
import Dashboard from './Dashboard';
import CalenderComp from '../../comonent/CalenderComp';
import RemarkPopup from './RemarkPopup';
import Header from '../../comonent/Header/Header';
import RNFetchBlob from 'rn-fetch-blob';

export default function CollectionList({route, navigation}) {
  const [collectionList, setcollectionList] = useState([]);
  const [loading, setloading] = useState(true);
  const [userData, setUserData] = useState();
  const [showCalender, setshowCalender] = useState(false);
  const [selectFromDate, setselectFromDate] = useState(false);
  const [remark, setremark] = useState('');
  const [selectedFromDate, setselectedFromDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedToDate, setselectedToDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [showRemarkPopup, setshowRemarkPopup] = useState(false);

  const [clickItemData, setclickItemData] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserDetails();
    }
  }, [isFocused]);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    getCollectionList(userData?.role);
    console.log('CollectionResp', userData);
    setUserData(userData);
  };

  const getCollectionList = async role => {
    setloading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const TODAY_DATE = moment().format('YYYY-MM-DD');

    if (role == 'Depot Salesman' || role == 'Parcel Vendor') {
      const response = await auth.collectionListVendor(userId, token);
      console.log('getCollectionList', response);
      if (response?.status != 200 && response?.status != 404) {
        setloading(false);
        Alert.alert(
          'oops!',
          response?.problem,
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
      } else if (response?.status == 404) {
        setloading(false);
      } else {
        setloading(false);
        setcollectionList(response.data?.data);
      }
    } else {
      let sendingData = `isFilter=false&userId=${userId}&startDate=${TODAY_DATE}&endDate=${TODAY_DATE}`;

      const response = await auth.collectionList(sendingData, token, userId);

      console.log('getCollectionList', response);

      if (response?.status != 200 && response?.status != 404) {
        setloading(false);
        Alert.alert(
          'oops!',
          response?.problem,
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
      } else if (response?.status == 404) {
        setloading(false);
      } else {
        setloading(false);
        setcollectionList(response.data?.data);
      }
    }
  };

  const generateReceipt = async item => {
    const token = await AsyncStorage.getItem('InExToken');
    const response = await auth.generateReceipt(item?.collection_id, token);
    //console.log('generateReceipt', response);
    if (response?.data?.data) {
      if (response?.data?.code == 200 || response?.data?.code == 201) {
        // const fileUrl =
        //   'http://192.168.80.62:8080/print/download-file/img-file?fileurl=D:/pdfGenerate/receipt_20240912_141511.pdf';
        const fileUrl = auth.DOC_URL + response?.data?.data;

        if (Platform.OS === 'android') {
          // getDownloadPermissionAndroid().then(granted => {
          //   if (granted) {
          //     downloadFile(fileUrl);
          //   }
          // });

          Linking.openURL(fileUrl);
        } else {
          downloadFile(fileUrl).then(res => {
            RNFetchBlob.ios.previewDocument(res.path());
          });
        }
      } else {
        Alert.alert(
          'Oops!',
          response?.data?.message,
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
      }
    } else {
      Alert.alert(
        'Oops!',
        response?.problem,
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    }
  };
  const renderItem = ({item}) => {
    var getTimeInUTC = moment.utc(item?.created_at).format('HH:mm');
    console.log('getCollectionList', item?.created_at);

    return (
      <View key={item?.collection_id} style={styles.listItemContainer}>
        <Text style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
          {'Name : ' + item?.user_name}
        </Text>
        <View style={styles.listItemBoxContainer}>
          <View style={{width: '75%'}}>
            <Text style={styles.listItemText}>
              {'Amount : ' + item?.amount_collected}
            </Text>
            <Text style={styles.listItemText}>
              {'Payment Mode : ' + item?.payment_mode}
            </Text>
            <Text style={styles.listItemText}>
              {'Date : ' + moment(item?.created_at).format('YYYY-MM-DD')}
            </Text>
            {item?.created_at ? (
              <Text style={styles.listItemText}>
                {'Time : ' + getTimeInUTC}
              </Text>
            ) : null}

            {item?.payment_mode == 'cheque' ? (
              item?.cheque_payment_dto ? (
                <>
                  <Text style={styles.listItemText}>
                    {'Cheque number : ' + item?.cheque_payment_dto?.number}
                  </Text>
                  <Text style={styles.listItemText}>
                    {'Bank Name : ' + item?.cheque_payment_dto?.bank_name}
                  </Text>
                </>
              ) : null
            ) : null}
            {item?.payment_mode == 'online' ? (
              <>
                {item?.razorpay_payment_id ? (
                  <Text style={styles.listItemText}>
                    {'Transaction Id : ' + item?.razorpay_payment_id}
                  </Text>
                ) : null}

                {item?.razorpay_order_id ? (
                  <Text style={styles.listItemText}>
                    {'Order Id : ' + item?.razorpay_order_id}
                  </Text>
                ) : null}

                {/* <Text style={styles.listItemText}>
                  {'Signature : ' + item?.razorpay_signature}
                </Text> */}
              </>
            ) : null}
          </View>
          <View style={{width: '20%', alignItems: 'center'}}>
            <Text
              style={[
                styles.listItemStatusText,
                {
                  color:
                    item?.approval_status == '0'
                      ? 'grey'
                      : item?.approval_status == '1' ||
                          item?.approval_status == '3'
                        ? 'green'
                        : item?.approval_status == '2'
                          ? 'red'
                          : 'grey',
                },
              ]}>
              {item?.approval_status == '0'
                ? 'Pending'
                : item?.approval_status == '1'
                  ? 'Approved'
                  : item?.approval_status == '2'
                    ? 'Rejected'
                    : item?.approval_status == '3'
                      ? 'Verified'
                      : 'Pending'}
            </Text>

            {/* <TouchableOpacity
              onPress={() => {
                generateReceipt(item);
              }}>
              <Image
                source={images.pdfIcon}
                style={{height: 25, width: 25, marginTop: 5}}
              />
            </TouchableOpacity> */}
            {(userData?.role == 'Depot Salesman' ||
              userData?.role == 'Parcel Vendor') &&
            item?.approval_status == '1' ? (
              <TouchableOpacity
                onPress={() => {
                  generateReceipt(item);
                  // const fileUrl =
                  //   'http://192.168.60.65:8081/print/download-file/img-file?fileurl=D:/pdfGenerate/receipt_20240912_141511.pdf';

                  // if (Platform.OS === 'android') {
                  //   // getDownloadPermissionAndroid().then(granted => {
                  //   //   if (granted) {
                  //   //     downloadFile(fileUrl);
                  //   //   }
                  //   // });

                  //   Linking.openURL(fileUrl);
                  // } else {
                  //   downloadFile(fileUrl).then(res => {
                  //     RNFetchBlob.ios.previewDocument(res.path());
                  //   });
                  // }
                }}>
                <Image
                  source={images.pdfIcon}
                  style={{height: 25, width: 25, marginTop: 5}}
                />
              </TouchableOpacity>
            ) : null}

            {/* <TouchableOpacity
              style={{flex: 1, marginTop: 15}}
              onPress={() => {
                setIsEdit(true);
              }}>
              <Image
                source={images.editIcon}
                style={{width: 18, height: 18, alignSelf: 'center'}}
              />
            </TouchableOpacity> */}
          </View>
        </View>

        {item?.payment_mode == 'coupon' ? (
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

            {item?.coupon_payment_dtos?.length > 0
              ? item?.coupon_payment_dtos.map(couponData => {
                  return (
                    <View
                      key={couponData?.id}
                      style={{
                        marginHorizontal: 1,
                        borderTopColor: COLORS.black,
                        borderTopWidth: 0.4,
                      }}>
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
                          <Text style={styles.tableListDetailText}>
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

        {item?.approval_status == '2' && item?.remarks ? (
          <Text style={styles.listItemText}>{'Reason : ' + item?.remarks}</Text>
        ) : null}

        {item?.approval_status == '0' ? (
          userData?.role === 'Collection Executive' ||
          userData?.role === 'Circulation Executive' ? (
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
                onBtnPress={() =>
                  //verifyRejectRequest('_2', item?.collection_id)
                  {
                    setclickItemData(item);
                    setshowRemarkPopup(true);
                  }
                }
              />
              <ButtonView
                title={'Verify'}
                onBtnPress={() =>
                  verifyRejectRequest('_3', item?.collection_id)
                }
              />
            </View>
          ) : null
        ) : null}
      </View>
    );
  };

  const verifyRejectRequest = async (status, collection_id) => {
    setloading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    //const TODAY_DATE = moment().format('YYYY-MM-DD');
    let sendingData = {
      id: collection_id,
      module: 'collection',
      approval_status: status,
      user_id: userId,
      remarks: remark ? remark : null,
    };
    const response = await auth.verifyRejectPayment(sendingData, token);
    console.log('verifyRejectRequest', response);

    getCollectionList();
    if (response?.status != 200 && response?.status != 404) {
      Alert.alert(
        'Oops',
        'Something went wrong.',
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    } else if (response?.status == 404) {
      Alert.alert(
        'Oops',
        'Something went wrong.',
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    } else {
      if (response?.data?.code == 200 || response?.data?.code == 201) {
        let message =
          status == '_2'
            ? 'Payment Rejected Successfully'
            : 'Payment Verified Successfully';
        Alert.alert(
          'Success',
          message,
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
        getCollectionList();
      } else {
        Alert.alert(
          'Oops',
          response.data?.message,
          [{text: 'OK', onPress: async () => {}}],
          {cancelable: false},
        );
      }
    }
  };

  const getDownloadPermissionAndroid = async () => {
    if (Number(Platform.Version) >= 33) {
      return true;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
  };

  const downloadFile = async url => {
    // Get the app's cache directory
    const {config, fs} = RNFetchBlob;
    const cacheDir = fs.dirs.DownloadDir;

    // Generate a unique filename for the downloaded image
    const filename = url.split('/').pop();
    const imagePath = `${cacheDir}/${filename}`;

    try {
      // Download the file and save it to the cache directory
      const configOptions = Platform.select({
        ios: {
          fileCache: true,
          path: imagePath,
          appendExt: filename.split('.').pop(),
        },
        android: {
          fileCache: true,
          path: imagePath,
          appendExt: filename.split('.').pop(),
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path: imagePath,
            description: 'File',
          },
        },
      });

      const response = await RNFetchBlob.config(configOptions).fetch(
        'GET',
        url,
      );

      // Return the path to the downloaded file
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Collection List"
        onPress={() => {
          navigation.navigate('CollectionDashboard');
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
              verifyRejectRequest('_2', clickItemData?.collection_id);
            }, 1000);
          }}
        />
      ) : null}
      {showCalender ? (
        <CalenderComp
          selectFromDate={selectFromDate}
          fromDate={selectedFromDate}
          closeModal={() => {
            setshowCalender(!showCalender);
            setselectFromDate(false);
          }}
          minDate={moment(new Date()).format('YYYY-MM-DD')}
          setselectedDate={date => {
            //setSelectedDate(moment(date).format("DD-MM-YYYY"));
            setshowCalender(!showCalender);

            if (selectFromDate) {
              setselectedFromDate(date);
              setselectFromDate(false);
            } else {
              setselectedToDate(date);
              setselectFromDate(false);
            }
          }}
        />
      ) : null}

      {/* {userData?.role == 'Depot Salesman' ||
      userData?.role == 'Parcel Vendor' ? null : (
        <View>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              onPress={() => {
                setshowCalender(true);
                setselectFromDate(true);
              }}
              style={styles.fromAndTODateCotaier}>
              <Text style={styles.filterDateText}>From Date: </Text>
              <Text style={styles.filterDateText}>{selectedFromDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setshowCalender(true);
                setselectFromDate(false);
              }}
              style={styles.fromAndTODateCotaier}>
              <Text style={styles.filterDateText}>To Date: </Text>
              <Text style={styles.filterDateText}>{selectedToDate}</Text>
            </TouchableOpacity>
          </View>
          <Dashboard data={dashboardData} />
        </View>
      )} */}
      {collectionList?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={collectionList}
          renderItem={item => renderItem(item)}
          style={{marginTop: 15, marginHorizontal: 15}}
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>List is empty</Text>
        </View>
      )}

      {/* <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Collection');
            }}
            style={styles.addIconContainer}>
            <Image style={styles.plusIcon} source={images.plusIcon} />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}
