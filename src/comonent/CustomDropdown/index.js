import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  headerTitle = '', // optional
  itemHandler, // mandatory
  selectedItem, // mandatory
  data = [], // mandatory
  labelField = 'name', // optional
  valueField = 'name', // optional
  placeholder = 'Select', // optional
  maxHeight = 300, // optional
  disable = false, // optional
  search,
  searchPlaceholder = 'Search...',
}) => {
  return (
    <View style={styles.container}>
      {headerTitle != '' && (
        <Text style={styles.dropdownHeading}>{headerTitle}</Text>
      )}
      <Dropdown
        search={search}
        style={{
          height: 46,
          width: '100%',
          backgroundColor: 'lightgrey',
          paddingHorizontal: 16,
        }}
        placeholderStyle={{color: '#373435', fontSize: 16, fontWeight: '400'}}
        selectedTextStyle={{
          color: '#373435',
          fontSize: 16,
          fontWeight: '400',
          textTransform: 'capitalize',
        }}
        data={data}
        maxHeight={maxHeight}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        disable={disable}
        value={selectedItem}
        onFocus={() => {}}
        onBlur={() => {}}
        onChange={itemHandler}
        searchPlaceholder={searchPlaceholder}
        itemTextStyle={{
          textTransform: 'capitalize',
        }}
        //   onChange={item => {
        //     setPublicationItem(item);
        //   }}
      />
    </View>
  );
};
export default CustomDropdown;
