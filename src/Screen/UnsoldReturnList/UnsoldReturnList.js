import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import images from '../../Image';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '../../api/auth';
import COLORS from '../../GlobalConstants/COLORS';
import AppLoader from '../../Helper/AppIndicator';
import moment from 'moment';

export default function UnsoldReturnList({route, navigation}) {
  const [unsoldReturnList, setunsoldReturnList] = useState([]);
  const [loading, setloading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUnsoldreturnList();
    }
  }, [isFocused]);

  const getUnsoldreturnList = async () => {
    setloading(true);
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.unsoldReturnList(userId, token);
    console.log('getUnsoldreturnList', response);
    if (response?.status != 200 && response?.status != 404) {
      setloading(false);
      alert('Somethig went wrong.');
    } else if (response?.status == 404) {
      setloading(false);
      //alert(response.data?.message);
    } else {
      setloading(false);
      setunsoldReturnList(response.data?.data);
    }
  };
  const renderItem = ({item}) => {
    //console.log('renderItem', item);
    return (
      <View style={styles.listItemContainer}>
        <Text style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
          {'Depot : ' + item?.user_name}
        </Text>
        <View style={styles.listItemBoxContainer}>
          <View style={{width: '75%'}}>
            <Text style={styles.listItemText}>
              {'Total Supply : ' + item?.total_supply}
            </Text>
            <Text style={styles.listItemText}>
              {'Unsold : ' + item?.unsold}
            </Text>
            <Text style={styles.listItemText}>
              {'Return : ' + item?.supply_return}
            </Text>
            <Text style={styles.listItemText}>
              {'Date : ' + moment(item?.created_at).format('YYYY-MM-DD')}
            </Text>
          </View>
          <View style={{width: '20%'}}>
            <Text style={styles.listItemStatusText}>
              {item?.approval_status == '0'
                ? 'Pending'
                : item?.approval_status == '1'
                  ? 'Approved'
                  : item?.approval_status == '2'
                    ? 'Rejected'
                    : 'Pending'}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <AppLoader visible={loading} />
      {unsoldReturnList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={unsoldReturnList}
          renderItem={item => renderItem(item)}
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>List is empty</Text>
        </View>
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UnsoldRetun');
          }}
          style={styles.addIconContainer}>
          <Image style={styles.plusIcon} source={images.plusIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
