import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import Dashboard from './Dashboard';
import styles from './styles';
import CalenderComp from '../../comonent/CalenderComp';
import moment from 'moment';
import images from '../../Image/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VendorDashboard from './VendorDashboard';
import auth from '../../api/auth';
import Header from '../../comonent/Header/Header';
import AppIndicator from '../../Helper/AppIndicator';
import {useIsFocused} from '@react-navigation/native';
const TODAY_DATE = moment().format('YYYY-MM-DD');

export default function CollectionDashboard({route, navigation}) {
  const [showCalender, setshowCalender] = useState(false);
  const [selectFromDate, setselectFromDate] = useState(false);
  const [userData, setUserData] = useState();
  const [fromDateToShow, setfromDateToShow] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );
  const [toDateToShow, settoDateToShow] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );
  const [vendorDashboardData, setvendorDashboardData] = useState('');
  const [collectionExeDashboardData, setcollectionExeDashboardData] = useState(
    [],
  );

  const [isLoading, setisLoading] = useState(false);
  const [selectedFromDate, setselectedFromDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedToDate, setselectedToDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserDetails();
    }
  }, [isFocused]);
  // const dashboardData = [
  //   {
  //     'Total Out Standing': {
  //       depot: '80000.00',
  //       parcel: '80000.00',
  //       total: '80000.00',
  //     },
  //   },
  //   {
  //     'Today Invoice': {
  //       depot: '80000.00',
  //       parcel: '80000.00',
  //       total: '80000.00',
  //     },
  //   },
  //   {
  //     'Payment Recieved': {
  //       depot: '80000.00',
  //       parcel: '80000.00',
  //       total: '80000.00',
  //     },
  //   },
  //   {
  //     'Accepted Coupon Count': {
  //       depot: '80000.00',
  //       parcel: '80000.00',
  //       total: '80000.00',
  //     },
  //   },
  //   {
  //     'Rejected Coupon Count': {
  //       depot: '80000.00',
  //       parcel: '80000.00',
  //       total: '80000.00',
  //     },
  //   },
  // ];

  const getDashboardDetail = async userData => {
    setisLoading(true);
    const userId = await AsyncStorage.getItem('InExUserId');
    const token = await AsyncStorage.getItem('InExToken');

    //console.log('userData_____', userData);

    if (
      userData?.role == 'Depot Salesman' ||
      userData?.role == 'Parcel Vendor'
    ) {
      let sendingData = {
        user_id: userId,
        bill_till_date: TODAY_DATE,
        show_weekly_bill: true,
      };
      const response = await auth.getDashboardDetail(sendingData, token);
      setisLoading(false);
      console.log('getVendorDashboardDetail', response);
      if (response?.status != 200) {
        if (response?.data?.message == 'Resource not found. ') {
          // Alert.alert(
          //   'Oops!',
          //   'Dashboard data not found.',
          //   [{text: 'OK', onPress: async () => {}}],
          //   {cancelable: false},
          // );
        } else {
          Alert.alert(
            'Oops!',
            response?.data?.message,
            [{text: 'OK', onPress: async () => {}}],
            {cancelable: false},
          );
        }
      } else {
        setvendorDashboardData(response.data?.data[0]);
        //setDepotItem(response.data?.data[0]);
      }
    } else {
      let url = `userId=${userId}&isForMobile=false&startDate=${selectedFromDate}&endDate=${selectedToDate}`;
      console.log('SubbmitDashData', url);
      const response = await auth.getDashboardDetailForCollectionExe(
        url,
        token,
      );
      setisLoading(false);
      console.log('getVendorDashboardDetail', response);
      if (response?.status != 200) {
        if (response?.data?.message == 'Resource not found. ') {
        } else {
          // Alert.alert(
          //   'Oops!',
          //   response?.data?.message,
          //   [{text: 'OK', onPress: async () => {}}],
          //   {cancelable: false},
          // );
        }
      } else {
        setcollectionExeDashboardData(response.data?.data);
        //setDepotItem(response.data?.data[0]);
      }
    }
  };

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    // console.log('CollectionResp', userData);
    setUserData(userData);
    getDashboardDetail(userData);
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title={'Collection Dashboard'}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <AppIndicator visible={isLoading} />
      {showCalender ? (
        <CalenderComp
          selectFromDate={selectFromDate}
          fromDate={selectedFromDate}
          closeModal={() => {
            setshowCalender(!showCalender);
            setselectFromDate(false);
          }}
          maxDate={moment(new Date()).format('YYYY-MM-DD')}
          setselectedDate={date => {
            let formateDate = moment(date).format('DD-MM-YYYY, dddd');
            setshowCalender(!showCalender);

            if (selectFromDate) {
              setselectedFromDate(date);
              setselectFromDate(false);
              setfromDateToShow(formateDate);
            } else {
              if (date < selectedFromDate) {
                Alert.alert(
                  'Oops',
                  'To date should be greater than from date.',
                  [{text: 'OK', onPress: async () => {}}],
                  {cancelable: false},
                );
              } else {
                setselectedToDate(date);
                setselectFromDate(false);
                settoDateToShow(formateDate);
              }

              // setselectedToDate(date);
              // setselectFromDate(false);
            }
          }}
        />
      ) : null}

      <View style={{paddingHorizontal: 10}}>
        {userData?.role == 'Depot Salesman' ||
        userData?.role == 'Parcel Vendor' ? (
          <View style={{marginTop: 20}}>
            <VendorDashboard data={vendorDashboardData} userData={userData} />
          </View>
        ) : (
          <>
            <View style={styles.filterContainer}>
              <View style={{width: '48%'}}>
                <Text
                  style={[
                    styles.filterDateText,
                    {fontSize: 16, fontWeight: 'bold'},
                  ]}>
                  From Date:{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setshowCalender(true);
                    setselectFromDate(true);
                  }}
                  style={styles.fromAndTODateCotaier}>
                  <Text style={styles.filterDateText}>{fromDateToShow}</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '48%'}}>
                <Text
                  style={[
                    styles.filterDateText,
                    {fontSize: 16, fontWeight: 'bold'},
                  ]}>
                  To Date:{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setshowCalender(true);
                    setselectFromDate(false);
                  }}
                  style={styles.fromAndTODateCotaier}>
                  <Text style={styles.filterDateText}>{toDateToShow}</Text>
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity
                onPress={() => {
                  setshowCalender(true);
                  setselectFromDate(false);
                }}
                style={styles.fromAndTODateCotaier}>
                <Text style={styles.filterDateText}>To Date: </Text>
                <Text style={styles.filterDateText}>{toDateToShow}</Text>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{width: '60%'}}
                onPress={() => {
                  // console.log('SubbmitDashData', selectedFromDate);
                  // console.log('SubbmitDashData', selectedToDate);
                  getDashboardDetail(userData);
                }}>
                <View style={[styles.canclebtn]}>
                  <Text style={styles.canclebtntext}>SUBMIT</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Dashboard data={collectionExeDashboardData} />
          </>
        )}
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            if (
              userData?.role == 'Regional Manager' ||
              userData?.role == 'City Head'
            ) {
              navigation.navigate('CollectionApprovalDashboard', {
                roleBasedGrid: 2,
              });
            } else {
              navigation.navigate('CollectionList');
            }
          }}
          style={styles.addIconContainer}>
          <Image style={styles.plusIcon} source={images.file} />
        </TouchableOpacity>

        {userData?.role == 'Regional Manager' ||
        userData?.role == 'City Head' ? null : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Collection');
            }}
            style={styles.addIconContainer}>
            <Image style={styles.plusIcon} source={images.plusIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
