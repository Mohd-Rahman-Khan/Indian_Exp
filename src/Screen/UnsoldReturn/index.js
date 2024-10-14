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
import {set, xorBy} from 'lodash';
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

// import Calendar from 'react-calendar';

const TODAY_DATE = moment().format('YYYY-MM-DD');

const UnsoldRetun = ({navigation}) => {
  // console.log("navigation UnsoldRetun",navigation)
  // const [date, setDate] = useState(new Date());
  const [reqFormatDate, setReqFormatDate] = useState(TODAY_DATE);
  const [reqFormatDateToShow, setreqFormatDateToShow] = useState(
    moment().format('DD-MM-YYYY, dddd'),
  );
  // const [todate, setToDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [value, setValue] = useState(null);

  const [publicationArr, setPublicationArr] = useState([]);
  const [publicationItem, setPublicationItem] = useState({});
  const [editionArr, setEditionArr] = useState([]);
  const [editionItem, setEditionItem] = useState({});
  const [depotArr, setDepotArr] = useState([]);
  const [depotItem, setDepotItem] = useState({});
  const [supplyVal, setSupplyVal] = useState(0);
  const [unsoldVal, setUnsoldVal] = useState(0);
  const [returnVal, setReturnVal] = useState(0);
  const [npsVal, setNPSVal] = useState(0);
  const [unsoldReturnId, setUnsoldReturnId] = useState(0);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [isDropdownEnable, setIsDropdownEnable] = useState(true);
  const [isPvDsm, setIsPvDsm] = useState(false);
  const [recallApi, setRecallApi] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [supplyData, setSupplyData] = useState();

  useEffect(() => {
    depotApi();
    publicationApi();
    getUserDetails();
  }, []);

  useEffect(() => {
    console.log('recallApi', recallApi);
    depotApi();
    publicationApi();
  }, [recallApi]);

  // useEffect(()=> {
  //   tabLabel()
  // }, [userDetails]);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    if (
      userData?.role == 'Parcel Vendor' ||
      userData?.role == 'Depot Salesman'
    ) {
      setIsPvDsm(true);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(depotItem) && reqFormatDate && !_.isEmpty(publicationItem)) {
      supplyApi(false);
    }
  }, [reqFormatDate, publicationItem, depotItem]);

  useEffect(() => {
    if (supplyVal > 0 && (unsoldVal > 0 || returnVal > 0)) {
      let NPS = supplyVal - unsoldVal - returnVal;
      setNPSVal(NPS);
    } else {
      setNPSVal(0);
    }
  }, [supplyVal, unsoldVal, returnVal]);

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
            NavigationService.reset(navigation, 'Login');
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
            setSupplyVal(0);
            setUnsoldVal(0);
            setReturnVal(0);
            setNPSVal(0);
            // setSubmitEnable(false);
            setDisableButton(true);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const supplyApiFailureAlert = apiName => {
    console.log('Failure Api Name =======> @@@@@@@@', apiName);
    Alert.alert(
      'Information!',
      'Supply not updated for the selected date.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSupplyVal(0);
            setUnsoldVal(0);
            setReturnVal(0);
            setNPSVal(0);
            // setSubmitEnable(false);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const publicationApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const response = await auth.publications(token);
    if (response?.status != 200) {
      apiFailureAlert('publicationApi');
    } else {
      console.log('publications res', response.data?.data);
      setPublicationArr(response.data?.data);
      setPublicationItem(response.data?.data[0]);
    }
  };

  const editionApi = async itemValue => {
    const token = await AsyncStorage.getItem('InExToken');
    const response = await auth.editions(itemValue.id, token);
    console.log(response);
    if (response?.status != 200) {
      apiFailureAlert('editionApi');
    } else {
      console.log('editionApi res', response.data?.data);
      setEditionArr(response.data?.data);
    }
  };

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
      console.log('depotApi res', response.data?.data);
      setDepotArr(response.data?.data);
      setDepotItem(response.data?.data[0]);
    }
  };

  const supplyApi = async flag => {
    const token = await AsyncStorage.getItem('InExToken');
    const response = await auth.supply(
      depotItem?.ship_to_code,
      reqFormatDate,
      //'2024-08-06',
      publicationItem?.id,
      token,
    );

    //const response = await auth.supply('6006390', '2023-02-21', '5', token);
    console.log('Supply Api Resp', response);
    if (response?.status != 200) {
      supplyApiFailureAlert('supplyApi');
      setSubmitEnable(true);
      setIsDropdownEnable(true);
    } else {
      setSubmitEnable(false);
      setSupplyData(response.data?.data);
      setSupplyVal(response.data?.data?.total_supply);
      setUnsoldReturnId(response.data?.data?.unsold_return_id);
      setIsDropdownEnable(true);
      setUnsoldVal(response.data?.data?.unsold);
      setReturnVal(response.data?.data?.supply_return);
      if (response.data?.data?.unsold_return_id > 0) {
        setIsDropdownEnable(false);
      }
    }
  };

  const onDateSelection = (event, selectedDate) => {
    const currentDate = selectedDate;
    const reqFormatDt = moment(selectedDate).format('YYYY-MM-DD');
    console.log('selectedDate', selectedDate);
    console.log('reqFormatDt', reqFormatDt);
    setShow(false);
    setReqFormatDate(reqFormatDt);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate1 = selectedDate;
    setShow(false);
    setToDate(currentDate1);
  };

  const showMode = currentMode => {
    // setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showDatepicker1 = () => {
    console.log('heehhe');
    setShow(true);
  };
  function onMultiChange() {
    return item => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }

  function onMultiChanges() {
    return item => setSelectedTeam(xorBy(selectedTeam, [item], 'id'));
  }

  function onMultiDepotChange() {
    return item => setSelectedDpotTeam(xorBy(selectedDepotTeam, [item], 'id'));
  }

  const onChangeDate = () => {};

  const onPublicationSelect = (itemValue, itemIndex) => {
    console.log('itemValue', itemValue.name);
    setPublicationItem(itemValue);
    // editionApi(itemValue)
  };

  const submitAction = useTimeBlockedCallback(async actionId => {
    if (unsoldVal > supplyVal) {
      alert(
        'Please provide valid UNSOLD value i.e not greater than SUPPLY value.',
      );
    } else {
      const token = await AsyncStorage.getItem('InExToken');
      const userId = await AsyncStorage.getItem('InExUserId');
      let dataObj = {
        user_id: userId,
        ship_to_code: depotItem?.ship_to_code,
        publication_date: reqFormatDate,
        publication_id: publicationItem?.id,
        total_supply: supplyVal,
        unsold: unsoldVal,
        supply_return: returnVal,
        // "updated_by_last_user_id": 7 // optional
      };
      if (supplyData?.approval_status == 2) {
        Object.assign(dataObj, {approval_status: '_0'});
      }
      if (unsoldReturnId > 0) {
        dataObj.unsold_return_id = unsoldReturnId;
      }
      const response = await auth.unsoldReturnSubmit(dataObj, token);
      if (response?.status != 200) {
        apiFailureAlert('unsoldReturnSubmitApi');
      } else {
        if (actionId == 1) {
          Alert.alert(
            'Record saved!',
            'Request submit successfully.',
            [
              {
                text: 'OK',
                onPress: () => {
                  setUnsoldVal(0);
                  setReturnVal(0);
                  navigation.navigate('Home');
                },
              },
            ],
            {cancelable: false},
          );
        }
        if (actionId == 2) {
          Alert.alert('Record saved!', 'Request Added successfully.', [
            {
              text: 'OK',
              onPress: () => {
                setIsDropdownEnable(true);
                // setRecallApi(true);
                // setReqFormatDate(TODAY_DATE);
                // setShow(false);
                // setPublicationArr([]);
                // setPublicationItem({});
                // setEditionArr([]);
                // setEditionItem({});
                // setDepotArr([]);
                // setDepotItem({});
                // setSupplyVal(0);
                //  setUnsoldVal(0);
                // setReturnVal(0);
                // setNPSVal(0);
                // setSubmitEnable(false);
              },
            },
          ]);
        }
      }
    }
  });

  const onChangeTextValue = (text, type) => {
    //console.log('ccccccccccccc', type, supplyVal, unsoldVal, returnVal);
    if (type == 2) {
      if (text == '' || text == 0) {
        setUnsoldVal(text);
      } else {
        let currentVal = parseInt(text) + parseInt(returnVal);

        if (currentVal <= supplyVal) {
          setUnsoldVal(text);
        } else {
          alert('Invalid Value');
        }
      }
    }
    if (type == 3) {
      // setReturnVal(text);
      if (text == '' || text == 0) {
        setReturnVal(text);
      } else {
        let currentVal = parseInt(text) + parseInt(unsoldVal);

        if (currentVal <= supplyVal) {
          setReturnVal(text);
        } else {
          alert('Invalid Value');
        }
      }
    }
  };

  const checkSameDay = () => {
    let flag = false;
    if (moment(reqFormatDate).isSame(TODAY_DATE)) {
      flag = true;
    }
    return flag;
  };

  const rowItemView = (lbl, value = 0, enableFlag, type) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 14,
          height: 26,
          marginHorizontal: 10,
        }}>
        <Text style={{width: '50%'}}>{lbl}</Text>
        {enableFlag ? (
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              height: 26,
              width: '50%',
              color: 'black',
              paddingVertical: 1,
            }}
            value={type == 2 ? unsoldVal.toString() : returnVal.toString()}
            keyboardType={'numeric' || 'number-pad'}
            onChangeText={text => onChangeTextValue(text, type)}
          />
        ) : (
          <Text
            style={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              height: 26,
              paddingLeft: 3,
              paddingTop: 3,
              backgroundColor: 'lightgrey',
              width: '50%',
              color: 'black',
            }}>
            {value}
          </Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.mainview}>
          <View>
            <Text style={styles.dropdownHeading}>Select Date</Text>
            <TouchableOpacity
              // style={{backgroundColor: 'pink'}}
              onPress={() => {
                //showDatepicker1();
              }}>
              <View style={styles.textInput}>
                <Text>{reqFormatDateToShow}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {show && Platform.OS === 'android' && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={mode}
              is24Hour={true}
              maximumDate={new Date()}
              onChange={onDateSelection}
            />
          )}
          {show && Platform.OS === 'ios' && (
            <DatePicker
              modal
              mode="date"
              confirmText="Ok"
              cancelText="Close"
              open={show}
              //date={new Date(reqFormatDate)}
              date={new Date()}
              onConfirm={date => {
                onDateSelection(null, date);
              }}
              onCancel={() => {
                setShow(false);
              }}
            />
          )}
        </View>
        <View style={{paddingHorizontal: 20}}>
          <CustomDropdown
            headerTitle="Select Publication"
            data={publicationArr}
            selectedItem={publicationItem?.name}
            itemHandler={item => {
              setPublicationItem(item);
            }}
            search={true}
          />
          <CustomDropdown
            headerTitle="Select Depot"
            data={depotArr}
            selectedItem={depotItem?.name}
            itemHandler={item => {
              setDepotItem(item);
            }}
            search={true}
          />
        </View>

        {/* <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: '5%',
            marginTop: 16,
          }}> */}
        {/* <Text style={styles.dropdownHeading}>Select Editions</Text>
          <Text style={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              backgroundColor: 'lightgrey',
              color: 'black',
              paddingLeft: 15,
              paddingVertical: 15,
              height: 50,
              fontSize: 16,
            }}>
              {editionArr.length > 0 && editionArr[0].name}
          </Text> */}
        {/* <Picker
            style={{
              borderWidth: 1,
              borderColor: 'red',
              backgroundColor: 'lightgrey'
            }}
            itemStyle={{height: 5}}
            enabled={reqFormatDate ? true : false}
            mode={'dropdown'}
            selectedValue={editionItem}
            onValueChange={(itemValue, itemIndex) =>
              setEditionItem(itemValue)
            }>
            {editionArr.map(item => {
              return <Picker.Item key={item.id} label={item.name} value={item} />;
            })}
          </Picker> */}
        {/* </View> */}
        <View style={styles.publicationview}>
          {/* <Text style={styles.publication}>Select Publication</Text> */}
          {/* {reqFormatDate ? ( <SelectBox
          //   // containerStyle={}
          //   containerStyle={styles.selecteditem}
          //   labelStyle={styles.publication}
          //   inputFilterContainerStyle={styles.inputs}
          //   inputFilterStyle={styles.filters}
          //   selectedItemStyle={styles.selected}
          //   optionsLabelStyle={styles.option}
          //   listEmptyLabelStyle={styles.list}
          //   multiOptionContainerStyle={styles.multiple}
          //   multiOptionsLabelStyle={styles.labels}
          //   multiListEmptyLabelStyle={styles.multi}
          //   optionContainerStyle={styles.friday}
          //   label="Select Publication"
          //   options={K_OPTIONS}
          //   selectedValues={selectedTeams}
          //   onMultiSelect={onMultiChange()}
          //   onTapClose={onMultiChange()}
          //   isMulti
          // />
          // null}
        </View>
        <View style={styles.publicationview}>
          {/* <Text style={styles.publication}>Select Edition</Text> */}
          {/* {reqFormatDate ? (
            <SelectBox
              // containerStyle={}
              containerStyle={styles.selecteditem}
              labelStyle={styles.publication}
              inputFilterContainerStyle={styles.inputs}
              inputFilterStyle={styles.filters}
              selectedItemStyle={styles.selected}
              optionsLabelStyle={styles.option}
              listEmptyLabelStyle={styles.list}
              multiOptionContainerStyle={styles.multiple}
              multiOptionsLabelStyle={styles.labels}
              multiListEmptyLabelStyle={styles.multi}
              optionContainerStyle={styles.friday}
              label="Select Edition"
              options={K_OPTIONS}
              selectedValues={selectedTeam}
              onMultiSelect={onMultiChanges()}
              onTapClose={onMultiChanges()}
              isMulti
            />
          ) : null} */}
        </View>
        <View style={styles.publicationviews}>
          {/* <Text style={styles.publication}>Select Depot/s</Text> */}
          {/* {reqFormatDate ? (
            <SelectBox
              // containerStyle={}
              containerStyle={styles.selecteditem}
              labelStyle={styles.publication}
              inputFilterContainerStyle={styles.inputs}
              inputFilterStyle={styles.filters}
              selectedItemStyle={styles.selected}
              optionsLabelStyle={styles.option}
              listEmptyLabelStyle={styles.list}
              multiOptionContainerStyle={styles.multiple}
              multiOptionsLabelStyle={styles.labels}
              multiListEmptyLabelStyle={styles.multi}
              optionContainerStyle={styles.friday}
              label="Select Depot/s"
              options={K_OPTIONS}
              selectedValues={selectedDepotTeam}
              onMultiSelect={onMultiDepotChange()}
              onTapClose={onMultiDepotChange()}
              isMulti
            />
          ) : null} */}
        </View>

        <View
          style={{
            backgroundColor: 'white',
            marginLeft: '6%',
            marginRight: '4%',
            marginTop: '5%',
            borderWidth: 1,
            borderTopColor: 'white',
            borderLeftColor: 'white',
            borderBottomColor: 'lightgrey',
            borderRightColor: 'lightgrey',
          }}>
          {rowItemView('Supply:', supplyVal, false, 1)}
          {rowItemView(
            'Unsold:',
            supplyData?.unsold ? supplyData?.unsold : 0,
            supplyData?.approval_status == 1 ? false : true,
            2,
          )}
          {rowItemView(
            'Return:',
            supplyData?.supply_return ? supplyData?.supply_return : 0,
            supplyData?.approval_status == 1 ? false : true,
            3,
          )}
          {isPvDsm && rowItemView('NPS:', npsVal, false, 4)}
          {/* ???? */}
        </View>

        {/* <View style={styles.unsoldsupply}>
          <View style={styles.supplytext}>
            <Text style={styles.Text}>Supply</Text>
            <Text style={styles.count}>0</Text>
          </View>
          <View style={styles.supplytext}>
            <Text style={styles.Text}>Unsold</Text>
            <TextInput
              style={styles.textInput}
              value={unsoldVal}
              onChangeText={text => setUnsoldVal(text)}
            />
          </View>
          <View style={styles.supplytext}>
            <Text style={styles.Text}>Return</Text>
            <Text style={styles.count}>0</Text>
          </View>
          <View style={styles.supplytext}>
            <Text style={styles.Text}>NPS</Text>
            <Text style={styles.count1}>0</Text>
          </View>
        </View> */}

        <View style={styles.buttongroup}>
          <View>
            <TouchableOpacity
              disabled={
                submitEnable ||
                disableButton ||
                supplyData?.approval_status == 1
              }
              onPress={() => submitAction(1)}>
              <View
                style={[
                  styles.canclebtn,
                  {
                    opacity: !submitEnable ? 1 : 0.3,
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
          <TouchableOpacity
            disabled={
              submitEnable ||
              disableButton ||
              supplyData?.approval_status == 1 ||
              supplyData?.approval_status == 2 ||
              unsoldReturnId === 0
            }
            onPress={() => submitAction(2)}>
            <View
              style={[
                styles.logoutBtn1,
                {
                  opacity: !submitEnable ? 1 : 0.3,
                  backgroundColor:
                    supplyData?.approval_status == 1 ||
                    supplyData?.approval_status == 2 ||
                    unsoldReturnId === 0
                      ? 'lightgrey'
                      : '#DA0B0B',
                },
              ]}>
              <Text style={styles.btnText}>ADD NEW</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UnsoldRetun;
