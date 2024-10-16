import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Dashboard from './Dashboard';
import styles from './styles';
import CalenderComp from '../../comonent/CalenderComp';
import moment from 'moment';
import images from '../../Image/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '../../api/auth';
import Header from '../../comonent/Header/Header';
import AppIndicator from '../../Helper/AppIndicator';
import {difference} from 'lodash';
import COLORS from '../../GlobalConstants/COLORS';
const TODAY_DATE = moment().format('YYYY-MM-DD');

export default function PrintOrderDashboard({route, navigation}) {
  const [showCalender, setshowCalender] = useState(false);
  const [selectFromDate, setselectFromDate] = useState(false);
  const [userData, setUserData] = useState();
  const [dashboardData, setdashboardData] = useState('');
  // const [collectionExeDashboardData, setcollectionExeDashboardData] = useState([

  //   {
  //     division: 'Indian Express',
  //     parcel_vendor_po_report_dto: {
  //       depot: 127,
  //       parcel: 129,
  //       difference: -2,
  //     },
  //   },
  //   {
  //     division: 'Financial Express',
  //     parcel_vendor_po_report_dto: {
  //       depot: 0,
  //       parcel: 0,
  //       difference: 0,
  //     },
  //   },
  //   {
  //     division: 'Loksatta',
  //     parcel_vendor_po_report_dto: {
  //       depot: 1976,
  //       parcel: 2041,
  //       difference: -65,
  //     },
  //   },
  //   {
  //     division: 'Lokprabha',
  //     parcel_vendor_po_report_dto: {
  //       depot: 40,
  //       parcel: 80,
  //       difference: -40,
  //     },
  //   },
  //   {
  //     division: 'Jansatta',
  //     parcel_vendor_po_report_dto: {
  //       depot: 6,
  //       parcel: 12,
  //       difference: -6,
  //     },
  //   },
  // ]);

  // let dataOfPO = [
  //   {
  //     'DIV 1': [
  //       {
  //         'Indian Express': 0,
  //       },
  //       {
  //         'Financial Express': 0,
  //       },
  //       {
  //         Loksatta: 0,
  //       },
  //       {
  //         Lokprabha: 0,
  //       },
  //       {
  //         Jansatta: 0,
  //       },
  //     ],
  //   },
  //   {
  //     'DIV 2': [
  //       {
  //         'Indian Express': 0,
  //       },
  //       {
  //         'Financial Express': 0,
  //       },
  //       {
  //         Loksatta: 0,
  //       },
  //       {
  //         Lokprabha: 0,
  //       },
  //       {
  //         Jansatta: 0,
  //       },
  //     ],
  //   },
  //   {
  //     'DIV 3': [
  //       {
  //         'Indian Express': 0,
  //       },
  //       {
  //         'Financial Express': 0,
  //       },
  //       {
  //         Loksatta: 0,
  //       },
  //       {
  //         Lokprabha: 0,
  //       },
  //       {
  //         Jansatta: 0,
  //       },
  //     ],
  //   },
  //   {
  //     'DIV 4': [
  //       {
  //         'Indian Express': 127,
  //       },
  //       {
  //         'Financial Express': 0,
  //       },
  //       {
  //         Loksatta: 1976,
  //       },
  //       {
  //         Lokprabha: 40,
  //       },
  //       {
  //         Jansatta: 6,
  //       },
  //     ],
  //   },
  // ];

  const [isLoading, setisLoading] = useState(false);
  const [selectedFromDate, setselectedFromDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedFromDateToShow, setselectedFromDateToShow] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );
  const [selectedToDateToShow, setselectedToDateToShow] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );
  const [selectedToDate, setselectedToDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  useEffect(() => {
    getUserDetails();
    getDashboardDetail();
  }, []);

  const getDashboardDetail = async getDate => {
    // console.log('getDashboardDetail', selectedFromDate);
    // console.log('getDashboardDetail', selectedToDate);
    let passDate = getDate ? getDate : moment(new Date()).format('YYYY-MM-DD');

    setisLoading(true);
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const parseUserData = JSON.parse(userData1);
    const userId = await AsyncStorage.getItem('InExUserId');
    const token = await AsyncStorage.getItem('InExToken');

    let url = `print/get-print-order-summary?id=${userId}&fromDate=${passDate}`;

    // if (parseUserData?.role == 'Regional Manager') {
    //   url = `print/get-print-order-report-for-regional-manager/${userId}?fromDate=${passDate}`;
    // } else if (parseUserData?.role == 'Circulation Executive') {
    //   url = `print/get-print-order-report-for-circulationExe/${userId}?fromDate=${passDate}`;
    // } else {
    // }
    console.log('getDashboardDetail', url);

    const response = await auth.getDashboardOfPrintOrder(url, token);
    setisLoading(false);
    console.log('getDashboardDetail', response);
    if (response?.data?.code == 200 || response?.data?.code == 201) {
      setdashboardData(response?.data?.data);
    } else {
      Alert.alert(
        'Oops',
        response?.data?.message ? response?.data?.message : response?.problem,
        [{text: 'OK', onPress: async () => {}}],
        {cancelable: false},
      );
    }
  };

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    // console.log('CollectionResp', userData);
    setUserData(userData);
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title={'Print Order Dashboard'}
        onPress={() => {
          navigation.navigate('SelectionOfPrintOrder');
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
            //setSelectedDate(moment(date).format("DD-MM-YYYY"));
            setshowCalender(!showCalender);

            if (selectFromDate) {
              setselectedFromDate(date);
              setselectFromDate(false);
              setselectedFromDateToShow(
                moment(date).format('DD-MM-YYYY, dddd'),
              );
              getDashboardDetail(date);
            } else {
              // setselectedToDate(date);
              // setselectFromDate(false);

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
                setselectedToDateToShow(
                  moment(date).format('DD-MM-YYYY, dddd'),
                );
              }
            }
          }}
        />
      ) : null}

      <View style={{paddingHorizontal: 10, flex: 1}}>
        <View style={styles.filterContainer}>
          <View style={{width: '100%', backgroundColor: 'white'}}>
            <Text
              style={[
                styles.filterDateText,
                {fontSize: 16, fontWeight: 'bold', paddingHorizontal: 5},
              ]}>
              Select Date{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setshowCalender(true);
                setselectFromDate(true);
              }}
              style={styles.fromAndTODateCotaier}>
              <Text style={styles.filterDateText}>
                {selectedFromDateToShow}
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{width: '48%'}}>
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
              <Text style={styles.filterDateText}>{selectedToDateToShow}</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {/* <View
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
              getDashboardDetail();
            }}>
            <View style={[styles.canclebtn]}>
              <Text style={styles.canclebtntext}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        {dashboardData?.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, marginBottom: 10, marginTop: 10}}>
            <Dashboard role={userData?.role} data={dashboardData} />
          </ScrollView>
        ) : (
          <View
            style={{
              borderColor: COLORS.black,
              borderWidth: 0.4,
              borderColor: 'black',
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 15,
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              Dashboard Data is empty.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PrintOrderList');
          }}
          style={styles.addIconContainer}>
          <Image style={styles.plusIcon} source={images.file} />
        </TouchableOpacity>

        {userData?.role == 'Depot Salesman' ||
        userData?.role == 'Parcel Vendor' ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PrintOrder');
            }}
            style={styles.addIconContainer}>
            <Image style={styles.plusIcon} source={images.plusIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PrintOrder');
            }}
            style={styles.addIconContainer}>
            <Image style={styles.plusIcon} source={images.plusIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
