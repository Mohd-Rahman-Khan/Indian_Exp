import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import images from '../../../Image';
import COLORS from '../../../GlobalConstants/COLORS';
import auth from '../../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import _, {subtract} from 'lodash';
import NavigationService from '../../../Navigation/RootNavigator/NavigationService';
import CustomDropdown from '../../../comonent/CustomDropdown';
import {useIsFocused} from '@react-navigation/native';

const TODAY_DATE = moment().format('YYYY-MM-DD');

const DURATION_DATA = [
  {
    id: 1,
    name: 'Daily',
  },
  {
    id: 2,
    name: 'Weekly',
  },
  {
    id: 3,
    name: 'Monthly',
  },
  {
    id: 4,
    name: 'Yearly',
  },
];

const widthAndHeight = 270;
const sliceColor =
  // ['#F44336',
  ['#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];

export default function UnsoldReturnApprovalDashboard({navigation, route}) {
  const roleBasedGrid = route.params?.roleBasedGrid;
  const [recordsArr, setRecordsArr] = useState([]);
  const [startDt, setStartDt] = useState(moment().format('YYYY-MM-DD'));
  // const [durationArr, setDurationArr] = useState(DURATION_DATA);
  const [durationItem, setDurationItem] = useState({});
  const [series, setSeries] = useState([]);
  const [isCirEX, setIsCirEX] = useState(false);
  const [regionArr, setRegionArr] = useState([
    {id: -1, description: 'Please select region...'},
  ]);
  const [regionItem, setRegionItem] = useState(regionArr[0]);
  const [centerArr, setCenterArr] = useState([
    {id: -1, name: 'Please select center...'},
  ]);
  const [centerItem, setCenterItem] = useState(centerArr[0]);
  const [parcelArr, setParcelArr] = useState([]);
  const [parcelItem, setParcelItem] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [isFilterEligible, setIsFilterEligible] = useState(false);
  const [isFilterApply, setIsFilterApply] = useState(false);
  const [filterLbl, setFilterLbl] = useState('Apply Filter');

  const [publicationArr, setPublicationArr] = useState([]);
  const [publicationItem, setPublicationItem] = useState({});
  const [averageFactor, setAverageFactor] = useState(1);
  const isFocused = useIsFocused();
  //console.log('averageFactor>>', averageFactor);

  useEffect(() => {
    if (isFocused) {
      //setIsFilterApply(!isFilterApply);
      setRecordsArr([]);
    }
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      publicationApi();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      setDurationItem(DURATION_DATA[0]);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      getRecordsTotal();
      //  getRecords({});
      getUserDetails();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (!_.isEmpty(durationItem)) {
        // getRecordsTotal()
        getRecordsTotal();
        // console.log('durationItem: ', durationItem);
      }
    }
  }, [durationItem, publicationItem?.id, isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (isFilterApply) {
        setFilterLbl('Reset Filter');
        if (isCirEX) {
          centersApi();
        } else {
          regionApi();
        }
      } else {
        setRegionArr([{id: -1, description: 'Please select region...'}]);
        setRegionItem(regionArr[0]);
        setCenterArr([{id: -1, name: 'Please select center...'}]);
        setCenterItem(centerArr[0]);
        setParcelArr([{id: -1, name: 'Please select parcel region...'}]);
        setFilterLbl('Apply Filter');
      }
    }
  }, [isFilterApply, isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (regionItem?.id != -1) {
        centersApi();
      }
    }
  }, [regionItem, isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (centerItem?.id != -1) {
        parcelRegionApi();
      }
    }
  }, [centerItem, isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (
        (regionItem?.id != -1 || isCirEX) &&
        centerItem?.id != -1 &&
        !_.isEmpty(parcelItem) &&
        parcelItem?.id != -1
      ) {
        getRecords({
          userId: parcelItem?.user_id,
          isFilter: true,
          startDate: startDt,
          endDate: TODAY_DATE,
        });
      }
    }
  }, [regionItem, centerItem, parcelItem, isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (moment(TODAY_DATE).diff(moment(startDt), 'days') == 0) {
        setAverageFactor(1);
      } else {
        setAverageFactor(moment(TODAY_DATE).diff(moment(startDt), 'days') + 1);
      }
    }
  }, [startDt, isFocused]);

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

  const handleSelectReegion = item => {
    setCenterArr([{id: -1, name: 'Please select center...'}]);
    setParcelArr([{id: -1, name: 'Please select parcel region...'}]);
    setCenterItem({id: -1, name: 'Please select center...'});
    setParcelItem({id: -1, name: 'Please select parcel region...'});
    setRegionItem(item);
  };

  const handleSelectCenter = item => {
    setParcelItem({id: -1, name: 'Please select parcel region...'});
    setParcelArr([{id: -1, name: 'Please select parcel region...'}]);
    setCenterItem(item);
    setRecordsArr([]);
  };

  const handleSelectParcelReegion = item => {
    setParcelItem(item);
  };

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    if (
      userData.role === 'Regional Manager' ||
      userData.role === 'Circulation Executive'
    ) {
      setIsFilterEligible(true);
    }
    if (userData?.role == 'Circulation Executive') {
      setIsCirEX(true);
      centersApi();
    }
  };

  const apiFailureAlert = apiName => {
    // console.log('Failure Api Name =======> ', apiName);
    // Alert.alert(
    //   'oops!',
    //   'something went wrong, please try later!',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: async () => {
    //         await AsyncStorage.removeItem('InExToken');
    //         await AsyncStorage.removeItem('InExUserId');
    //         await AsyncStorage.removeItem('InExUserDetails');
    //         NavigationService.reset(navigation, 'Login');
    //       },
    //     },
    //   ],
    //   {cancelable: false},
    // );
  };

  const apiFailureNoDataAlert = apiName => {
    // console.log('Failure Api Name =======> ', apiName);
    Alert.alert(
      'Information!',
      'No records found.',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  const getRecordsTotal = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    //  console.log('start>>>>>>>>', startDt, TODAY_DATE);
    let dataObj = {
      userId: userId,
      isForMobile: true,
      publicationId: publicationItem?.id,
      startDate: startDt,
      endDate: TODAY_DATE,
      isChart: true,
    };
    console.log('dataObj yyy>>', dataObj);
    const response = await auth.unsoldReturnApproval(dataObj, token);
    console.log('response: getRecordsTotalsss', response.data);
    if (response?.status != 200) {
      apiFailureAlert('getRecords');
    } else {
      const myData = response.data?.data;
      //  console.log('myData: ', myData);
      const tempArr = [];
      const NPS =
        myData[0].sum_total_supply -
        myData[0].sum_total_unsold -
        myData[0].sum_total_supply_return;
      // tempArr.push(50, 100, 200)
      tempArr.push(
        myData[0].sum_total_supply >= 0 ? myData[0].sum_total_supply : 0,
        myData[0].sum_total_supply_return >= 0
          ? myData[0].sum_total_supply_return
          : 0,
        myData[0].sum_total_unsold >= 0 ? myData[0].sum_total_unsold : 0,
        NPS >= 0 ? NPS : 0,
      );
      setSeries(tempArr);
    }
    // await unsoldReturnApproval()
  };

  const getRecords = async request => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    let dataObj = {
      userId: userId,
      isForMobile: true,
    };
    if (isFilterApply) {
      dataObj = {...dataObj, ...request};
    }
    const response = await auth.unsoldReturnApproval(dataObj, token);
    console.log('response: getRecords_____________ ', dataObj);
    if (response?.status == 404) {
      setRecordsArr([]);
      apiFailureNoDataAlert('getRecords');
    } else if (response?.status != 200) {
      apiFailureAlert('getRecords');
    } else {
      setRecordsArr(response.data?.data);
    }
  };

  const regionApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.collectionRegion(userId, token);
    if (response?.status != 200) {
      apiFailureAlert('regionApi');
    } else {
      // console.log('regionApi res', response.data?.data);
      setRegionArr(prev => [prev[0], ...response.data?.data]);
    }
  };

  const centersApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    console.log('userId hhhh', userId);
    let response = null;
    if (isCirEX) {
      response = await auth.collectionCentersRegionUserId(userId, token);
      console.log('centersApi res__', response);
    } else {
      response = await auth.collectionCentersRegion(regionItem?.id, token);
      console.log('centersApi res__', response);
    }

    if (response?.status != 200) {
      apiFailureAlert('centersApi');
    } else {
      setCenterArr(prev => [prev[0], ...response.data?.data]);
    }
  };

  const parcelRegionApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    // console.log("centerItem",centerItem)
    const response = await auth.collectionDepotRegion(centerItem?.id, token);
    // console.log('response vivek: ', response.data);
    if (response?.status != 200) {
      apiFailureAlert('parcelRegionApi');
    } else {
      // console.log('parcelRegionApi res', response.data?.data);
      // setParcelArr(response.data?.data);
      setParcelArr(prev => [prev[0], ...response.data?.data]);
    }
  };

  const unsoldReturnRenderItemView = item => {
    console.log('isFilterApply tested', isFilterApply);
    if (
      !isCirEX &&
      isFilterApply &&
      (regionItem?.id == -1 || centerItem?.id == -1 || _.isEmpty(parcelItem))
    ) {
      return null;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.white,
          borderRadius: 10,
          //height: 85,
          marginVertical: 10,
          paddingLeft: 12,
          paddingRight: 8,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('UnsoldReturnApproval', {
              roleBasedGrid,
              shipToCode: item.item?.ship_to_code,
              publicationDate: item.item?.publication_date,
              approvalStatus: item?.item?.approval_status,
              parcelItemUserId: parcelItem?.user_id,
              onGoBack: () => {
                getRecords({userId: parcelItem?.user_id, isFilter: true});
              },
              navigation: navigation,
            })
          }>
          <View style={{flex: 0.9}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: COLORS.black,
                paddingBottom: 4,
              }}>
              {item.item?.user_name}
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                numberOfLines={1}
                style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
                {'SHIP TO CODE : ' + item.item?.ship_to_code}
              </Text>
              <View style={{width: 70}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: COLORS.black,
                    textAlign: 'center',
                  }}>
                  {item.item?.approval_status == '0,1,2' ||
                  item.item?.approval_status == '1,2' ||
                  item.item?.approval_status == '0,1'
                    ? 'Partially Approved'
                    : item.item?.approval_status == '1'
                      ? 'Approved'
                      : item.item?.approval_status == '2'
                        ? 'Rejected'
                        : 'Pending'}
                </Text>
              </View>
            </View>
            <Text
              style={{color: COLORS.black, fontWeight: '500', paddingTop: 4}}>
              {item.item?.publication_date}
            </Text>
          </View>
          <Image
            style={{flex: 0.1, width: 15, height: 15}}
            source={images.rightArrow}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const graphAbbrivationRow = (color, label) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: 40, height: 20, backgroundColor: color}} />
        <Text style={{marginLeft: 10, fontWeight: '600'}}>{label}</Text>
      </View>
    );
  };

  const weeklyAverageRowData = (label, value) => {
    return (
      <View style={{flexDirection: 'row', borderWidth: 1}}>
        <Text style={{paddingLeft: 10, width: '48%', fontWeight: '600'}}>
          {label}
        </Text>
        <View
          style={{
            width: '52%',
            borderWidth: 1,
            borderRightColor: 'white',
            borderTopColor: 'white',
            borderBottomColor: 'white',
          }}>
          <Text style={{paddingLeft: 10, fontWeight: '600'}}>
            {(value / averageFactor)?.toFixed(0)}
          </Text>
        </View>
      </View>
    );
  };

  const weeklyAverageview = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {weeklyAverageRowData('Supply', `${series.length > 0 ? series[0] : 0}`)}
        {weeklyAverageRowData('Return', `${series.length > 0 ? series[1] : 0}`)}
        {weeklyAverageRowData('Unsold', `${series.length > 0 ? series[2] : 0}`)}
        {weeklyAverageRowData('NPS', `${series.length > 0 ? series[3] : 0}`)}
      </View>
    );
  };

  const graphView = () => {
    // console.log('serrrrrrrrrrrrrrrr', series);
    // const series = [123, 321, 123, 789, 537];

    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          marginBottom: 20,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 4,
          }}>
          <View style={{flex: 1}}>
            {graphAbbrivationRow(
              '#2196F3',
              `Supply - ${series.length > 0 && (series[0] / averageFactor)?.toFixed(0)}`,
            )}
            {graphAbbrivationRow(
              '#FFEB3B',
              `Return- ${series.length > 0 && (series[1] / averageFactor)?.toFixed(0)}`,
            )}
            {graphAbbrivationRow(
              '#4CAF50',
              `Unsold- ${series.length > 0 && (series[2] / averageFactor)?.toFixed(0)}`,
            )}
            {graphAbbrivationRow(
              '#FF9800',
              `NPS- ${series.length > 0 && (series[3] / averageFactor)?.toFixed(0)}`,
            )}
          </View>
        </View>
        {/* hinding graph view */}
        {/* <View
          style={{
            height: 350,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {series.length > 0 && series.every(it => it > 0) && (
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
            />
          )}
         
          <Text>
            Graph{' '}
            {series.length > 0 && series.every(it => it <= 0)
              ? ' - No records found!'
              : null}
          </Text>
        </View> */}
      </View>
    );
  };

  const filterView = () => {
    return (
      <View>
        {!isCirEX && (
          <CustomDropdown
            labelField="description"
            valueField="description"
            data={regionArr}
            selectedItem={regionItem?.description}
            itemHandler={item => {
              handleSelectReegion(item);
            }}
            search={true}
          />
        )}
        {regionItem?.id != -1 || isCirEX ? (
          <CustomDropdown
            data={centerArr}
            selectedItem={centerItem?.name}
            itemHandler={item => {
              handleSelectCenter(item);
            }}
            search={true}
          />
        ) : null}
        {centerItem?.id != -1 ? (
          <CustomDropdown
            data={parcelArr}
            selectedItem={parcelItem?.name}
            itemHandler={item => {
              handleSelectParcelReegion(item);
            }}
            search={true}
          />
        ) : null}
      </View>
    );
  };

  const applyFilterView = () => {
    return (
      <View style={{alignItems: 'flex-end', marginRight: 6}}>
        <TouchableOpacity
          onPress={() => {
            if (isFilterApply) {
              setRecordsArr([]);
            }
            setIsFilterApply(!isFilterApply);
          }}>
          <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
            {filterLbl}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const listHeaderView = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
            // marginBottom: 15,
            marginTop: 5,
          }}>
          {/* <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              fontWeight: '700',
              alignSelf: 'center',
            }}>
            Unsold/Return Approval
          </Text> */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{fontSize: 20, fontWeight: '700', color: COLORS.black}}>
              {durationItem?.name && durationItem?.name != 'Daily'
                ? durationItem?.name.replace('ly', '')
                : 'Daily'}
            </Text>
            <Text
              style={{fontSize: 14, fontWeight: '700', color: COLORS.black}}>
              {' '}
              ({startDt} - {TODAY_DATE})
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'lightgrey',
              width: 130,
            }}>
            <CustomDropdown
              data={DURATION_DATA}
              selectedItem={durationItem?.name}
              disable={isCirEX ? true : false}
              itemHandler={item => {
                setIsFilterApply(false);
                setRecordsArr([]);
                setDurationItem(item);
                let m = moment().format('YYYY-MM-DD');
                if (item.id == 1) {
                  m = moment();
                } else if (item.id == 2) {
                  m = moment().subtract(6, 'days');
                } else if (item.id == 3) {
                  m = moment().subtract(29, 'days');
                } else if (item.id == 4) {
                  m = moment().subtract(364, 'days');
                }
                setStartDt(m.format('YYYY-MM-DD'));
              }}
              search={true}
            />
          </View>
          {/* <Text
            style={{
              color: COLORS.redPrimary,
              fontSize: 16,
              fontWeight: '500',
              paddingRight: 8,
            }}>
            Weekly
          </Text> */}
        </View>
        <View style={{flex: 1, marginBottom: 20}}>
          <CustomDropdown
            headerTitle="Select Publication"
            data={publicationArr}
            selectedItem={publicationItem?.name}
            itemHandler={item => {
              setPublicationItem(item);
            }}
            search={true}
          />
        </View>
        {!isCirEX && graphView()}
        {isCirEX && weeklyAverageview()}
        {isFilterEligible && applyFilterView()}
        {isFilterApply && filterView()}
      </View>
    );
  };

  const unsoldReturnView = () => {
    return (
      <View style={{marginHorizontal: 12, marginTop: 12}}>
        <FlatList
          data={recordsArr}
          ListHeaderComponent={listHeaderView()}
          renderItem={item => unsoldReturnRenderItemView(item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return <View>{unsoldReturnView()}</View>;
}

// ??? weekly dropdown
// ??? login functionality enable on minimise -- least priority
