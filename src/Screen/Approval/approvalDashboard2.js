import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import images from '../../Image';
import COLORS from '../../GlobalConstants/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LIST_DATA = [
  {
    label: 'Unsold/Return Approval',
    isEditable: true,
    id: 1,
  },
  {
    label: 'Collection Approval',
    isEditable: true,
    id: 2,
  },
];

export default function ApprovalDashboard({navigation, route}) {
  const roleBasedGrid = route.params?.roleBasedGrid;

  const [isShowCollection, setIsShowCollection] = useState(true);
  const [listData, setListData] = useState(LIST_DATA);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    if (userData?.role == 'Circulation Executive') {
      setIsShowCollection(false);
      let res = listData.filter(it => it.id == 1);
      res[0].label = 'Verify Unsold/Return';
      console.log('res', res);
      setListData(prev => [...prev]);
    }
    if (userData?.role === 'Regional Manager') {
      let res = listData.filter(it => it.id == 2);
      res[0].label = 'View Collection';
      setListData(prev => [...prev]);
    }
  };

  const renderItemView = item => {
    if (item.item.id == 2 && !isShowCollection) {
      return null;
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            item.item?.id == 1
              ? navigation.navigate('UnsoldReturnApprovalDashboard', {
                  roleBasedGrid: item.item?.id,
                })
              : navigation.navigate('CollectionApprovalDashboard', {
                  roleBasedGrid: item.item?.id,
                })
          }>
          <View
            style={{
              height: 50,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 5,
            }}
            key={item.item?.id}>
            <Text
              style={{
                color: COLORS.redPrimary,
                fontSize: 16,
                fontWeight: '700',
              }}>
              {item.item?.label.toUpperCase()}
            </Text>
            <Image source={images.rightArrow} style={{width: 20, height: 30}} />
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <FlatList
        data={listData}
        style={{marginTop: 15, marginHorizontal: 10}}
        renderItem={item => renderItemView(item)}
      />
    </View>
  );
}
