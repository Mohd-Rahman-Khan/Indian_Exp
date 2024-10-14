import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import COLORS from '../../GlobalConstants/COLORS';
import images from '../../Image';

export default function Dashboard({data}) {
  return (
    <View style={styles.tableContainer}>
      <View style={[styles.tableHeaderContaier, {textAlign: 'center'}]}>
        <View style={styles.depotParcelContainer}>
          <Text style={styles.tableListText}>Depot/Parcel</Text>
        </View>
        <View style={styles.depotContainer}>
          <Text style={styles.tableListText}>Depot</Text>
        </View>
        <View style={styles.parcelContainer}>
          <Text style={styles.tableListText}>Parcel</Text>
        </View>
        <View style={[styles.totalContainer, {flexDirection: 'row'}]}>
          <Text style={styles.tableListText}>Total</Text>
          {/* <Image style={{height: 20, width: 20}} source={images.downArrow} /> */}
        </View>
      </View>
      {data?.length > 0 ? (
        data.map((item, index) => {
          let getKey = Object.keys(item);
          let getValue = Object.values(item);

          //console.log('renderedItem', getValue[0].depot);

          return (
            <View
              key={index + 1}
              style={{borderBottomColor: COLORS.black, borderBottomWidth: 0.4}}>
              {/* <View style={styles.rowDevider}></View> */}
              <View style={styles.tableDetailContainer}>
                <View style={styles.depotParcelContainer}>
                  <Text
                    style={[styles.tableListDetailText, {textAlign: 'center'}]}>
                    {getKey}
                  </Text>
                </View>
                <View style={styles.depotContainer}>
                  <Text style={styles.tableListDetailText}>
                    {getValue[0].depot}
                  </Text>
                </View>
                <View style={styles.parcelContainer}>
                  <Text style={styles.tableListDetailText}>
                    {getValue[0].parcel}
                  </Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.tableListDetailText}>
                    {getValue[0].total}
                  </Text>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View
          style={{
            borderColor: COLORS.black,
            borderWidth: 0.4,
            borderTopColor: 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 15,
              color: COLORS.black,
              fontWeight: 'bold',
            }}>
            Data is empty.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tableListText: {
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  tableHeaderContaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    //marginHorizontal: 10,
    backgroundColor: '#cacaca',
    borderTopColor: COLORS.black,
    borderTopWidth: 0.4,
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.4,
  },
  depotParcelContainer: {
    width: '30%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderLeftColor: COLORS.black,
    borderLeftWidth: 0.4,
  },
  depotContainer: {
    width: '22%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parcelContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
  },
  totalContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
  },
  tableListDetailText: {
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 11,
    paddingVertical: 5,
  },
  rowDevider: {
    height: 1,
    backgroundColor: COLORS.lightGreyBorder,
    width: '100%',
  },
  tableDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingTop: 10,
    //paddingHorizontal: 10,
    //height: 40,
  },
});
