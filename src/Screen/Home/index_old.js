import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  Pressable,
  Linking,
  // AppState
} from 'react-native';
import images from '../../Image';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import NavigationService from '../../Navigation/RootNavigator/NavigationService';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import auth from '../../api/auth';
import {connect} from 'react-redux';
import {checkInAction} from './action';
import Card from '../../comonent/Card';
import {apiKey} from '../../config';
import AppLoader from '../../Helper/AppIndicator';
//import {initPushHandler} from '../../PushNotification/NotificationConfig';
import {ScrollView} from 'react-native-gesture-handler';
import DepotDropdownPopup from '../../comonent/DepotDropdownPopup/DepotDropdownPopup';
import Dashboard from './Dashboard';
import {useIsFocused} from '@react-navigation/native';
// import Permissions, {
//   PERMISSIONS,
//   RESULTS,
//   check,
//   request,
// } from 'react-native-permissions';

const TODAY_DATE = moment().format('YYYY-MM-DD');

const Home = ({navigation, route}) => {
  let params = route.params;
  // AppState.addEventListener('blur',()=> {})
  const [userDetails, setUserDetails] = useState({});
  const [roleBasedGrid, setRoleBasedGrid] = useState();
  const [roleBasedName, setRoleBasedName] = useState('');
  const [checkInType, setcheckInType] = useState('');
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [depotItem, setDepotItem] = useState({});
  const [regionWiseParcelList, setregionWiseParcelList] = useState([]);
  const [regionWiseDepotList, setregionWiseDepotList] = useState([]);
  const [showDepotPopup, setshowDepotPopup] = useState(false);
  const [vendorDashboardData, setvendorDashboardData] = useState('');
  const [attendenceRadius, setattendenceRadius] = useState('');
  // const [checkIn, setCheckIn] = useState(
  //   moment().format('DD-MM-YYYY') === params?.date ? params?.checkInValue : '',
  // );
  const [checkIn, setCheckIn] = useState('');
  // const [checkOut, setCheckOut] = useState(
  //   moment().format('DD-MM-YYYY') === params?.date ? params?.checkOutValue : '',
  // );
  const [checkOut, setCheckOut] = useState('');
  const [checkType, setCheckType] = useState(1); // 1 --> checkin, 2 --> checkout
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserDetails();
      fetchUserAttandnce();
      getRigion();
    }
  }, [isFocused]);

  useEffect(() => {
    requestPermission();
  }, []);

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

  const requestPermission = async () => {
    if (Platform.OS == 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'India Express App Camera Permission',
          message:
            'India Express App needs access to your camera ' +
            'so you can scan coupons and take pictures',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
    }
  };

  // useEffect(() => {
  //   initPushHandler();
  // }, []);

  useEffect(() => {
    tabLabel();
  }, [userDetails]);

  useEffect(() => {
    disabledCheckIn();
    disabledCheckOut();
  }, [checkIn, checkOut]);

  const fetchUserAttandnce = async () => {
    //InExCheckIn
    setLoading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const InExCheckInData = await AsyncStorage.getItem('InExCheckIn');

    auth
      .getAttendance(userId, token)
      .then(response => {
        const list = response?.data?.data;
        const tempArr = list.filter(ele => ele?.user_id == userId); // filter particular user
        const attendanceList = tempArr.filter(
          ele =>
            moment(ele?.check_in_time_ist).format('YYYY-MM-DD') ==
            moment().format('YYYY-MM-DD'),
        ); // filter today date
        console.log('attendance resonce: ', attendanceList);
        setLoading(false);
        if (attendanceList && attendanceList.length > 0) {
          const tempData = attendanceList.pop();
          if (tempData?.check_in_time_ist) {
            setCheckIn(moment(tempData?.check_in_time_ist).format('HH:mm A'));

            let parseInExCheckInData = JSON.parse(InExCheckInData);
            console.log('parseInExCheckInData', parseInExCheckInData);
            setcheckInType(
              parseInExCheckInData?.checkInType
                ? parseInExCheckInData?.checkInType
                : '',
            );
          } else {
            setCheckIn('');
          }
          if (tempData?.check_out_time_ist) {
            setCheckOut(moment(tempData?.check_out_time_ist).format('HH:mm A'));
          } else {
            setCheckOut('');
          }
        } else {
          setCheckIn('');
          setCheckOut('');
        }
      })
      .catch(err => {
        setLoading(false);
        // alert('Something went wrong!');
      });
  };

  const getLocation = async (typeId, selectedItem = null) => {
    setLoading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    Geolocation.getCurrentPosition(
      position => {
        console.log('GeolocationAPi', position);
        console.log('GeolocationAPi', selectedItem);
        let userCurretLocationPonts = {
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        };
        // let officeLocationPoints = {
        //   lat: 28.605682177943663,
        //   lng: 77.3810211151428,
        // };
        let officeLocationPoints = {
          lat: selectedItem?.check_in_latitude,
          lng: selectedItem?.check_in_longitude,
        };

        var ky = 40000 / 360;
        var kx = Math.cos((Math.PI * officeLocationPoints.lat) / 180.0) * ky;
        var dx =
          Math.abs(officeLocationPoints.lng - userCurretLocationPonts.lng) * kx;
        var dy =
          Math.abs(officeLocationPoints.lat - userCurretLocationPonts.lat) * ky;

        let distanceInKM = Math.sqrt(dx * dx + dy * dy);
        let distanceInMeter = distanceInKM * 1000;

        let pos = position;
        let dt = '';
        const dataObj = {user_id: userId};
        if (typeId == 2) {
          // dataObj.check_out_latitude =
          //   response?.results[0]?.formatted_address;
          // dataObj.check_out_longitude =
          //   response?.results[0]?.formatted_address;
          dataObj.check_out_latitude = pos?.coords?.latitude; // removed and share the actual address
          dataObj.check_out_longitude = pos?.coords?.longitude;
          dataObj.address = null;
          dataObj.check_in_type = null;
          dataObj.depot_id = null;
          dt = moment(pos?.timestamp).format('HH:mm A');
          console.log('dataObj while checkout>', dataObj);
          auth
            .checkInCheckOut(dataObj, token)
            .then(response => {
              setLoading(false);
              fetchUserAttandnce();
              if (response?.status != 200) {
                //apiFailureAlert('outstandingAmountApi');
                Alert.alert('Error', response?.data?.message, [
                  {text: 'OK', onPress: () => {}},
                ]);
              } else {
                let date = moment().format('DD-MM-YYYY');
                setCheckOut(dt);

                if (typeId == 1) {
                  AsyncStorage.setItem(
                    'InExCheckIn',
                    JSON.stringify({date: date, checkInValue: dt}),
                  );
                } else {
                  AsyncStorage.setItem(
                    'InExCheckOut',
                    JSON.stringify({date: date, checkOutValue: dt}),
                  );
                }
              }
            })
            .catch(err => {
              setLoading(false);
              console.log('checkout api fails means lie in the catch block');
              alert('Something went wrong!');
            });
        } else {
          if (distanceInMeter > parseInt(attendenceRadius[0]?.radius)) {
            setLoading(false);
            Alert.alert(
              'Location Alert',
              'You are not in your designated address.',
              [{text: 'OK', onPress: () => {}}],
            );
          } else {
            dataObj.check_in_latitude = pos?.coords?.latitude;
            dataObj.check_in_longitude = pos?.coords?.longitude;
            dt = moment(pos?.timestamp).format('HH:mm A');

            const format = 'HH:mm:ss';
            let checkInType = '';

            var CurrentDate = moment().format(format);
            const time = moment(CurrentDate, format);
            const beforeTime = moment('00:00:00', format);
            const afterTime = moment('05:31:00', format);

            if (time.isBetween(beforeTime, afterTime)) {
              checkInType = 'Depot Visit';
            } else {
              checkInType = 'Field Visit';
            }

            dataObj.check_in_type = checkInType;
            dataObj.depot_id = selectedItem?.id;

            console.log('dataObj while checkin>', dataObj);

            auth
              .checkInCheckOut(dataObj, token)
              .then(response => {
                fetchUserAttandnce();
                setLoading(false);
                console.log('response while checkin: ', response);
                if (response?.status != 200) {
                  //apiFailureAlert('outstandingAmountApi');
                  Alert.alert('Error', response?.data?.message, [
                    {text: 'OK', onPress: () => {}},
                  ]);
                } else {
                  let date = moment().format('DD-MM-YYYY');
                  setCheckIn(dt);

                  if (typeId == 1) {
                    fetchUserAttandnce();
                    AsyncStorage.setItem(
                      'InExCheckIn',
                      JSON.stringify({
                        date: date,
                        checkInValue: dt,
                        checkInType: checkInType,
                      }),
                    );
                  } else {
                    AsyncStorage.setItem(
                      'InExCheckOut',
                      JSON.stringify({date: date, checkOutValue: dt}),
                    );
                  }
                }
              })
              .catch(err => {
                console.log('Api Err', err);
                setLoading(false);
                //alert('Something went wrong!  ');
              });
          }
        }
      },
      error => {
        console.log('GeolocationAPi', error);
        setLoading(false);
        Alert.alert('Location Alert', error?.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
      {enableHighAccuracy: true, timeout: 60000},
    );
  };

  const checkLocationPermission = async (typeId, selectedItem = null) => {
    //alert('ok');
    // if (Platform.OS == 'android') {
    //   setIsPermissionGranted(true);
    //   return;
    // }
    // if (Platform.OS === 'ios') {
    //   setIsPermissionGranted(true);
    //   return;
    // }
    try {
      if (Platform.OS == 'android') {
        const hasLocationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        // const hasLocationPermission = await PermissionsAndroid.request(
        //   PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        // );
        console.log('hasLocationPermission: ', hasLocationPermission);
        if (hasLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('success');
          getLocation(typeId, selectedItem);
          setIsPermissionGranted(true);
        } else if (
          hasLocationPermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          console.log('fail');
          setIsPermissionGranted(false);
          // alert(
          //   'Please provide location permission from app settings in order to check-in/check-out.',
          // );

          Alert.alert(
            'Location Alert',
            'Please provide location permission from app settings in order to check-in/check-out.',
            [
              {
                text: 'OK',
                onPress: () => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL('app-settings:');
                  } else {
                    Linking.openSettings();
                  }
                },
              },
            ],
          );
        } else {
          setIsPermissionGranted(false);
        }
      } else {
        console.log('success');
        getLocation(typeId, selectedItem);
        setIsPermissionGranted(true);
      }
    } catch (err) {
      console.log('Err =>', err);
    }
  };

  const logOutApiCall = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    const response = await auth.logoutApi(userData?.loginId, token);

    console.log('logOutApiCall', response);

    if (response?.data?.code == 200 || response?.data?.code == 201) {
      await AsyncStorage.removeItem('InExToken');
      await AsyncStorage.removeItem('InExUserId');
      await AsyncStorage.removeItem('InExUserDetails');
      NavigationService.reset(navigation, 'Login');
    } else {
      await AsyncStorage.removeItem('InExToken');
      await AsyncStorage.removeItem('InExUserId');
      await AsyncStorage.removeItem('InExUserDetails');
      NavigationService.reset(navigation, 'Login');
      Alert.alert(
        'Alert!',
        response?.data?.message ? response?.data?.message : response?.problem,
        [
          {
            text: 'Ok',
            onPress: async () => {},
          },
        ],
        {cancelable: true},
      );
    }
  };

  const logoutAction = () => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to Log out?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            //logOutApiCall();

            await AsyncStorage.removeItem('InExToken');
            await AsyncStorage.removeItem('InExUserId');
            await AsyncStorage.removeItem('InExUserDetails');
            NavigationService.reset(navigation, 'Login');
          },
        },
        {text: 'No', onPress: () => {}},
      ],
      {cancelable: true},
    );
  };

  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('InExUserDetails');
    console.log('userData___________', userData);
    setUserDetails(JSON.parse(userData));

    let parseUserData = JSON.parse(userData);
    getAttendenceRadius(parseUserData);
  };

  const getAttendenceRadius = async loginUserDetail => {
    if (
      loginUserDetail?.role == 'Collection Executive' ||
      loginUserDetail?.role == 'Circulation Executive' ||
      loginUserDetail?.role == 'Regional Manager'
    ) {
      const token = await AsyncStorage.getItem('InExToken');
      const response = await auth.getAttendenceRadius(token);
      console.log('getAttendenceRadius', response);
      if (response?.data?.code == 200 || response?.data?.code == 201) {
        setattendenceRadius(response?.data?.data);
      } else {
        setattendenceRadius('');
      }
    }
  };

  const disabledCheckIn = () => {
    if (checkIn == '') {
      return false;
    } else return true;
  };

  const disabledCheckOut = () => {
    if (checkIn == '' || checkOut != '') {
      return true;
    } else return false;
  };

  const tabLabel = () => {
    if (
      userDetails?.role === 'Depot Salesman' ||
      userDetails?.role === 'Parcel Vendor'
    ) {
      setRoleBasedGrid(1); // unsold tile
      setRoleBasedName('Unsold/ Return');
    }
    if (userDetails?.role === 'Collection Executive') {
      setRoleBasedGrid(2); //collection tile
      setRoleBasedName('Collection');
    }
    if (userDetails?.role === 'Circulation Executive') {
      setRoleBasedGrid(3); // approve tile
      setRoleBasedName('Verify Unsold/Return');
    }
    if (userDetails?.role === 'Regional Manager') {
      setRoleBasedGrid(4); // approve tile
      setRoleBasedName('Verify Unsold/Return');
    }
  };

  return (
    <ScrollView
      style={{flex: 1}}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {showDepotPopup ? (
          <DepotDropdownPopup
            depotArr={regionWiseDepotList}
            parcelArr={regionWiseParcelList}
            showModal={showDepotPopup}
            onClose={() => {
              setshowDepotPopup(false);
            }}
            depotItem={depotItem}
            itemHandler={item => {
              if (attendenceRadius?.length > 0) {
                if (item?.check_in_longitude && item?.check_in_latitude) {
                  console.log('selectedItem', item);
                  setDepotItem(item);
                  setshowDepotPopup(false);
                  setCheckType(1);
                  setTimeout(() => {
                    checkLocationPermission(1, item);
                  }, 1000);
                } else {
                  Alert.alert(
                    'Oops!',
                    'Address not found',
                    [{text: 'OK', onPress: async () => {}}],
                    {cancelable: false},
                  );
                }
              } else {
                Alert.alert(
                  'Oops!',
                  'Attendence radius not defined.',
                  [{text: 'OK', onPress: async () => {}}],
                  {cancelable: false},
                );
              }
            }}
          />
        ) : null}
        <View style={{paddingHorizontal: 10}}>
          <Image source={images.logo} style={styles.logo} />
        </View>
        <View style={styles.deshboard}>
          <View>
            <Text style={styles.profilename}>{userDetails?.name}</Text>
            <Text style={styles.place}>{userDetails.role}</Text>
            <Text style={styles.empids}>
              {userDetails?.user_type == 'external'
                ? 'BP Code'
                : 'Employee Code'}{' '}
              : {userDetails.loginId}
            </Text>
            {roleBasedGrid == '1' ? null : (
              <Text style={styles.empids}>Mail : {userDetails.email}</Text>
            )}

            <Text style={styles.mobile}>Mobile + 91 {userDetails.phone}</Text>
            <Image source={images.deshboardgroup} style={styles.group} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 10,
            paddingBottom: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
          }}>
          {roleBasedGrid == 1 ? null : (
            <>
              <Text style={styles.attendancepart}>Attendance</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  // alignItems: 'center',
                }}>
                <View style={{width: '48%'}}>
                  <Pressable
                    disabled={disabledCheckIn()}
                    style={[
                      styles.maincheckin,
                      {opacity: disabledCheckIn() ? 0.4 : 1},
                    ]}
                    // onPress={() => {
                    //   setCheckType(1);
                    //   if (isPermissionGranted) {
                    //     getLocation(1);
                    //   } else {
                    //     checkLocationPermission(1);
                    //   }
                    // }}

                    onPress={() => {
                      setshowDepotPopup(true);
                    }}>
                    <Image
                      source={
                        disabledCheckIn() ? images.checkin : images.checkout
                      }
                    />
                    <View>
                      <Text style={styles.checkintime}>
                        Check-in {'\n'}
                        {checkIn}
                      </Text>
                      {checkInType ? (
                        <Text style={styles.checkInTypeText}>
                          ({checkInType})
                        </Text>
                      ) : null}
                    </View>
                  </Pressable>
                </View>
                <View
                  style={{
                    width: '48%',
                    //backgroundColor: 'red',
                  }}>
                  <Pressable
                    style={[
                      styles.maincheckin,
                      {opacity: disabledCheckOut() ? 0.4 : 1},
                    ]}
                    disabled={disabledCheckOut()}
                    onPress={() => {
                      setCheckType(2);
                      if (isPermissionGranted) {
                        getLocation(2);
                      } else {
                        checkLocationPermission(2);
                      }
                    }}>
                    <Image
                      source={checkOut ? images.checkin : images.checkout}
                    />
                    <Text style={styles.checkout}>
                      Check-Out {'\n'}
                      {checkOut}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>
        <AppLoader visible={loading} />
        {/* {userDetails?.role === 'Depot Salesman' ||
        userDetails?.role === 'Parcel Vendor' ? (
          <View style={{paddingHorizontal: 15, marginTop: 20}}>
            <Dashboard data={vendorDashboardData} userData={userDetails} />
          </View>
        ) : null} */}

        <View
          style={{
            marginTop: 10,
            flex: 1,
            //marginBottom: 30,
          }}>
          <View style={styles.boxlayout}>
            {roleBasedGrid == 1 && (
              <View style={styles.cardContainer}>
                <Card
                  image={images.return}
                  text="Unsold/ Return"
                  //handleCardClick={() => navigation.navigate('UnsoldRetun')}
                  handleCardClick={() =>
                    navigation.navigate('UnsoldReturnList')
                  }
                />
              </View>
            )}

            {roleBasedGrid == 3 && (
              <View style={styles.cardContainer}>
                <Card
                  image={images.return}
                  text={roleBasedName}
                  handleCardClick={() =>
                    navigation.navigate('ApprovalDashboard2', {
                      titleName: roleBasedName,
                    })
                  }
                />
              </View>
            )}

            {(roleBasedGrid == 1 ||
              roleBasedGrid == 2 ||
              roleBasedGrid == 3) && (
              <View style={styles.cardContainer}>
                <Card
                  image={images.file}
                  text="Collection"
                  //handleCardClick={() => navigation.navigate('Collection')}
                  handleCardClick={() => {
                    navigation.navigate('CollectionDashboard');
                  }}
                />
              </View>
            )}
            {roleBasedGrid == 4 && (
              <View style={styles.cardContainer}>
                <Card
                  image={images.return}
                  text={roleBasedName}
                  handleCardClick={() =>
                    navigation.navigate('UnsoldReturnApprovalDashboard', {
                      roleBasedGrid: 1,
                    })
                  }
                />
              </View>
            )}

            {roleBasedGrid == 4 && (
              <View style={styles.cardContainer}>
                <Card
                  image={images.file}
                  text="Verify Collection"
                  handleCardClick={() =>
                    // navigation.navigate('CollectionApprovalDashboard', {
                    //   roleBasedGrid: 2,
                    // })
                    navigation.navigate('CollectionDashboard')
                  }
                />
              </View>
            )}

            {roleBasedGrid == 2 && (
              <View style={styles.cardContainer}>
                <Card
                  image={images.profileIcon}
                  text="Profile"
                  handleCardClick={() => navigation.push('Profile')}
                />
              </View>
            )}
          </View>
          <View style={styles.boxlayout}>
            {roleBasedGrid == 2 ? null : (
              <View style={styles.cardContainer}>
                <Card
                  image={images.profileIcon}
                  text="Profile"
                  handleCardClick={() => navigation.push('Profile')}
                />
              </View>
            )}

            {roleBasedGrid == 2 ? (
              <View style={styles.cardContainer}>
                <Card
                  image={images.logoutIcon}
                  text="Log out"
                  fullWidth={true}
                  handleCardClick={() => logoutAction()}
                />
                {/* <Card
                  image={images.file}
                  text="PO Sampling Copies"
                  fullWidth={true}
                  handleCardClick={() => {
                    navigation.navigate('SupplyCopy');
                  }}
                /> */}
              </View>
            ) : (
              <View style={styles.cardContainer}>
                <Card
                  image={images.file}
                  text="Print Order"
                  fullWidth={true}
                  handleCardClick={() => {
                    navigation.navigate('SelectionOfPrintOrder');
                    // if (roleBasedGrid == 3 || roleBasedGrid == 4) {
                    //   navigation.navigate('PrintOrderDashboard');
                    // } else {
                    //   navigation.navigate('PrintOrderList');
                    // }
                  }}
                />
              </View>
            )}
          </View>
        </View>
        {roleBasedGrid == 2 ? null : (
          <View
            style={{
              //marginTop: 10,
              flex: 1,
              marginBottom: 30,
            }}>
            <View style={styles.boxlayout}>
              {/* <Card
                image={images.file}
                text="PO Sampling Copies"
                fullWidth={true}
                handleCardClick={() => {
                  navigation.navigate('SupplyCopy');
                }}
              /> */}
              <Card
                image={images.logoutIcon}
                text="Log out"
                fullWidth={true}
                handleCardClick={() => logoutAction()}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  // ccDashboard: state.CCReducer.ccDashboard,
  // ccHotlistLoading: state.CCHotlistReducer.ccHotlistLoading,
  // ccHotlist: state.CCHotlistReducer.ccHotlist,
  // ccHotlistError: state.CCHotlistReducer.ccHotlistError,
  // ccHotlistSuccess: state.CCHotlistReducer.ccHotlistSuccess,
  // ccLogoPathData: state.CCReducer.ccLogoPathData,
});

const mapDispatchToProps = {
  // hotlistCreditCard: hotlistCreditCard,
  // clearError: clearError,
  checkInAction: checkInAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
