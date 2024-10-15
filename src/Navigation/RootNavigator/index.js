import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  Splash,
  Login,
  Home,
  Profile,
  EditProfile,
  UnsoldRetun,
  Collection,
  ApprovalDashboard,
  ApprovalDashboard2,
  Approval,
  UnsoldReturnApprovalDashboard,
  CollectionApprovalDashboard,
  UnsoldReturnApproval,
  CollectionApproval,
  PrivacyPolicy,
  ContactUs,
  CancellationPolicy,
  AboutUs,
  TermsOfService,
  UnsoldReturnList,
  CollectionList,
  PrintOrder,
  PrintOrderList,
  CollectionDashboard,
  PrintOrderDashboard,
  SupplyCopy,
  SelectionOfPrintOrder,
  SamplingCopyList,
} from '../../Screen';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import images from '../../Image';
import FillPaymentDetail from '../../Screen/FillPaymentDetail/FillPaymentDetail';
import ScanCoupen from '../../Screen/ScanCoupen/ScanCoupen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsOfService"
          component={TermsOfService}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CancellationPolicy"
          component={CancellationPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="UnsoldRetun"
          component={UnsoldRetun}
          options={{
            headerTitle: 'Unsold/Return',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="UnsoldReturnList"
          component={UnsoldReturnList}
          options={{
            headerTitle: 'Unsold/Return List',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="PrintOrder"
          component={PrintOrder}
          options={{
            headerTitle: 'Print Order',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="SupplyCopy"
          component={SupplyCopy}
          options={{
            headerTitle: 'PO Sampling Copy',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="PrintOrderList"
          component={PrintOrderList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SamplingCopyList"
          component={SamplingCopyList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectionOfPrintOrder"
          component={SelectionOfPrintOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CollectionList"
          component={CollectionList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Collection"
          component={Collection}
          options={{headerTitle: 'Collection', headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="FillPaymentDetail"
          component={FillPaymentDetail}
          options={{
            headerTitle: 'Payment Detail',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="ScanCoupen"
          component={ScanCoupen}
          options={{
            headerTitle: 'Scan Coupon',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="CollectionDashboard"
          component={CollectionDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrintOrderDashboard"
          component={PrintOrderDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ApprovalDashboard2"
          component={ApprovalDashboard2}
          options={({route}) => ({
            headerTitle: route.params?.titleName
              ? route.params?.titleName
              : 'Approval',
          })}
        />
        <Stack.Screen
          name="CollectionApprovalDashboard"
          component={CollectionApprovalDashboard}
          options={{
            headerTitle: 'Outstanding Dashboard',
            headerBackTitleVisible: false,
          }}
          //   ,
          //   headerRight: () => (
          //     <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          //       <TouchableOpacity onPress={() => alert('searchIcon')}>
          //         <Image style={{width: 20, height:20,}} source={images.searchIcon} />
          //       </TouchableOpacity>
          //       <TouchableOpacity onPress={() => alert('Filter Icon')}>
          //         <Image
          //           source={images.filterIcon}
          //           style={{width: 20, height:20, marginRight: 10, marginLeft: 15}}
          //         />
          //       </TouchableOpacity>
          //     </View>
          //   ),
          // }}
        />
        <Stack.Screen
          name="UnsoldReturnApprovalDashboard"
          component={UnsoldReturnApprovalDashboard}
          options={{
            headerTitle: 'Unsold/Return Dashboard',
            headerBackTitleVisible: false,
          }}
          //   ,
          //   headerRight: () => (
          //     <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          //       <TouchableOpacity onPress={() => alert('searchIcon')}>
          //         <Image style={{width: 20, height:20,}} source={images.searchIcon} />
          //       </TouchableOpacity>
          //       <TouchableOpacity onPress={() => alert('Filter Icon')}>
          //         <Image
          //           source={images.filterIcon}
          //           style={{width: 20, height:20, marginRight: 10, marginLeft: 15}}
          //         />
          //       </TouchableOpacity>
          //     </View>
          //   ),
          // }}
        />
        <Stack.Screen
          name="UnsoldReturnApproval"
          component={UnsoldReturnApproval}
          options={{
            headerTitle: 'Unsold/Return Approval',
            headerBackTitleVisible: false,
          }}
          // ,
          // headerRight: () => (
          //   <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          //     <TouchableOpacity onPress={() => alert('search Icon')}>
          //       <Image style={{width: 20, height:20,}} source={images.searchIcon} />
          //     </TouchableOpacity>
          //     <TouchableOpacity onPress={() => alert('Filter Icon')}>
          //       <Image
          //         source={images.filterIcon}
          //         style={{width: 20, height:20, marginRight: 10, marginLeft: 15}}
          //       />
          //     </TouchableOpacity>
          //   </View>
          // ),}}
        />
        <Stack.Screen
          name="CollectionApproval"
          component={CollectionApproval}
          options={{
            headerTitle: 'View Collection',
            headerBackTitleVisible: false,
          }}
          //   ,
          //   headerRight: () => (
          //     <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          //       <TouchableOpacity onPress={() => alert('searchIcon')}>
          //         <Image style={{width: 20, height:20,}} source={images.searchIcon} />
          //       </TouchableOpacity>
          //       <TouchableOpacity onPress={() => alert('Filter Icon')}>
          //         <Image
          //           source={images.filterIcon}
          //           style={{width: 20, height:20, marginRight: 10, marginLeft: 15}}
          //         />
          //       </TouchableOpacity>
          //     </View>
          //   ),
          // }}
        />
        <Stack.Screen
          name="ApprovalDashboard"
          component={ApprovalDashboard}
          options={({route}) => ({
            headerBackTitleVisible: false,
            headerTitle: route.params?.titleName
              ? route.params?.titleName
              : 'Approval Dashboard',
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => alert('searchIcon')}>
                  <Image source={images.statistics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Rearrange Icon')}>
                  <Image
                    source={images.return}
                    style={{marginHorizontal: 10}}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Approval"
          component={Approval}
          options={({route}) => ({
            headerBackTitleVisible: false,
            headerTitle: route.params?.titleName
              ? route.params.titleName
              : 'Approval',
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => alert('searchIcon')}>
                  <Image source={images.statistics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Rearrange Icon')}>
                  <Image
                    source={images.return}
                    style={{marginHorizontal: 10}}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
