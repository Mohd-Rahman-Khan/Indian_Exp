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
import images from '../../Image';
import moment from 'moment';
import auth from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../GlobalConstants/COLORS';
import CustomDropdown from '../../comonent/CustomDropdown';
import AppLoader from '../../Helper/AppIndicator';
import CalenderComp from '../../comonent/CalenderComp';

const TODAY_DATE = moment().format('DD-MM-YYYY');

// console.log('Todays Day', moment().isoWeekday());

const SupplyCopy = ({navigation}) => {
  const [depotArr, setDepotArr] = useState([]);
  const [depotItem, setDepotItem] = useState('');
  const [loading, setloading] = useState(false);
  const [userData, setuserData] = useState('');
  const [showCalender, setshowCalender] = useState(false);
  const [selectFromDate, setselectFromDate] = useState(false);
  const [selectedFromDate, setselectedFromDate] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );

  const [passFromDateToApi, setpassFromDateToApi] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [selectedToDate, setselectedToDate] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );

  const [passToDateToApi, setpassToDateToApi] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [dateType, setdateType] = useState('');

  const [publicationList, setpublicationList] = useState([
    {
      id: 1,
      trade_name: 'Indian Express',
      trade: 125,
      updated_value: 125,
      difference: 0,
      supply_id: 2300207,
    },
    {
      id: 1,
      trade_name: 'Financial Express',
      trade: 125,
      updated_value: 125,
      difference: 0,
      supply_id: 2300207,
    },
    {
      id: 1,
      trade_name: 'Loksatta',
      trade: 125,
      updated_value: 125,
      difference: 0,
      supply_id: 2300207,
    },
    {
      id: 1,
      trade_name: 'Lokprabha',
      trade: 125,
      updated_value: 125,
      difference: 0,
      supply_id: 2300207,
    },
    {
      id: 1,
      trade_name: 'Jansatta',
      trade: 125,
      updated_value: 125,
      difference: 0,
      supply_id: 2300207,
    },
  ]);

  useEffect(() => {
    depotApi();
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    setuserData(userData);
  };

  const apiFailureAlertMessage = (title, message, type) => {
    console.log('Failure Api Name =======> ', apiName);
    Alert.alert(
      title,
      message,
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

  const depotApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.depots(userId, token);
    if (response?.status != 200 && response?.status != 404) {
      apiFailureAlertMessage(
        'Oops!',
        response.data?.message ? response.data?.message : response?.problem,
        'depotApi',
      );
    } else if (response?.status == 404) {
      apiFailureAlertMessage(
        'Oops!',
        response.data?.message ? response.data?.message : response?.problem,
        'depotApi',
      );
    } else {
      setDepotArr(response.data?.data);
      setDepotItem(response.data?.data[0]);
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
            marginTop: 10,
          }}>
          <TextInput
            style={styles.textInputStyle}
            value={item?.updated_value.toString()}
            keyboardType={'numeric' || 'number-pad'}
            onChangeText={text => onChangeTextValue(text, type, item)}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <ScrollView>
        <AppLoader visible={loading} />
        {showCalender ? (
          <CalenderComp
            selectFromDate={selectFromDate}
            dateType={dateType}
            fromDate={selectedFromDate}
            closeModal={() => {
              setshowCalender(!showCalender);
              setselectFromDate(false);
              setselectPODateDate(false);
            }}
            minDate={moment(new Date()).format('YYYY-MM-DD')}
            setselectedDate={date => {
              //console.log('SelectedDate', date);
              const reqFormatDt = moment(date).format('DD-MM-YYYY, dddd');
              setshowCalender(!showCalender);
              if (dateType == 'FD') {
                setselectedFromDate(reqFormatDt);
                setpassFromDateToApi(date);
              } else if (dateType == 'TD') {
                if (reqFormatDt < selectedFromDate) {
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
            <Text style={styles.dropdownHeading}>From Date</Text>
            <TouchableOpacity
              onPress={() => {
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

          <View
            style={{
              marginTop: 10,
            }}>
            {publicationList?.length > 0 ? (
              publicationList.map(item => {
                return (
                  <View key={item?.id}>
                    {rowItemView(item?.trade_name, true, 4, true, item)}
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                  Supply list not found
                </Text>
              </View>
            )}
          </View>

          <View style={styles.buttongroup}>
            <View>
              <TouchableOpacity
                disabled={publicationList.length > 0 ? false : true}
                onPress={() => {}}>
                <View
                  style={[
                    styles.canclebtn,
                    {
                      opacity: publicationList.length > 0 ? 1 : 0.3,
                      borderColor: '#DA0B0B',
                      backgroundColor: 'white',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.canclebtntext,
                      {
                        color: '#DA0B0B',
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
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SamplingCopyList');
          }}
          style={styles.addIconContainer}>
          <Image style={styles.plusIcon} source={images.file} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SupplyCopy;
