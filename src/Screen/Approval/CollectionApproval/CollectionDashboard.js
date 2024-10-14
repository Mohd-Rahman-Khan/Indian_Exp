import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../../../GlobalConstants/COLORS';

export default function CollectionDashboard({data}) {
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
        <View style={styles.totalContainer}>
          <Text style={styles.tableListText}>Total</Text>
        </View>
      </View>
      {data.map((item, index) => {
        let getKey = Object.keys(item);
        let getValue = Object.values(item);

        //console.log('renderedItem', getValue[0].depot);

        return (
          <View key={index + 1}>
            <View style={styles.rowDevider}></View>
            <View style={styles.tableDetailContainer}>
              <View style={styles.depotParcelContainer}>
                <Text
                  style={[styles.tableListDetailText, {textAlign: 'center'}]}>
                  {getKey}
                </Text>
              </View>
              <View style={styles.depotContainer}>
                <Text style={styles.tableListDetailText} numberOfLines={1}>
                  {getValue[0].depot}
                </Text>
              </View>
              <View style={styles.parcelContainer}>
                <Text style={styles.tableListDetailText} numberOfLines={1}>
                  {getValue[0].parcel}
                </Text>
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.tableListDetailText} numberOfLines={1}>
                  {getValue[0].total}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tableListText: {
    fontWeight: '800',
    color: 'black',
    //marginTop: 10,
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
  },
  depotParcelContainer: {
    width: '30%',
    borderRightColor: COLORS.lightGreyBorder,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  depotContainer: {
    width: '22%',
    borderRightColor: COLORS.lightGreyBorder,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parcelContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.lightGreyBorder,
    borderRightWidth: 1,
  },
  totalContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableListDetailText: {
    color: COLORS.black,
    textAlign: 'auto',
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
    paddingHorizontal: 10,
    //height: 40,
  },
});
