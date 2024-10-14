import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import images from '../../Image';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {itemRowView} from './utils';
import NavigationService from '../../Navigation/RootNavigator/NavigationService';
import auth from '../../api/auth';

const Profile = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({});
  const [isPV, setIsPV] = useState(false);
  const [depositAmt, setDepositAmt] = useState('');
  useEffect(() => {
    getDepositAmount();
    getUserDetails();
    // console.log('loginId: ', GetData('loginId'));
    // console.log('login response : ', GetData('login_response'));
  }, []);

  const getDepositAmount = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.securityDepositAmount(userId, token);
    //console.log('Profresponse', response);
    setDepositAmt(response?.data?.data?.security_deposit_amount);
    console.log('response: ', response.data);
  };

  const getUserDetails = async () => {
    console.log('getUserDetails');
    const userDat = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userDat);
    const nameArr = userData?.name.split(' ');
    if (userData.role == 'Parcel Vendor') {
      setIsPV(true);
    }
    const DATA = {
      Emp_No: userData?.loginId,
      FIRST_Name: nameArr[0],
      LAST_Name: nameArr[nameArr.length - 1],
      PHONE: userData?.phone,
      EMAIL: userData?.email,
      User_Type: userData?.user_type,
      role: userData?.role,
    };
    console.log('userData', userData);
    console.log('userData', DATA);
    setUserDetails(DATA);
  };

  // const DATA = [
  //   {
  //     Emp_No: userDetails.name,
  //     FIRST_Name: 'Prashant',
  //     LAST_Name: 'Vats',
  //     PHONE: '9568549038',
  //     EMAIL: 'prashantvats53@gmail.com',
  //   },
  // ];

  const logoutAction = () => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to Log out?',
      [
        {
          text: 'Yes',
          onPress: async () => {
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <FlatList
        data={userDetails}
        renderItem={({item}) => ( */}
        <View>
          <View style={styles.profilepicview}>
            <Image source={images.profileIELogo} style={styles.profilepic} />
          </View>

          <View>
            {itemRowView(
              isPV ? 'BP CODE' : 'EMP CODE',
              userDetails.Emp_No,
              false,
            )}
            {itemRowView('FIRST NAME', userDetails.FIRST_Name)}
            {itemRowView('LAST NAME', userDetails.LAST_Name)}
            {/* {userDetails?.User_Type === 'external' &&
              itemRowView('DEPOSIT AMOUNT', depositAmt)} */}
            {itemRowView('PHONE', userDetails.PHONE)}
            {userDetails?.role === 'Depot Salesman' ||
            userDetails?.role === 'Parcel Vendor'
              ? null
              : itemRowView('EMAIL', userDetails.EMAIL)}
          </View>

          {/* <View style={styles.profilecontent}>
              <View style={styles.empno}>
                <Text style={styles.empno}>EMP NO:</Text>
              </View>

              <View style={styles.empcode1}>
                <Text style={styles.empcode}>{item.Emp_No}</Text>
              </View>
              <View>
                <Image source={images.lock} style={styles.lockimage} />
              </View>
            </View> */}
          {/* <View style={styles.profilecontent}>
              <View style={styles.firstname}>
                <Text style={styles.firstname}>FIRST NAME:</Text>
              </View>

              <View style={styles.empcode1}>
                <Text style={styles.name}>{item.FIRST_Name}</Text>
              </View>
            </View>
            <View style={styles.profilecontent}>
              <View style={styles.firstname}>
                <Text style={styles.firstname}>LAST NAME:</Text>
              </View>

              <View style={styles.emplast}>
                <Text style={styles.lastname}>{item.LAST_Name}</Text>
              </View>
            </View>
            <View style={styles.profilecontent}>
              <View style={styles.firstname}>
                <Text style={styles.firstname}>PHONE:</Text>
              </View>

              <View style={styles.emplast}>
                <Text style={styles.phone}>{item.PHONE}</Text>
              </View>
            </View>

            <View style={styles.profilecontent}>
              <View style={styles.firstname}>
                <Text style={styles.firstname}>Email:</Text>
              </View>

              <View style={styles.emplast}>
                <Text style={styles.email}>{item.EMAIL}</Text>
              </View>
            </View> */}

          <View style={styles.logoutBtnView}>
            <TouchableOpacity onPress={() => logoutAction()}>
              <View style={styles.logoutBtn}>
                <Text style={styles.btnText}>LOGOUT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* )}
      /> */}
      </View>
    </ScrollView>
  );
};

export default Profile;
