import {
  Image,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import React, {memo, useState} from 'react';
import images from '../../Image';
import COLORS from '../../GlobalConstants/COLORS';
import CustomDropdown from '../CustomDropdown';
import {Dropdown} from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';

export default function DepotDropdownPopup(props) {
  const [depotSelect, setdepotSelect] = useState(true);
  const [parcelSelect, setparcelSelect] = useState(false);
  return (
    <Modal animationType="fade" transparent={true} visible={props.showModal}>
      <TouchableWithoutFeedback
        onPress={props.onClose}
        style={styles.mainContainer}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalInsideContainer}>
            <View
              style={{
                flexDirection: 'row',
                height: 30,
                //backgroundColor: 'red',
                width: '100%',
                marginTop: 30,
              }}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => {
                  setdepotSelect(!depotSelect);
                  setparcelSelect(false);
                }}
                isChecked={depotSelect}
                rightText={'Depot'}
                rightTextStyle={{color: COLORS.black}}
              />
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => {
                  setparcelSelect(!parcelSelect);
                  setdepotSelect(false);
                }}
                isChecked={parcelSelect}
                rightText={'Parcel'}
                rightTextStyle={{color: COLORS.black}}
              />
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 10,
              }}>
              {depotSelect ? (
                <CustomDropdown
                  headerTitle="Select Depot"
                  placeholder="Please select depot"
                  data={props.depotArr}
                  selectedItem={props.depotItem?.name}
                  itemHandler={item => {
                    props.itemHandler(item);
                  }}
                  search={true}
                />
              ) : parcelSelect ? (
                <CustomDropdown
                  headerTitle="Select Parcel"
                  placeholder="Please select parcel"
                  data={props.parcelArr}
                  selectedItem={props.depotItem?.name}
                  itemHandler={item => {
                    props.itemHandler(item);
                  }}
                  search={true}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000AA',
  },
  modalInsideContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '60%',
    width: '100%',
    //justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
