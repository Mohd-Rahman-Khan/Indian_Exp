import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import COLORS from '../../../GlobalConstants/COLORS';
import styles from '../styles';
import images from '../../../Image';

export default function QrTable({
  scanQrIds,
  onCancelButtonCLick = renderData => {},
  headingTitle,
}) {
  return (
    <>
      <View style={{marginTop: 20, marginHorizontal: 10}}>
        <Text style={styles.validCouponText}>
          Total {headingTitle} Coupon - {scanQrIds.length}
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 40,
            marginHorizontal: 10,
          }}>
          <View
            style={{
              width: '15%',
              borderRightColor: COLORS.lightGreyBorder,
              borderRightWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.tableListText}>S.No.</Text>
          </View>
          <View
            style={{
              width: '25%',
              borderRightColor: COLORS.lightGreyBorder,
              borderRightWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.tableListText}>Coupon Id</Text>
          </View>
          <View
            style={{
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRightColor: COLORS.lightGreyBorder,
              borderRightWidth: 1,
            }}>
            <Text style={styles.tableListText}>Vendor Name</Text>
          </View>
          <View
            style={{
              width: '16%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.tableListText}>Action</Text>
          </View>
        </View>
        {scanQrIds.map((item, index) => {
          let renderData = item.split('$');
          console.log('renderData', renderData);
          return (
            <View key={index + 1}>
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightGreyBorder,
                  width: '100%',
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  //paddingTop: 10,
                  paddingHorizontal: 10,
                  height: 40,
                }}>
                <View
                  style={{
                    width: '15%',
                    borderRightColor: COLORS.lightGreyBorder,
                    borderRightWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.tableListDetailText}>{index + 1}</Text>
                </View>
                <View
                  style={{
                    width: '25%',
                    borderRightColor: COLORS.lightGreyBorder,
                    borderRightWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.tableListDetailText} numberOfLines={1}>
                    {renderData[0]}
                  </Text>
                </View>
                <View
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightColor: COLORS.lightGreyBorder,
                    borderRightWidth: 1,
                  }}>
                  <Text style={styles.tableListDetailText} numberOfLines={1}>
                    {renderData[5]}
                  </Text>
                </View>
                <View
                  style={{
                    width: '16%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      onCancelButtonCLick(renderData);
                    }}
                    style={{
                      height: 30,
                      width: 30,
                      borderWidth: 1,
                      borderColor: COLORS.lightGreyBorder,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        headingTitle == 'Valid' ? 'green' : 'red',
                    }}>
                    <Image
                      source={images.closeIcon}
                      style={{
                        width: 12,
                        height: 12,
                        tintColor: 'white',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
}
